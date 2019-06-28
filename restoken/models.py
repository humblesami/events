import uuid
import threading
from django.db import models
from meetings.model_files.user import Profile
from django.contrib.auth.tokens import default_token_generator    

class PostInfo(models.Model):
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    res_id = models.IntegerField()


class PostUserToken(models.Model):
    post_info = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    token = models.CharField(max_length=128)


    @classmethod
    def create_token(cls, params):
        res_app = params['res_app']
        res_model = params['res_model']
        res_id = params['res_id']
        user_id = params['user_id']
        e = threading.Event()
        e.wait(timeout=2)
        post_info = PostInfo.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if not post_info:
            post_info = PostInfo(res_app=res_app, res_model=res_model, res_id=res_id)
            post_info.save()
        else:
            post_info = post_info[0]
        user = Profile.objects.get(pk=user_id)
        token = uuid.uuid4().hex[:20]
        user_token = PostUserToken(post_info_id=post_info.id, user_id=user_id, token=token)
        user_token.save()
        return user_token


    @classmethod
    def validate_token(cls, token, do_not_expire=None):
        if token:
            user_token = PostUserToken.objects.filter(token=token)
            if not user_token:
                return False
            user_token1 = user_token[0]
            # if not do_not_expire:
            #     user_token.update(token='')
            return user_token1
        else:
            return False

        


