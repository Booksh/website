# Generated by Django 5.0.4 on 2024-05-17 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_submission_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='password',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
