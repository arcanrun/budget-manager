# Generated by Django 2.1.7 on 2019-03-31 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_vkuser_max_for_today'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vkuser',
            old_name='max_for_today',
            new_name='max_for_today_common',
        ),
        migrations.AddField(
            model_name='vkuser',
            name='max_for_today_fun',
            field=models.TextField(default=1, max_length=1000),
            preserve_default=False,
        ),
    ]