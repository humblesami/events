from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your models here.
class AuthUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    @classmethod
    def login_user(cls, request, params):
        username = params['login']
        password = params['password']

        user = authenticate(request, username=username, password=password)
        if not user:
            return {'error': 'Invalid credentials'}
        login(request, user)

        if user and user.id:
            return {'name': user.username, 'id': user.id}
        else:
            return {'error': 'Invalid credentials'}

    @classmethod
    def logout_user(cls, request, params):
        logout(request)
        return {'error':'', 'data': 'ok'}

    @classmethod
    def verify(cls, request, params):
        user = request.user
        if user.id:
            return { 'name' : user.username, 'id' : user.id }
        else:
            return {'error': 'Unauthorized user'}


# def GenerateRandomString(user):
#     unique_id = get_random_string(length=4)
#     dateNow = datetime.now(timezone.utc)
#     UserLog.objects.filter(user_id=user, Status=0).update(Status=1)
#
#     # Make new Entry with code for change status to activation and assigning new code
#     # UserLog.objects.filter(user_id=user,Status=0).update(AuthCode=unique_id,Date=dateNow)
#
#     AddUserLog(user, 0, unique_id)
#     message = "Hello " + user.username + ",\n" + "Your Four Digits Authentication Code is " + unique_id
#     print(message)
#
#     # Check whether user is selected for Email or phone
#     user_info = UserInfo.objects.get(user_id=user)
#
#     if (user_info.auth_destination == 0):
#         mail_subject = 'Authenticate Your Account'
#         to_email = user.email
#         SendEmail(mail_subject, message, to_email)
#
#     if (user_info.auth_destination == 1):
#         user_phn = UserPhone.objects.get(user_id=user)
#         phn = str(user_phn.phone_number)
#         SendAuthSMS(phn, message)