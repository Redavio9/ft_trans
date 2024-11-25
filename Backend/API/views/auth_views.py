
from ..serializers.user_serializer import GetBasicUserInfoSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from ..serializers.user_serializer import RegistrationSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.sites.shortcuts import get_current_site
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import serializers
from ..models import UserGameStats
from django.utils import timezone
from rest_framework import status
from django.conf import settings
from django.urls import reverse
from ..models import UserInfo
from ..utils import Utils
import requests
import jwt
from django.http import HttpResponseRedirect


class RegistrationView(APIView):

	permission_classes = [AllowAny]
	authentication_classes = []

	def post(self, request: Request) -> Response:

		serializer = RegistrationSerializer(data=request.data, context={'request': request})

		try:
			serializer.is_valid(raise_exception=True)
		except serializers.ValidationError as e:
			return Response({
				'error': e.detail[Utils.retrieve_key_from_serializer_error(e)],
			},
			status=status.HTTP_400_BAD_REQUEST)

		serializer.save()

		ugs = UserGameStats.objects.create(user_id = serializer.instance)
		ugs.save()

		token = Utils.create_one_time_jwt(serializer.instance)

		current_site = get_current_site(request).domain
		relative_link = reverse('email_verification')
		absurl = f'http://{current_site}{relative_link}?token={str(token)}'
		email_body = f'Hi {serializer.instance.username},\n\nPlease use the link below to verify your email address:\n{absurl}'
		data = {
			'domain': absurl,
			'subject': 'Verify your email',
			'email': serializer.instance.email,
			'body': email_body
		}

		Utils.send_verification_email(data)

		return Response ({
			'success': 'User registered successfully, check your email for verification',
			'user': serializer.data,
		},
		status=status.HTTP_201_CREATED)

class Authentication42View(APIView):

	permission_classes = [AllowAny]

	def __init__(self):
		self.code = ""
		self.data = {
			'grant_type': 'authorization_code',
			'client_id': settings.CLIENT_ID,
			'client_secret': settings.CLIENT_SECRET,
			'code': self.code.encode('utf-8'),
			'redirect_uri': settings.REDIRECT,
		}

	def __get_code(self, request: Request) -> str:
		self.code = request.GET.get('code')
		return self.code
	
	def __get_token(self) -> str:
		__token = requests.post("https://api.intra.42.fr/oauth/token/", data=self.data)
		if not "access_token" in __token.json():
			return None
		return __token.json()['access_token']

	def __get_user(self, access_token: str) -> dict:
		user = requests.get("https://api.intra.42.fr/v2/me", headers={
			'Authorization': f'Bearer {access_token}'
		})
		return user.json()
	
	def __set_code_in_data(self, code: str) -> None:
		self.data['code'] = code.encode('utf-8')

	def __register_user(self, user: dict, request: Request) -> None:

		first_name = user['first_name']
		last_name = user['last_name']
		username = user['login']
		email = user['email']
		avatar = user['image']['link']

		requested_avatar = requests.get(avatar)
		avatar_name = avatar.split('/')[-1]
		avatar = SimpleUploadedFile(avatar_name, requested_avatar.content, content_type='image/jpg')

		serializer = RegistrationSerializer(data={
			'username': username,
			'first_name': first_name,
			'last_name': last_name,
			'email': email,
			"gender": "M",
			"avatar": avatar,
		}, context={'request': request})

		if serializer.is_valid():
			serializer.save()

			serializer.instance.is_verified = True
			serializer.instance.save()

			ugs = UserGameStats.objects.create(user_id = serializer.instance)
			ugs.save()

			response = HttpResponseRedirect('https://127.0.0.1:8008/')

			__jwt = Utils.create_jwt_for_user(serializer.instance)

			# response.redirec('https://127.0.0.1:8008/')
			response.set_cookie(settings.ACCESS_TOKEN, __jwt['access_token'], httponly=False, secure=True, samesite='None')
			response.set_cookie(settings.REFRESH_TOKEN, __jwt['refresh_token'], httponly=True, secure=True, samesite='None')
			

			return response

		else:
			try:
				user = UserInfo.objects.get(username=username)
			except UserInfo.DoesNotExist:
				return Response({
					'error': 'failed to authenticate',
				},
				status=status.HTTP_400_BAD_REQUEST)
			
			response = HttpResponseRedirect('https://127.0.0.1:8008/')

			__jwt = Utils.create_jwt_for_user(user)

			response.set_cookie(settings.ACCESS_TOKEN, __jwt['access_token'], httponly=False, secure=True, samesite='None')
			response.set_cookie(settings.REFRESH_TOKEN, __jwt['refresh_token'], httponly=True, secure=True, samesite='None')

			return response

	def get(self, request: Request) -> Response:

		if request.user.is_authenticated:
			return Response({
				'success': 'User already logged in',
				'user': GetBasicUserInfoSerializer(request.user).data
			},
			status=status.HTTP_200_OK)
		
		self.code = self.__get_code(request)
		self.__set_code_in_data(self.code)

		if not self.code:
			return Response({
				'error': 'No code was provided',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		access_token = self.__get_token()

		if not access_token:
			return Response({
				'error': 'Failed to authenticate',
			},
			status=status.HTTP_400_BAD_REQUEST)

		user = self.__get_user(access_token)
		return self.__register_user(user, request)

class LoginConfirmationView(APIView):

	permission_classes = [AllowAny]

	def post(self, request: Request) -> Response:
		if request.user.is_authenticated:
			return Response({
				'success': 'User already logged in',
				'user': GetBasicUserInfoSerializer(request.user, context = {'request': request}).data,
			},
			status=status.HTTP_200_OK)

		username = request.data.get("username")
		password = request.data.get("password")

		user = authenticate(request, username=username, password=password)

		if not user:
			return Response({
				'error': 'Invalid username or password',
			},
			status=status.HTTP_401_UNAUTHORIZED)
		
		if not user.is_verified:
			return Response({
				'error': 'User is not verified, check your email',
			},
			status=status.HTTP_401_UNAUTHORIZED)
		
		if not user.two_fa:
			response = Response({
				'success': 'Login successful',
				'user': GetBasicUserInfoSerializer(user, context = {'request': request}).data
			},
			status=status.HTTP_200_OK)

			__jwt = Utils.create_jwt_for_user(user)

			response.set_cookie(settings.ACCESS_TOKEN, __jwt[settings.ACCESS_TOKEN], httponly=False, secure=True, samesite='None')
			response.set_cookie(settings.REFRESH_TOKEN, __jwt[settings.REFRESH_TOKEN], httponly=True, secure=True, samesite='None')

			return response
		
		user.otp_code = Utils.generate_otp_code()
		user.otp_time = Utils.generate_otp_expiration()

		absurl = f''
		email_body = f'Hi {user.username},\n\nPlease use the code below to verify your login:\n{user.otp_code}'
		data = {
			'domain': absurl,
			'subject': 'Verification code',
			'email': user.email,
			'body': email_body
		}

		Utils.send_verification_email(data)

		user.save()

		token = Utils.create_one_time_jwt(user)

		response = Response({
			'two_fa': "check your email for verification code",
		},
		status=status.HTTP_200_OK)

		response.set_cookie("verification_token", str(token), httponly=False, secure=True, samesite='None')

		return response

class TwoFactorAuthenticationView(APIView):

	permission_classes = [AllowAny]

	def post(self, request: Request) -> Response:

		if request.user.is_authenticated:
			return Response({
				'success': 'User already logged in',
				'user': GetBasicUserInfoSerializer(request.user).data
			},
			status=status.HTTP_200_OK)

		otp_code = request.data.get('otp_code')
		verification_token = request.COOKIES.get('verification_token')

		if not verification_token:
			return Response({
				'error': 'No verification token was provided',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		if not otp_code:
			return Response({
				'error': 'No otp code was provided',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		try:
			token = jwt.decode(verification_token, settings.SECRET_KEY, algorithms=['HS256'])
		except jwt.ExpiredSignatureError:
			return Response({
				'error': 'Token is expired',
			},
			status=status.HTTP_400_BAD_REQUEST)
		except jwt.InvalidTokenError:
			return Response({
				'error': 'Token is invalid',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		try:
			user = UserInfo.objects.get(id=token['user_id'])
		except UserInfo.DoesNotExist:
			return Response({
				'error': 'Couldn\'t find user',
			},
			status=status.HTTP_404_NOT_FOUND)
		
		if user.otp_code != otp_code:
			return Response({
				'error': 'Invalid otp code',
			},
			status=status.HTTP_401_UNAUTHORIZED)
		
		if user.otp_time < timezone.now():
			return Response({
				'error': 'OTP code has expired',
			},
			status=status.HTTP_401_UNAUTHORIZED)
		
		user.otp_code = None
		user.otp_time = None
		user.save()

		response = Response({
			'success': 'Login successful',
			'user': GetBasicUserInfoSerializer(user).data
		},
		status=status.HTTP_200_OK)

		__jwt = Utils.create_jwt_for_user(user)

		response.set_cookie(settings.ACCESS_TOKEN, __jwt[settings.ACCESS_TOKEN], httponly=False, secure=True, samesite='None')
		response.set_cookie(settings.REFRESH_TOKEN, __jwt[settings.REFRESH_TOKEN], httponly=True, secure=True, samesite='None')
		response.delete_cookie('verification_token')

		return response

class LogoutView(APIView):

	permission_classes = [IsAuthenticated]

	def post(self, request: Request) -> Response:

		refresh = request.COOKIES.get(settings.REFRESH_TOKEN)

		if not refresh:
			return Response({
				'error': 'No refresh token was provided',
			},
			status=status.HTTP_400_BAD_REQUEST)

		try:
			token = RefreshToken(refresh)
			token.blacklist()
		except TokenError:
			return Response({
				'error': 'Refresh token is invalid, expired or blacklisted',
			},
			status=status.HTTP_401_UNAUTHORIZED)

		response = Response({
			'success': 'Logout successful',
		},
		status=status.HTTP_200_OK)

		response.delete_cookie(settings.ACCESS_TOKEN)
		response.delete_cookie(settings.REFRESH_TOKEN)

		return response

class EmailVerificationView(APIView):

	permission_classes = [AllowAny]
	authentication_classes = []

	def get(self, request: Request) -> Response:

		token = request.GET.get('token')

		if not token:
			return Response({
				'error': 'No token provided',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		try:
			token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
		except jwt.ExpiredSignatureError:
			return Response({
				'error': 'Token is expired',
			},
			status=status.HTTP_400_BAD_REQUEST)
		except jwt.InvalidTokenError:
			return Response({
				'error': 'Token is invalid',
			},
			status=status.HTTP_400_BAD_REQUEST)
		
		try:
			user = UserInfo.objects.get(id=token['user_id'])
		except UserInfo.DoesNotExist:
			return Response({
				'error': 'Couldn\'t find user',
			},
			status=status.HTTP_404_NOT_FOUND)
			
		if user.is_verified:
			return Response({
				'success': 'Email is already verified',
			},
			status=status.HTTP_200_OK)

		user.is_verified = True
		user.save()

		return Response({
			'success': 'Email was verified successfully',
		},
		status=status.HTTP_200_OK)