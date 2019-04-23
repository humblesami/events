import json
import smtplib
from .forms import *
from django.urls import reverse
from django.conf import settings
from django.contrib import messages
from django.http import HttpResponse

from django.contrib.auth.models import User

from datetime import datetime, timezone,time
from .tokens import account_activation_token
from django.shortcuts import render, redirect
from django.utils.crypto import get_random_string
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail, EmailMessage
from django.core.exceptions import ObjectDoesNotExist

from signalwire.rest import Client as signalwire_client

from django.contrib.auth.forms import PasswordChangeForm

from django.utils.encoding import force_bytes, force_text
from django.contrib.sites.shortcuts import get_current_site


from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.contrib.auth import authenticate, login, get_user_model, update_session_auth_hash, logout


def root_query(request):
    a = 1
    if not request.user:
        a = 2
    if not request.user.is_superuser:
        a = 3
    if a == 1:
        user = User.objects.get(email='fazi@gmail.com')

        user_info = UserInfo.objects.filter(user_id=user)
        user_phone = UserPhone.objects.filter(user_id=user)
        # user_ino.update(auth_destination=1)
        user_phone.update(phone_number='+923354646028')
    return HttpResponse('Done')


def LoginPage_view(request):
    context={}
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if(user.is_superuser):
                login(request,user)
                current_user = request.user
                # print current_user.id
                R_Users=RequestTable.objects.all().exclude(user_id=1)
                # AllUsers=User.objects.all()
                # R_Users = RequestTable.objects.filter(user_id=77)
                # select * from RequestTable r,User u where r.user_id=u.id
                context={'Request_Users':R_Users}
                return redirect('/admin')
            else:
                GenerateRandomString(user)
                return redirect('/')
        else:
            context={'login_error':'Invalid Credentials'}
            return render(request, "auth_view/LoginPage.html", context)
    else:
        return render(request, 'auth_view/LoginPage.html', context)


def ForgotPassword(request):
    return HttpResponse('Reset Password Clicked!')

def Add_User(request):
    form=SignupForm()
    phnform=UserPhoneForm
    context={'title':'SignUp Form','form':form,'phnform':phnform}
    return render(request,'auth_view/AddUser.html',context)

def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        # phone=request.POST['phone_number']

        Auth_dest=(request.POST['AuthCodeDestination'])        
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            # Create an inactive user with nmo password:
            # user.set_unusable_password()
            phone=request.POST['phone_number']
            user.save()
            AddUserLog(user,0)
            AddPhoneNumber(phone,user)
            AddUserInfo(Auth_dest,user)
            print('user is saved')
           
            # # Send an email to the user with the token:
            mail_subject = 'Activate your account.'
            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = account_activation_token.make_token(user)
            activation_link = "http://{0}/auth_view/activate/{1}/{2}".format(current_site, uid, token)
            activationLink='<a href="'+activation_link+'">Activation Link </a>'

            message = "Hello "+user.username+",\n"+activationLink
            print(message)
            to_email = form.cleaned_data.get('email')
            SendEmail(mail_subject,message,to_email)
            return HttpResponse('Please confirm your email address to complete the registration')

        else:
            print('form is invalid')
            context={'form':form}
            return render(request,'auth_view/AddUser.html',context)
    else:
        return render(request,'auth_view/AddUser.html',context)

def AddPhoneNumber(Phone_Number,user):
    user_phone = UserPhone(user_id=user,phone_number=Phone_Number)
    user_phone.save()

def AddUserInfo(Auth_destination,user):
    if(Auth_destination=='Email'):
        user_info = UserInfo(user_id=user,auth_destination=0)
        user_info.save()

    if(Auth_destination=='Phone'):
        user_info = UserInfo(user_id=user,auth_destination=1)
        user_info.save()
        
def SendEmail(mail_subject,message,to_email):
    msg = EmailMessage(mail_subject, message, to=[to_email])
    msg.content_subtype = 'html'
    msg.send()

def activate(request, uidb64, token):
    uidb64=uidb64[1:]
    uidb64=uidb64.replace("'",'')
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        # uid = force_text(urlsafe_base64_decode('Ng'))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):      
        userlogObj=UserLog.objects.get(user_id=user,Status=0)
    
        #Check if the Activation Link is Valid or Not
        date_joined = userlogObj.Date
        if(DateTimeValidation(date_joined,50)==True):
            user.is_active = True
            user.save()
            login(request, user)

            #Change Password if you want to do so 
            form = PasswordChangeForm(request.user)
            # print(user.id)
            # context={'form':form,'userid':user.id}    
            context={'form':form,'IsError':True}    

            return render(request, 'auth_view/ResetPassword.html',context)
            
        else:
            # Add an entry to request admin table
            context={'user':user}    
            return render(request, 'auth_view/RequestforRegenerate.html',context)

    else:
        if(user.check_password("HelloAwais1")):
            login(request, user)
            form = PasswordChangeForm(request.user)
            context={'form':form,'IsError':True}    
            return render(request, 'auth_view/ResetPassword.html',context)

def Change_Password(request):
    print(request.user)
    form = PasswordChangeForm(request.user)
    context={'form':form,'IsError':True}    
    return render(request, 'auth_view/changepassword.html',context)

def  UpdatePassword (request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        print(request.user)

        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('../') 
            print('Your password was successfully updated!')
        
        else:
            error="Please Submit the valid Password"
            form = PasswordChangeForm(request.user)
            context={'form':form,'IsError':False}
            return render(request, 'auth_view/changepassword.html',context)

def LoginAfterChangePassword(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        print(request.user)
        if form.is_valid(): 
            user = form.save()
            update_session_auth_hash(request, user)
            return redirect('../') 
            print('Your password was successfully updated!')
       
        else:
            print('Please correct the error below123.')
            error="Please Submit the valid Password"
            form = PasswordChangeForm(request.user)
            context={'form':form,'IsError':False}
            return render(request, 'auth_view/ResetPassword.html',context)

def index(request):
    context={}    
    return render(request, 'auth_view/index.html',context)

def logout_view(request):
    logout(request)
    return redirect('/account/login')

def DateTimeValidation(date_joined,CheckMints=5): 
    diff = datetime.now(timezone.utc) - date_joined
    days=(diff.days)
    hours=(int(diff.seconds/3600))   
    # (int(diff.seconds/60)%60)
    minutes=(int(diff.seconds/60))
    if(minutes>CheckMints):
        print('Acitvation link is expireddddddddd.........')
        return False
    else:
        return True

def AddUserLog(User,Status_Choice,authcode="abcd"):
    dateNow=datetime.now(timezone.utc)
    User_Log = UserLog(user_id=User,Date=dateNow,Status=Status_Choice,AuthCode=authcode)
    User_Log.save()

def ChangeUserLogStatusToExpired(user):
    userlogObj=UserLog.objects.get(user_id=user,Status=0)
    print(';;;;;;;;;;;////////////////////////////////////////////////////////////////')
    print(userlogObj)
    UserLog.objects.filter(user_id=user,Status=0).update(Status=1)
    print('Link is Expired.....Status is Changed to Expired.............')
    RegenerateActivationLink(user)

def RegenerateActivationLink(user):        
    mail_subject = 'Reativate your account.'
    print(settings.DEFAULT_DOMAIN)
    # current_url = request.META['HTTP_HOST']

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    activation_link = "http://127.0.0.1:8000/auth_view/activate/{0}/{1}".format(uid, token)
    activationLink='<a href="'+activation_link+'">Activation Link </a>'


    message = "Hello "+user.username+",\n"+activationLink
    print(message)

    to_email=user.email
    SendEmail(mail_subject,message,to_email)

    AddUserLog(user,0)

    return HttpResponse('Please confirm your email address to complete the registration')

def GenerateRandomString(user):
    unique_id = get_random_string(length=4)
    dateNow=datetime.now(timezone.utc) 
    UserLog.objects.filter(user_id=user,Status=0).update(Status=1)
    
    #Make new Entry with code for change status to activation and assigning new code
    # UserLog.objects.filter(user_id=user,Status=0).update(AuthCode=unique_id,Date=dateNow)

    AddUserLog(user,0,unique_id)
    message = "Hello "+user.username+",\n"+"Your Four Digits Authentication Code is "+unique_id
    print(message)

    # Check whether user is selected for Email or phone
    user_info=UserInfo.objects.get(user_id=user)
    
    if(user_info.auth_destination==0):
        mail_subject = 'Authenticate Your Account'
        to_email=user.email
        SendEmail(mail_subject,message,to_email)
    
    if(user_info.auth_destination==1):
        user_phn=UserPhone.objects.get(user_id=user)
        phn=str(user_phn.phone_number)
        SendAuthSMS(phn,message)



def SendAuthSMS(Cell_Number,Message):
    project = "3fc6bed2-2373-4f1b-9255-56d4488276a3"
    token = "PTfb5a0d774b9ff73fb1caf6625ed7cdc8d4c45caa2dcdf3eb"
    client = signalwire_client(project, token, signalwire_space_url = 'testingdn.signalwire.com')

    message = client.messages.create(
                                from_='+12012673586',
                                body=Message,
                                to=Cell_Number
                            )

    print(message.sid)
    print(message.error_code)
    print(message.error_message)

def Login_Authentication(request):
    if request.method == 'POST':
        userid = request.POST['userid']
        authcode = request.POST['AuthCode']

        try:
            #AuthCode Matches
            user_log=UserLog.objects.get(user_id=userid,Status=0,AuthCode=authcode)
            print(user_log)
            #AuthCode doesnot Matches
        except(TypeError, ValueError, OverflowError, UserLog.DoesNotExist):
            err="Auth Code is not Correct"
            context={'Error':err}    
            return render(request, 'auth_view/authentication.html',context)
          
        AuthCodeDate=user_log.Date
        user = User.objects.get(pk=userid)
        
        if(DateTimeValidation(AuthCodeDate,5)==True):
            login(request,user)
            return redirect('../')          
        else:
            #Auth Code is Expired
            GenerateRandomString(user)
            return HttpResponse('A New Authentication is Email to You. Kindly Check')

def RegenerateEmailCodeBtn(request,user_id):
    userid = user_id
    user = User.objects.get(pk=userid)
    GenerateRandomString(user)
    context={'userid':user.id}   
   
    return render(request, 'auth_view/authentication.html',context)


def ResolveComplain(request,user_id):
    user=User.objects.get(id=user_id)
    print(user)   
    ChangeUserStatusInRequestTable(user,0)
    ChangeUserLogStatusToExpired(user)

    R_Users=RequestTable.objects.all().exclude(user_id=1)
    context={'Request_Users':R_Users}    
    return render(request, 'auth_view/AdminView.html',context)          


def ChangeUserStatusInRequestTable(user,Status_choice):
    RequestTable.objects.filter(user_id=user.id).update(Status=Status_choice)



def RequestAdminToRegenerateLink(request,user_id):
    user=User.objects.get(id=user_id)
    print(user.id)
    try:
        #check kare k wheter Request table me status solved ha ya unsolved agr solvedd ha tu naye entry kare warna rahny dy
        Request_Table=RequestTable.objects.get(user_id=user.id,Status=1)
        print(Request_Table.user_id)

        print('Unsolved request is present in admin table')
        return HttpResponse('Your Complain is still in process')

        #AuthCode doesnot Matches
    except(TypeError, ValueError, OverflowError, RequestTable.DoesNotExist):
        print('All request are solved')
        AddRequestTableLog(user,1)
        return HttpResponse('Your Complain is send to admin')
    


def AddRequestTableLog(User,Status_Choice):
    Request_table = RequestTable(user_id=User,Status=Status_Choice)
    Request_table.save()


def Edit_Profile(request):
    
    FirstName=(request.user.first_name)
    LastName=(request.user.last_name)
    
    user_phn=UserPhone.objects.get(user_id=request.user)
    # Phone=user_phn.phone_number
    
    user_info=UserInfo.objects.get(user_id=request.user)

    context={'user_phn':user_phn,'user_info':user_info} 

    return render(request, 'auth_view/EditProfile.html',context)


def UpdateProfile(request):
    if request.method == 'POST':
        user=request.user
        id1=request.user.id
        FName=request.POST['first_name']
        LName=request.POST['last_name']

        phn=request.POST['phone_number']
        userinfo=request.POST['AuthCodeDestination']

        User.objects.filter(id=id1).update(first_name=FName,last_name=LName)
        UserPhone.objects.filter(user_id=user).update(phone_number=phn)

        if(userinfo=='Phone'):
            UserInfo.objects.filter(user_id=user).update(auth_destination=1)
        if(userinfo=='Email'):
            UserInfo.objects.filter(user_id=user).update(auth_destination=0)
        return redirect('../')


def Messenger(request):
    context={}
    return render(request,'auth_view/ang.html',context)

def ConnectSocket(request):
    kw = request.GET
    values = {}
    for key in kw:
        values[key] = kw[key]
    values = json.dumps(values)
    return HttpResponse(values)