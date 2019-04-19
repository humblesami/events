from django import forms
from .models import *
from django.contrib.auth.models import User
from django.core import validators
from django.contrib.auth.forms import UserCreationForm
from datetime import datetime, timezone,time
from phonenumber_field.formfields import PhoneNumberField
from phonenumber_field.validators import validate_international_phonenumber



class SignupForm(UserCreationForm):
    email = forms.EmailField(required=True,max_length=200)
    username=forms.CharField(widget=forms.TextInput(attrs={"placeholder":"username"}),label='username',required=True,max_length=250)  
    password1=forms.CharField(widget=forms.PasswordInput(attrs={"placeholder":"Password"}),label='Password',required=True,max_length=50) 
    password2=forms.CharField(widget=forms.PasswordInput(attrs={"placeholder":"confirm Password"}),label='Confirm Password',required=True,max_length=50) 
    class Meta:
        model = User
        fields = ('username','email', 'first_name', 'last_name')



class UserPhoneForm(forms.ModelForm):
    phone_number = PhoneNumberField(required=True)

    class Meta():
        model=UserPhone
        fields=['phone_number']


    # def clean_phone_number(self):
    #     cleaned_data = super(UserPhoneForm, self).clean()
    #     print('//.......///////////////////////////////////////////////')
    #     phoneName=cleaned_data.get('phone_number')
    #     print(phoneName)
    #     if phoneName:
    #         print('aaaaaaaaaaaaaaa')
    #         raise forms.ValidationError('You have to write something!')
    #     else:
    #         print('vvvvvvvvvvvvv')
    #     # cleaned_data = super(UserPhoneForm, self).clean()


    #     # phone = self.cleaned_data["phone"]
    #     return phoneName
    #     # return 'aden'

