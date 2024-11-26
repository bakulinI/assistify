from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager

class Role(models.Model):
    title = models.CharField(max_length=100, verbose_name = 'Роль', default=None,null=False)
    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'


class CustomUser(AbstractUser):
    username = models.CharField(verbose_name='Имя пользователя', max_length=150,null=False, unique=True)
    email = models.EmailField(unique=True,null=True,default=None,blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    name = models.CharField(verbose_name='Имя', max_length=150,null=True,default=None, blank=True)
    surname = models.CharField(verbose_name='Фамилия', max_length=150 ,null=True,default=None, blank=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT,null=True,default = None, blank = True, verbose_name='Роль')
    photo = models.ImageField(verbose_name='Фото', upload_to='worker_images', null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    def has_perm(self, perm, obj=None):
        return self.is_superuser
    def has_module_perms(self, app_label):
        return self.is_superuser
    def get_privs(self):
        return []
    def get_name(self):
        return f'{self.name} {self.surname}'
    class Meta:
        db_table = 'auth_user'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    def __str__(self):
        return f'{self.username}'


class Dialog(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='dialog',
        verbose_name='Пользователь'
    )
    settings = models.JSONField(default=dict({
        "botBubble": {"showAvatar": True},
        "audio": {"voiceNames": ["Google русский (ru-RU)"], "disabled": False, "language": "ru-RU"},
        "voice": {"language": "ru-RU", "disabled": False},
        "general": {"embedded": False},
        "header": {"avatar": "/logo.svg"},
        "tooltip": {"mode": "CLOSE", "text": "Talk to me! 😊"},
        "chatHistory": {"storageKey": "conversations_summary"}
    }))

    def __str__(self):
        return f"{self.user.username}"

    class Meta:
        verbose_name = 'Ассистент'
        verbose_name_plural = 'Ассистенты'