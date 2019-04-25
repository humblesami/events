import base64

from django.db import models
from django.db.models import Count

from meetings.models import Event, Topic
from django.contrib.auth.models import User
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
    def answer(cls, request, params):
        voting_id = params.get('voting_id')
        choice_id = params.get('answer')
        user_id = request.user.id
        if not user_id:
            return 'User not found...'

        if choice_id:
            choice_id = int(choice_id)
        else:
            return 'Choice Not Found..'
        signature_data = params.get('signature_data')
        if signature_data:
            signature_data = base64.encodebytes(signature_data.encode())
            cls.update_Choice(choice_id, voting_id, user_id, signature_data)
            return {'data': 'Thanks Your Answer is Updated Successfully..!'}

        option_id = params.get('answer_id', False)
        signature_data = params.get('signature_data', False)
        if signature_data:
            signature_data = base64.encodebytes(signature_data.encode())
        if option_id:
            try:
                cls.update_Choice(option_id, voting_id, user_id, signature_data)
                return {'data':'Answer Updated Successfully.'}
            except:
                cls.save_Choice(option_id, voting_id, user_id, signature_data)
                return {'data':'Answer Saved Successfully.'}

        elif voting_id:
            chart_data = {}
            voting_choices = list(
                VotingChoice.objects.filter(voting_type=Voting.objects.get(pk=voting_id).voting_type.id))
            chart_data['option_data'] = []
            chart_data['option_results'] = []
            for option in voting_choices:
                chart_data['option_data'].append({'id': option.id, 'name': option.name})
                chart_data['option_results'].append({'option_name': option.name, 'option_result': 0})

            voting_results = VotingAnswer.objects.values('answer__name').filter(
                voting_id=voting_id).annotate(answer_count=Count('answer'))
            # count = voting_results

            if voting_results:
                for result in voting_results:
                    total = len(voting_results)
                    for extra_result in chart_data['option_results']:
                        if extra_result['option_name'] == result['answer__name']:
                            extra_result['option_result'] = result['answer_count']

        voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=request.user.id)
        data = {
            'answer': voting_answer.answer.name,
            'signature_data': base64.decodestring(voting_answer.signature_data),
            'chart_data': chart_data['option_results']
        }
        return data

    @classmethod
    def save_Choice(cls, choice_id, voting_id, user_id, signature_data):
        voting_answer = VotingAnswer()
        voting_answer.answer_id = int(choice_id)
        voting_answer.voting_id = voting_id
        voting_answer.user_id = user_id
        if signature_data:
            voting_answer.signature_data = signature_data
        voting_answer.save()

    @classmethod
    def update_Choice(cls, choice_id, voting_id, user_id, signature_data):
        voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=user_id)
        voting_answer.answer_id = int(choice_id)
        voting_answer.voting_id = voting_id
        voting_answer.user_id = user_id
        if signature_data:
            voting_answer.signature_data = signature_data
        voting_answer.save()

    @classmethod
    def submit(cls, request, params):
        return {'error': 'Not implemented'}