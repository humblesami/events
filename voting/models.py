from django.db import models
from django.contrib.auth.models import User
from meetings.models import Event, Topic
from smart_selects.db_fields import ChainedForeignKey

# Create your models here.

class VotingType(models.Model):
    name = models.CharField('Voting Type', max_length=100, blank = False)
    def __str__(self):
        return self.name

class VotingChoice(models.Model):
    name = models.CharField('Voting Choice', max_length = 100, blank = False)
    voting_type = models.ForeignKey(VotingType, on_delete = models.CASCADE, blank = False)
    def __str__(self):
        return self.name



class Voting(models.Model):
    voting_type = models.ForeignKey(VotingType, on_delete=models.CASCADE, blank = False)
    name = models.CharField('Title', max_length=200, blank = False)
    meeting = models.ForeignKey(Event, null=True, on_delete=models.SET_NULL, blank=True)
    topic = models.ForeignKey(Topic, null=True, on_delete=models.SET_NULL, blank=True)
    open_date = models.DateTimeField('Start Date', blank = False)
    close_date = models.DateTimeField('End Date', blank = False)
    signature_required = models.BooleanField('Signature Required', blank=True, default=False)
    enable_discussion = models.BooleanField('Enable Discussion', blank=True, default=False)
    public_visibility = models.BooleanField('Results Visible To All', blank=True, default=False)
    description = models.TextField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE, default = None)

    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}

class VotingAnswer(models.Model):
    answer = models.ForeignKey(VotingChoice, on_delete = models.CASCADE, blank = False)
    voting = models.ForeignKey(Voting, on_delete = models.CASCADE, blank = False)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = False)
    signature_data = models.BinaryField('Signature Data', blank = True)

    def __str__(self):
        return self.answer.name
    
    @classmethod
    def submit(cls, request, params):
        return {'error': 'Not implemented'}