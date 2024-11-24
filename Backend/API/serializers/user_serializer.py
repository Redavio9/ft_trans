
from .game_serializer import GameStatsSerializer
from rest_framework import serializers
from django.db.models import Q
from ..utils import Utils
from ..models import *

class RegistrationSerializer(serializers.ModelSerializer):
	
	password = serializers.CharField(write_only=True, required=False, validators=[Utils.password_validation])
	re_password = serializers.CharField(write_only=True, required=False)

	class Meta:
		model = UserInfo
		fields = ['id', 'username', 're_password', 'first_name', 'last_name', 'email', 'date_joined', 'password', 'avatar', 'gender', 'is_verified']

	def validate(self, data):

		if 'password' in data:
			if not 're_password' in data \
				or ('re_password' in data and data['password'] != data['re_password']):
				raise serializers.ValidationError({'password': 'Passwords do not match'})
		return data

	def create(self, validated_data):

		password_exists = 'password' in validated_data
		email_exists = 'email' in validated_data

		if 're_password' in validated_data:
			validated_data.pop('re_password')

		if not password_exists:
			user = UserInfo(**validated_data)
			user.save()
			return user
		
		if not 'avatar' in validated_data:
			if validated_data["gender"] == "M":
				validated_data["avatar"] = "avatars/man.png"
			elif validated_data["gender"] == "f":
				validated_data["avatar"] = "avatar/woman.png"
			else:
				validated_data["avatar"] = "avatars/unknown.png"

		if password_exists:
			password = validated_data.pop('password')
		
		if "email" in validated_data:
			email = validated_data.pop('email')

		user = UserInfo(**validated_data)

		if password_exists:
			user.set_password(password)
		
		if email_exists:
			user.email = email.strip().lower()
		user.save()

		return user

class ProfileUpdatingSerializer(serializers.ModelSerializer):
	
	email = serializers.EmailField(required=True)

	class Meta:
		model = UserInfo
		fields = ['first_name', 'last_name', 'email', 'gender', 'username', 'two_fa', 'avatar']

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
		instance.avatar = validated_data.get('avatar', instance.avatar)

		instance.save()

		return instance
	
class FriendOperationsSerializer(serializers.ModelSerializer):

	class Meta:
		model = FriendRequests
		fields = ['sender', 'receiver', 'request_status']

	def validate_request_status(self, value):
		if not value in ['P', 'A', 'D', 'U']:
			raise serializers.ValidationError({"request_status": "Invalid value"})
		return value
	
	def validate(self, attrs):
		
		if attrs['sender'] == attrs['receiver']:
			raise serializers.ValidationError({"error": "You cannot send a friend request to yourself"})
		return attrs
	
	def create(self, validated_data):

		request_status = validated_data['request_status']
		sender = validated_data['sender']
		receiver = validated_data['receiver']

		if request_status == 'P':

			if FriendRequests.objects.filter(sender=sender, receiver=receiver).exists() or \
				FriendRequests.objects.filter(sender=receiver, receiver=sender).exists():
				raise serializers.ValidationError({"error": "Friend request already exists"})
			
			try:
				__request = FriendshipLists.objects.get(Q(user=sender) & Q(friend=receiver))
				raise serializers.ValidationError({"error": "Already friends"})
			except FriendshipLists.DoesNotExist:
				pass

			friend_request = FriendRequests(sender=sender, receiver=receiver, request_status="P")
			friend_request.save()

		elif request_status == 'A':

			friend_request = FriendRequests.objects.filter(sender=receiver, receiver=sender, request_status="P").first()

			if not friend_request:
				raise serializers.ValidationError({"error": "No friend request found to be accepted"})
			friend_request.delete()

			if FriendshipLists.objects.filter(user=sender, friend=receiver).exists() or \
				FriendshipLists.objects.filter(user=receiver, friend=sender).exists():
				raise serializers.ValidationError({"error": "Friendship already exists"})
		
			first_friendship = FriendshipLists(user=sender, friend=receiver)
			second_friendship = FriendshipLists(user=receiver, friend=sender)
			first_friendship.save()
			second_friendship.save()

		
		elif request_status == 'D':

			friend_request = FriendRequests.objects.filter(sender=receiver, receiver=sender, request_status="P").first()

			if not friend_request:
				raise serializers.ValidationError({"error": "Friend request does not exist"})

			friend_request.delete()
		
		elif request_status == 'U':

			left_friendship = FriendshipLists.objects.filter(user=sender, friend=receiver)

			if not left_friendship:
				raise serializers.ValidationError({"error": "No friendship found to be unfriended"})

			left_friendship.delete()
			right_friendship = FriendshipLists.objects.filter(user=receiver, friend=sender)

			right_friendship.delete()
		
		return validated_data

class GetBasicUserInfoSerializer(serializers.ModelSerializer):

	game_stats = GameStatsSerializer(many=True)
	
	class Meta:
		model = UserInfo
		fields = ['id', 'username', 'first_name', 'last_name',
			'email', 'avatar', 'gender', 'game_stats']


class GetFriendshipListSerializer(serializers.ModelSerializer):

	friend = GetBasicUserInfoSerializer()

	class Meta:
		model = FriendshipLists
		fields = ['friend']

class GetFriendRequestsSerializer(serializers.ModelSerializer):

	sender = GetBasicUserInfoSerializer()

	class Meta:
		model = FriendRequests
		fields = ["sender"]

class SentRequestsSerializer(serializers.ModelSerializer):

	receiver = GetBasicUserInfoSerializer()

	class Meta:
		model = FriendRequests
		fields = ['receiver']

class GetUserFullData(serializers.ModelSerializer):

	game_stats = GameStatsSerializer(many=True)
	friend_requests = GetFriendRequestsSerializer(many=True)
	friends = GetFriendshipListSerializer(many=True)
	sent_requests = SentRequestsSerializer(many=True)

	class Meta:
		model = UserInfo
		fields = ['id', 'username', 'first_name', 'last_name', 'avatar', 'gender', 'is_verified',
			'two_fa', 'email', 'game_stats', 'friend_requests', 'friends', 'sent_requests']

class GetUsersListSerializer(serializers.ModelSerializer):

	game_stats = GameStatsSerializer(many=True)
	full_name = serializers.SerializerMethodField()
	total_friends = serializers.SerializerMethodField()

	class Meta:
		model = UserInfo
		fields = ['id', 'full_name', 'username', 'first_name', 'last_name',
			'avatar', 'gender', 'is_verified', 'email', 'game_stats', 'total_friends']
	
	def get_full_name(self, obj):
		return obj.get_full_name()
	
	def get_total_friends(self, obj):
		return obj.get_total_friends()