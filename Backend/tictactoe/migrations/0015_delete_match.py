# Generated by Django 4.2.15 on 2024-10-20 06:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0014_alter_match_winner'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Match',
        ),
    ]
