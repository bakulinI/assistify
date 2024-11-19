from django.conf import settings
from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.permissions import AllowAny
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import CustomUserSerializer, UserListSerializer, GetTokenSerializer
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample,extend_schema_view
from drf_spectacular.types import OpenApiTypes
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import action


class UserViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserListSerializer