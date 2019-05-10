from django.apps import apps
from django.db import models
from documents.file import File
from meetings.model_files.event import Event

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
        home_object['to_do_items'] = {
            'pending_meetings':  Event.get_pending_meetings(uid),
            'pending_surveys': voting_model.get_todo_votings(uid),
            'pending_documents': [],
            'pending_votings': []
        }
        home_object['doc_ids'] = news_docs
        home_object['video_ids'] = news_videos
        home_object['calendar'] = Event.get_upcoming_public_events()

        return {'error': '', 'data': home_object}

class NewsDocument(File):
    news = models.ForeignKey(News, on_delete=models.CASCADE)

class NewsVideo(models.Model):
    name = models.CharField('Video Title', max_length=200)
    url = models.CharField('Video Link', max_length=500)
    news = models.ForeignKey(News, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name