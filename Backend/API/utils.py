from django.core.mail import EmailMessage
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.core.exceptions import ValidationError
from .models import UserInfo

class Utils:
    """
    This class contains utility methods used throughout the application.
    """

    @staticmethod
    def send_verification_email(data):
        """
        This method sends a verification email to a user.
        The email's subject, body, and recipient are specified in the 'data' dictionary.
        """
        email = EmailMessage(subject=data['subject'], body=data['body'], to=[data['email']])
        email.send()

    @staticmethod
    def create_jwt_for_user(user) -> dict:
        """
        This method creates a JWT (JSON Web Token) for a given user.
        It returns a dictionary containing the access and refresh tokens.
        """
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        jwt = {
            'access_token': access_token,
            'refresh_token': refresh_token
        }

        return jwt

    @staticmethod
    def get_user_from_jwt(token, __type) -> UserInfo:
        """
        This method retrieves a user from a given JWT.
        The type of token ('access' or 'refresh') is specified by '__type'.
        If the user does not exist or an error occurs, it returns None.
        """
        if __type == 'refresh':
            try:
                refresh_token = RefreshToken(token)
                user_id = refresh_token['user_id']
                try:
                    user = UserInfo.objects.get(id=user_id)
                    return user
                except UserInfo.DoesNotExist:
                    return None
            except Exception as e:
                return None
        else:
            try:
                access_token = AccessToken(token)
                user_id = access_token['user_id']
                try:
                    user = UserInfo.objects.get(id=user_id)
                    return user
                except UserInfo.DoesNotExist:
                    return None
            except Exception as e:
                return None

    @staticmethod
    def password_validation(password):
        """
        This method validates a password according to certain criteria.
        If the password does not meet these criteria, it raises a ValidationError with a list of errors.
        """
        errors = []

        if len(password) < 8:
            errors.append('Password must be at least 8 characters long')
        if not any(char.isdigit() for char in password):
            errors.append('Password must contain at least one digit')
        if not any(char.isupper() for char in password):
            errors.append('Password must contain at least one uppercase letter')
        if not any(char.islower() for char in password):
            errors.append('Password must contain at least one lowercase letter')
        if not any(char in '!@#$%^&*()_+' for char in password):
            errors.append('Password must contain at least one special character')

        if errors:
            raise ValidationError(errors)