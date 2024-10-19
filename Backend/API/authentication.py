
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.request import Request
from django.conf import settings

class CookieTokenAuthentication(JWTAuthentication):

    def authenticate(self, request: Request):

        access_token = request.COOKIES.get("access_token")

        if access_token is None:
            return None


        validated_token = self.get_validated_token(access_token)
        user = self.get_user(validated_token)

        if user is None:
            return None

        return user, validated_token