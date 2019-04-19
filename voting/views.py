from django.shortcuts import render
from django.http import HttpResponse
from .models import Voting, VotingType, VotingChoice, VotingAnswer
import base64
import simplejson as json

# Create your views here.

def index(request):
    lastest_voting_list = Voting.objects.all()
    context = {'latest_voting_list': lastest_voting_list}
    return render(request, 'voting/index.html', context)

def detail(request, voting_id):
    voting = Voting.objects.get(pk = voting_id)
    options = list(VotingChoice.objects.filter(voting_type = voting.voting_type_id))
    userInfo = request.user.is_superuser
    context = {
        'voting': voting,
        'options': options,
        'userInfo': userInfo
    }
    return render(request, 'voting/detail.html', context)

def answer(request, voting_id):
    user_id=request.user.id
    if not user_id:
        return HttpResponse('User not found...')
    if request.method == 'POST':
        choice_id = request.POST.get('answer', False)
        if choice_id:
            choice_id = int(choice_id)
        else:
            return HttpResponse('Choice Not Found..')
        try:
            update_Choice(choice_id, voting_id, user_id)
            return HttpResponse('Thanks Your Answer is Updated Successfully..!')
        except VotingAnswer.DoesNotExist:
            save_Choice(choice_id, voting_id, user_id)
            return HttpResponse('Thanks Your Answer is Saved Successfully..!')
    else:
        option_id = request.GET.get('answer_id', False)
        signature_data = request.GET.get('signature_data', False)
        if signature_data:
            signature_data = base64.encodebytes( signature_data.encode())
        if option_id:
            try:
                update_Choice(option_id, voting_id, user_id, signature_data)
                return HttpResponse('Answer Updated Successfully.')
            except VotingAnswer.DoesNotExist:
                save_Choice(option_id, voting_id, user_id, signature_data)
                return HttpResponse('Answer Saved Successfully.')
        else:
            try:
                voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=request.user.id)
                data = {
                    'answer': voting_answer.answer.name,
                    'signature_data': voting_answer.signature_data
                }
                res_data =json.dumps(data)
                return HttpResponse(res_data)
            except VotingAnswer.DoesNotExist:
                return HttpResponse('noting')


def save_Choice(choice_id, voting_id, user_id, signature_data):
    voting_answer = VotingAnswer()
    voting_answer.answer_id = int(choice_id)
    voting_answer.voting_id = voting_id
    voting_answer.user_id = user_id
    if signature_data:
        voting_answer.signature_data = signature_data
    voting_answer.save()

def update_Choice(choice_id, voting_id, user_id, signature_data):
    voting_answer = VotingAnswer.objects.get(voting_id=voting_id, user_id=user_id)
    voting_answer.answer_id = int(choice_id)
    voting_answer.voting_id = voting_id
    voting_answer.user_id = user_id
    if signature_data:
        voting_answer.signature_data = signature_data
    voting_answer.save()

def record_signature(request, res_model, res_id):
    return HttpResponse('voting signature accessed..')