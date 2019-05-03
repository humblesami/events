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
    my_status = models.CharField(max_length=50, default='pending')
    # user = models.ForeignKey(User, on_delete=models.CASCADE, default = None)

    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        if params['id']:
            voting_id = params['id']
            voting_object_orm = Voting.objects.get(pk=voting_id)
            voting_object = list(Voting.objects.filter(pk=voting_id).values())
            voting_object = voting_object[0]
            voting_object['open_date'] = str(voting_object['open_date'])
            voting_object['close_date'] = str(voting_object['close_date'])
            if voting_object_orm.voting_type:
                voting_object['voting_type'] = []
                voting_object['voting_type'].append({'id': voting_object_orm.voting_type.id,
                'name': voting_object_orm.voting_type.name})

                voting_options = list(voting_object_orm.voting_type.votingchoice_set.values())
                voting_object['voting_options'] = []
                voting_object['chart_data'] = []
                for option in voting_options:
                    voting_object['voting_options'].append({'id': option['id'], 'name': option['name']})
                    voting_object['chart_data'].append({'option_name': option['name'], 'option_result': 0})

                voting_results = VotingAnswer.objects.values('user_answer__name').filter(voting_id=voting_id).annotate(
                    answer_count=Count('user_answer'))
                if voting_results:
                    for result in voting_results:
                        total = len(voting_results)
                        for chart_data in voting_object['chart_data']:
                            if chart_data['option_name'] == result['user_answer__name']:
                                chart_data['option_result'] = result['answer_count']

            voting_object['meeting'] = []
            voting_object['topic'] = []
            meeting = voting_object_orm.meeting
            if meeting:
                voting_object['meeting'].append({'id': meeting.id, 'name': meeting.name})
            topic = voting_object_orm.topic
            if topic:
                voting_object['topic'].append({'id': topic.validate_unique()})
            voting_object['voting_docs'] = []

        data = {"voting": voting_object}

        return {'data': data}


    @classmethod
    def get_records(cls, request, params):
        votings = Voting.objects.values()
        total_cnt = votings.count()
        current_cnt = total_cnt
        votings = list(votings)
        for voting in votings:
            voting['open_date'] = str(voting['open_date'])  #.day) + '-' + str(voting['open_date'].month) + '-' +str(voting['open_date'].year)
            voting['close_date'] = str(voting['close_date'].year) + '-' + str(voting['close_date'].month) + '-' + str(voting['close_date'].day)
            voting['voting_type']= list(VotingType.objects.filter(pk=voting['voting_type_id']).values('name'))[0]['name']
        votings_json = {'records': votings, 'total': 0, 'count': 0}
        return votings_json

class VotingAnswer(models.Model):
    voting = models.ForeignKey(Voting, on_delete = models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = False)
    signature_data = models.BinaryField('Signature Data', blank = True)
    user_answer = models.ForeignKey(VotingChoice, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.user_answer.name

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

            voting_results = VotingAnswer.objects.values('user_answer__name').filter(
                voting_id=voting_id).annotate(answer_count=Count('user_answer'))
            # count = voting_results

            if voting_results:
                for result in voting_results:
                    total = len(voting_results)
                    for extra_result in chart_data['option_results']:
                        if extra_result['option_name'] == result['user_answer__name']:
                            extra_result['option_result'] = result['answer_count']

        voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=request.user.id)
        data = {
            'answer': voting_answer.answer.name,
            'signature_data': base64.decodestring(voting_answer.signature_data),
            'chart_data': chart_data['option_results']
        }
        return data

    @classmethod
    def update_my_status(self, choice_id, voting_id):
        voting_choice = VotingChoice.objects.get(pk=choice_id)
        voting = Voting.objects.get(pk=voting_id)
        voting.my_status = voting_choice.name
        voting.save()

    @classmethod
    def save_Choice(cls, choice_id, voting_id, user_id, signature_data):
        voting_answer = VotingAnswer()
        voting_answer.user_answer_id = int(choice_id)
        voting_answer.voting_id = voting_id
        voting_answer.user_id = user_id
        if signature_data:
            voting_answer.signature_data = signature_data
        voting_answer.save()
        cls.update_my_status(choice_id, voting_id)



    @classmethod
    def update_Choice(cls, choice_id, voting_id, user_id, signature_data):
        voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=user_id)
        voting_answer.user_answer_id = int(choice_id)
        voting_answer.voting_id = voting_id
        voting_answer.user_id = user_id
        if signature_data:
            voting_answer.signature_data = signature_data
        voting_answer.save()
        cls.update_my_status(choice_id, voting_id)


    @classmethod
    def submit(cls, request, params):
        voting_id = params.get('voting_id')
        user_answer_id = params.get('voting_option_id')
        res = 'error'
        signature_data = ''
        chart_data = []
        if voting_id:
            voting_object = Voting.objects.get(pk=voting_id)
            if voting_object:
                if voting_object.signature_required:
                    pass
                else:
                    voting_answer = VotingAnswer.objects.filter(voting_id = voting_id, user_id = request.user.id)
                    if voting_answer:
                        cls.update_Choice(choice_id= user_answer_id, voting_id= voting_id, user_id= request.user.id, signature_data='')
                        res = 'Update'
                    else:
                        cls.save_Choice(choice_id= user_answer_id, voting_id= voting_id, user_id= request.user.id, signature_data='')
                        res = 'Created'

                voting_options = list(voting_object.voting_type.votingchoice_set.values())
                for option in voting_options:
                    chart_data.append({'option_name': option['name'], 'option_result': 0})

                voting_results = VotingAnswer.objects.values('user_answer__name').filter(voting_id=voting_id).annotate(
                    answer_count=Count('user_answer'))
                if voting_results:
                    for result in voting_results:
                        for data in chart_data:
                            if data['option_name'] == result['user_answer__name']:
                                data['option_result'] = result['answer_count']

        if voting_object.signature_required:
            data = {
                'voting_option_id': user_answer_id,
                'operation': res,
                'signature_data': signature_data,
                'chart_data': chart_data
            }
            return data
        else:
            data = {
                'voting_option_id': user_answer_id,
                'operation': res,
                'chart_data': chart_data

            }
            return data


    @classmethod
    def get_signature(cls, request, params):
        voting_id = params.get('voting_id')
        if voting_id:
            voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=request.user.id)
            signature_data = voting_answer.signature_data
            if signature_data:
                base64.decodestring(signature_data)
                signature_data = signature_data.decode('utf-8')
                data = {
                    'signature': signature_data
                }
            else:
                data = {
                    'signature': ''
                }
        return data


