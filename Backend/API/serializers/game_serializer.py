
from ..models import UserGameStats, GameResults
from rest_framework import serializers

class GameStatsSerializer(serializers.ModelSerializer):

	win_rate = serializers.SerializerMethodField()
	draw_rate = serializers.SerializerMethodField()
	loss_rate = serializers.SerializerMethodField()
	total_games = serializers.SerializerMethodField()

	class Meta:
		model = UserGameStats
		fields = ['level', 'total_games', 'won_games', 'lost_games', 'draw_games',
			'won_tournaments', 'total_tournaments', 'experience_points',
			'win_rate', 'draw_rate', 'loss_rate', 'rank']
	
	def get_win_rate(self, obj):
		return obj.get_win_rate()

	def get_draw_rate(self, obj):
		return obj.get_draw_rate()
	
	def get_loss_rate(self, obj):
		return obj.get_loss_rate()
	def get_total_games(self, obj):
		return obj.get_total_games_played()

class GameResultRecordingSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = GameResults
		fields = "__all__"
	
	def validate(self, data):

		winner = data.get('player_1')
		loser = data.get('player_2')
		winner_score = data.get('score_1')
		loser_score = data.get('score_2')

		if winner == loser:
			raise serializers.ValidationError("Both players cannot be the same")

		if winner_score < 0 or loser_score < 0:
			raise serializers.ValidationError("Scores cannot be negative")
		
		if loser_score > winner_score:
			raise serializers.ValidationError("Loser score cannot be greater than winner score")

		return data
	
	def create(self, validated_data):
		winner = validated_data.get('player_1')
		loser = validated_data.get('player_2')
		winner_score = validated_data.get('score_1')
		loser_score = validated_data.get('score_2')

		is_draw = winner_score == loser_score
		
		game = GameResults.objects.create(player_1 = winner, player_2 = loser, score_1 = winner_score, score_2 = loser_score, is_draw = is_draw)
		game.save()
		return game

class UserGameHistorySerializer(serializers.ModelSerializer):

	player_1 = serializers.SerializerMethodField()
	player_2 = serializers.SerializerMethodField()

	class Meta:
		model = GameResults
		fields = ['player_1', 'player_2', 'score_1', 'score_2', 'game_date', 'is_draw']
	
	def get_player_1(self, obj):
		return obj.player_1.username
	
	def get_player_2(self, obj):
		return obj.player_2.username

class GameStateUpdatingSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserGameStats
		fields = "__all__"
	
	def validate_non_negative(self, value, message = "Value cannot be negative"):
		if value < 0:
			raise serializers.ValidationError(message)
		return value
	
	def validate_level(self, value):
		return self.validate_non_negative(value)

	def validate_rank(self, value):
		if not value in ['Beginner', "Amateur", "Semi-Pro", "Pro", "World Class", "Legendary", "Ultimate"]:
			raise serializers.ValidationError("Invalid rank")
		return value

	def validate_won_games(self, value):
		return self.validate_non_negative(value, "Won games cannot be negative")
	
	def validate_lost_games(self, value):
		return self.validate_non_negative(value, "Lost games cannot be negative")
	
	def validate_draw_games(self, value):
		return self.validate_non_negative(value, "Draw games cannot be negative")
	
	def validate_won_tournaments(self, value):
		return self.validate_non_negative(value, "Won tournaments cannot be negative")
	
	def validate_total_tournaments(self, value):
		return self.validate_non_negative(value, "Total tournaments cannot be negative")

	def validate_experience_points(self, value):
		return self.validate_non_negative(value, "Experience points cannot be negative")
	
	def update(self, instance, validated_data):
		instance.level = validated_data.get('level', instance.level)
		instance.rank = validated_data.get('rank', instance.rank)
		instance.won_games = validated_data.get('won_games', instance.won_games)
		instance.lost_games = validated_data.get('lost_games', instance.lost_games)
		instance.draw_games = validated_data.get('draw_games', instance.draw_games)
		instance.won_tournaments = validated_data.get('won_tournaments', instance.won_tournaments)
		instance.total_tournaments = validated_data.get('total_tournaments', instance.total_tournaments)
		instance.experience_points = validated_data.get('experience_points', instance.experience_points)
		instance.save()
		return instance