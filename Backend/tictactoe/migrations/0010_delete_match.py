# Generated by Django 4.2.15 on 2024-10-20 04:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tictactoe', '0009_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Match',
        ),
    ]