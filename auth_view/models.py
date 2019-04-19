from django.db import models
from datetime import datetime, timezone,time
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField



class UserLog(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  
    Status_Choices=((0,'Activation Link'),(1,'Expired Link'),)
    # Type_Choices=((0,'Email'),(1,'SMS'),)
    Date=models.DateTimeField(default=datetime.now, blank=True)
    Status=models.IntegerField(choices=Status_Choices,default=0) 
    AuthCode=models.CharField(max_length=4,default='abcd')
    # Type=models.IntegerField(choices=Type_Choices,default=0)
    
    # def __str__(self):
    #      return self.Status 

class RequestTable(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  
    Status_Choices=((0,'Solved'),(1,'UnSolved'),)
    Status=models.IntegerField(choices=Status_Choices,default=0)


class UserPhone(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  
    # phone type mobile home landline business number 
    phone_number = PhoneNumberField(default=1234567891011)


class UserInfo(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  
    Type_Choices=((1,'Phone'),(2,'Email'))
    auth_destination=models.IntegerField(choices=Type_Choices,default=1)