# Generated by Django 5.1 on 2024-08-18 06:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_board_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='board',
            old_name='image',
            new_name='thumbnail',
        ),
    ]
