
from rest_framework import serializers
from ..models import UserInfo

class PasswordUpdatingSerializer(serializers.ModelSerializer):
	
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

class PasswordResettingSerializer(serializers.ModelSerializer):
	
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