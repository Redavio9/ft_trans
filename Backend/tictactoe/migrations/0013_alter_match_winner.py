# Generated by Django 4.2.15 on 2024-10-20 06:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0012_match_winner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='winner',
            field=models.CharField(blank=True, max_length=1, null=True),
        ),
    ]
