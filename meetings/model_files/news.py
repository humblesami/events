from django.apps import apps
from django.db import models
from documents.file import File
from mainapp.ws_methods import queryset_to_list
from meetings.model_files.document import SignDocument
from meetings.model_files.event import Event
from survey.models import Survey
from django.db.models import Q, Count, Case, When, IntegerField, Sum


class News(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(default='', blank=True)
    photo = models.ImageField(upload_to='home/', default='profile/ETjUSr1v2n.png')

    def __str__(self):
        return self.name

    @classmethod
    def get_data(cls, request, params):
        uid = request.user.id
        home_object = {}
        news = News.objects.all()
        if not news:
            news = News(name='News & Announcements')
            news.save()
        else:
            news = news[0]

        home_object['news'] = {
            'id': news.id,
            'description': news.description,
            'photo': news.photo.url,
            'name': news.name,
        }
        videos = NewsVideo.objects.filter(news_id=news.id)
        news_videos = []
        for video in videos:
            video.url = video.url.replace('/watch?v=', '/embed/')
            news_videos.append({'name': video.name, 'url': video.url})

        docs = NewsDocument.objects.filter(news_id=news.id)
        news_docs = []
        for doc in docs:
            news_docs.append({'name': doc.name, 'id': doc.id})

        voting_model = apps.get_model('voting', 'Voting')
        esign_doc_model = apps.get_model('meetings', 'SignDocument')
        sign_doc_ids = SignDocument.objects.filter(
            Q(signature__user_id=request.user.id)).distinct().values('id', 'name', 'meeting__name').annotate(
                tot_signed=Count(
                    Case(
                        When(signature__signed=True, then=1)
                        ,output_field=IntegerField(),)
                        )).annotate(
                            tot_unsigned=Count(
                                Case(
                                    When(signature__signed=False, then=1)
                                    ,output_field=IntegerField(),)))
        
        # sign_doc_ids = queryset_to_list(sign_doc_ids,fields=['id','name','meeting__name', 'tot_signed', 'tot_unsigned'])
        sign_docs = []
        for sign_doc in sign_doc_ids:
            signature_status = ''
            if sign_doc['tot_unsigned'] == 0:
                signature_status = 'Completed'
                continue
            else:
                signature_status = str(sign_doc['tot_signed']) + ' /' + str(sign_doc['tot_unsigned'])
            sign_docs.append(
                {
                    'id': sign_doc['id'],
                    'name': sign_doc['name'],
                    'meeting__name': sign_doc['meeting__name'],
                    'signature_status': signature_status
                    })
        home_object['to_do_items'] = {
            'pending_meetings':  Event.get_pending_meetings(uid),
            'pending_surveys': Survey.get_pending_surveys(uid),
            'pending_documents': sign_docs,
            'pending_votings': voting_model.get_todo_votings(uid),
        }
        home_object['doc_ids'] = news_docs
        home_object['video_ids'] = news_videos
        home_object['calendar'] = Event.get_upcoming_public_events(uid)

        return {'error': '', 'data': home_object}

class NewsDocument(File):
    news = models.ForeignKey(News, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.file_type:
            self.file_type = 'home'
        super(NewsDocument, self).save(*args, **kwargs)


    @property
    def breadcrumb(self):
        data = []
        data.append({'title': 'Home', 'link': '/'})
        return data



class NewsVideo(models.Model):
    name = models.CharField('Video Title', max_length=200)
    url = models.CharField('Video Link', max_length=500)
    news = models.ForeignKey(News, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name