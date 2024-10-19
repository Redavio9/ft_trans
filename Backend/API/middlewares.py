from .utils import Utils
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import status

class CookieTokenAuthentication:

	def __init__(self, get_response):
		self.get_response = get_response

	
	def __generate_error_response(self, message: str, redirect: bool, redirect_url: str) -> Response:
		response = Response({
			'error': message,
			'redirect': redirect,
			'redirect_url': redirect_url
		},
		status=status.HTTP_401_UNAUTHORIZED)
		response.accepted_renderer = JSONRenderer()
		response.accepted_media_type = 'application/json'
		response.renderer_context = {}
		response.render()

		response.delete_cookie('access_token')
		response.delete_cookie('refresh_token')

		return response
	
	def __check_protected_endpoint(self, path: str) -> bool:

		protected_endpoints = [
			'/register/',
			'/callback',
			'/login/',
			'/logout/',
			'/users/',
			'/profile/',
			'/profile/<str:username>/',
			'/profile_u/',
			'/password_u/',
		]

		for endpoint in protected_endpoints:
			if path.startswith('/api' + endpoint):
				return True
		
		return False
	
	def __call__(self, request):

		if not self.__check_protected_endpoint(request.path):
			return self.get_response(request)

		access_token = request.COOKIES.get('access_token')

		if not access_token:
			return self.get_response(request)
		
		try:
			user = Utils.get_user_from_jwt(access_token, 'access')
			if not user:
				raise Exception('Invalid access token')
		except Exception as e:
			refresh_token = request.COOKIES.get('refresh_token')
			if not refresh_token:
				return self.__generate_error_response('No refresh token was provided', 
						True, 
						'/api/login/')

			try:
				decoded_refresh_token = RefreshToken(refresh_token)
			except TokenError as e:
				return self.__generate_error_response('Invalid or Expired refresh token',
										True,
										'/api/login/')
			
			user = Utils.get_user_from_jwt(refresh_token, 'refresh')

			if not user:
				return self.__generate_error_response('Failed to find user',
										True,
										'/api/login/')
			
			created_access_token = str(decoded_refresh_token.access_token)
			request.COOKIES['access_token'] = created_access_token
			response = self.get_response(request)
			response.set_cookie('access_token', created_access_token, httponly=False)

			return response
	
		request.user = user
		response = self.get_response(request)
		return response
