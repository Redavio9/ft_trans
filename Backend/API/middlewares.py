from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.conf import settings
from .utils import Utils

class TokenRefresherMiddleware:

	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		access_token = request.COOKIES.get(settings.ACCESS_TOKEN)

		if not access_token:
			return self.get_response(request)

		try:
			user = Utils.get_user_from_jwt(access_token, 'access')
			if not user:
				raise Exception('Invalid access token')

		except Exception:
			refresh_token = request.COOKIES.get(settings.REFRESH_TOKEN)

			if not refresh_token:
				return self.get_response(request)

			try:
				old_refresh_token = RefreshToken(refresh_token)
			except TokenError as e:
				response = self.get_response(request)
				if response.status_code == 401:
					response.delete_cookie(settings.ACCESS_TOKEN)
					response.delete_cookie(settings.REFRESH_TOKEN)
				return response

			user = Utils.get_user_from_jwt(refresh_token, 'refresh')

			if not user:
				response = self.get_response(request)
				if response.status_code == 401:
					response.delete_cookie(settings.ACCESS_TOKEN)
					response.delete_cookie(settings.REFRESH_TOKEN)
				return response

			old_refresh_token.blacklist()
			tokens = Utils.create_jwt_for_user(user)

			request.COOKIES[settings.ACCESS_TOKEN] = str(tokens['access_token'])
			request.COOKIES[settings.REFRESH_TOKEN] = str(tokens['refresh_token'])

			response = self.get_response(request)
			response.set_cookie(settings.ACCESS_TOKEN, str(tokens['access_token']), httponly=False)
			response.set_cookie(settings.REFRESH_TOKEN, str(tokens['refresh_token']), httponly=True)

			return response

		return self.get_response(request)
