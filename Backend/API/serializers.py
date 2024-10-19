
from .models import UserInfo, UserGameStats
from rest_framework import serializers
from .utils import Utils

class RegistrationSerializer(serializers.ModelSerializer):
	
	password = serializers.CharField(write_only=True, required=False, validators=[Utils.password_validation])
	re_password = serializers.CharField(write_only=True, required=False)

	class Meta:
		model = UserInfo
		fields = ['id',
				'username',
				're_password',
				'first_name',
				'last_name',
				'email',
				'date_joined',
				'password',
				'avatar',
				'gender',
				'is_verified',]


	def validate(self, data):

		if 'password' in data:
			if not 're_password' in data \
				or ('re_password' in data and data['password'] != data['re_password']):
				raise serializers.ValidationError({'password': 'Passwords do not match'})
		return data

	def create(self, validated_data):

		if 're_password' in validated_data:
			validated_data.pop('re_password')

		if 'password' not in validated_data:
			user = UserInfo(**validated_data)
			user.save()
			return user

		password = validated_data.pop('password')
		email = validated_data.pop('email')
		user = UserInfo(**validated_data)
		user.set_password(password)
		user.email = email.strip().lower()
		user.save()

		return user

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserInfo
		fields = ['id',
				'username',
				'first_name',
				'last_name',
				'email',
				'date_joined',
				'avatar',
				'date_joined',
				'gender']

class GameStatsSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserGameStats
		fields = "__all__"

class UserProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserInfo
		fields = ['id',
				'gender',
				'username',
				'first_name',
				'last_name',
				'email',
				'date_joined',
				'avatar',]

class PasswordUpdateSerializer(serializers.ModelSerializer):
	
	old_password = serializers.CharField(write_only=True, required=True)
	new_password = serializers.CharField(write_only=True, required=True)
	re_new_password = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = UserInfo
		fields = ['old_password', 'new_password', 're_new_password']

	def validate(self, data):

		if data['new_password'] != data['re_new_password']:
			raise serializers.ValidationError({'new_password': 'Passwords do not match'})
		return data
	
	def validate_old_password(self, value):
		user = self.context['request'].user
		if not user.check_password(value):
			raise serializers.ValidationError('Old password is incorrect')
		return value

	def update(self, instance, validated_data):
		instance.set_password(validated_data['new_password'])
		instance.save()
		return instance

class ResetPasswordSerializer(serializers.ModelSerializer):
	
	new_password = serializers.CharField(write_only=True, required=True)
	re_new_password = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = UserInfo
		fields = ['new_password', 're_new_password']

	def validate(self, data):

		if data['new_password'] != data['re_new_password']:
			raise serializers.ValidationError({'new_password': 'Passwords do not match'})
		return data

	def update(self, instance, validated_data):
		instance.set_password(validated_data['new_password'])
		instance.save()
		return instance

class ProfileUpdateSerializer(serializers.ModelSerializer):
	
	email = serializers.EmailField(required=True)

	class Meta:
		model = UserInfo
		fields = ['first_name', 'last_name', 'email', 'gender', 'username', 'two_fa']

		def validate_email(self, value):
			user = self.context['request'].user
			if UserInfo.objects.exclude(pk=user.pk).filter(email=value).exists():
				raise serializers.ValidationError({"email": "This email is already in use."})
			return value
		
		
		def validate_username(self, value):
			user = self.context['request'].user
			if UserInfo.objects.exclude(pk=user.pk).filter(username=value).exists():
				raise serializers.ValidationError({"username": "This username is already in use."})
			return value

		def validate_two_fa(self, value):
			if not value in [True, False]:
				raise serializers.ValidationError({"two_fa": "Invalid value"})
			return value
		
		def update(self, instance, validated_data):

			instance.first_name = validated_data.get('first_name', instance.first_name)
			instance.last_name = validated_data.get('last_name', instance.last_name)
			instance.email = validated_data.get('email', instance.email)
			instance.username = validated_data.get('username', instance.username)
			instance.two_fa = validated_data.get('two_fa', instance.two_fa)
			instance.save()

			return instance