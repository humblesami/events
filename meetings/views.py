from django.shortcuts import render
from .model_files.event import Event, STATE_SELECTION
from restoken.models import PostUserToken

def index(request):
    return render(request, 'index.html', context={})

def response_invitation(request, meeting_id, response, token):
    context = {}
    if token:
        user_token = PostUserToken.validate_token(token)
        if not user_token:
            context['error'] = 'Invalid Token'
        else:
            if meeting_id != user_token.post_info.res_id:
                context['error'] = 'Invalid Token'
            else:
                response_valid = False
                for state in STATE_SELECTION:
                    if state[0] == response:
                        response_valid = True
                        break
                if not response_valid:
                    context['error'] = 'Invlalid Response'
                else:
                    params = {
                        'meeting_id': meeting_id,
                        'response': response,
                        'user_id': user_token.user.id
                    }
                    if Event.respond_invitation(request, params) == 'done':
                        context['success'] = 'Response Submitted Successfully'
                    else:
                        context['error'] = 'Error While Submitting Response'
    else:
        context['error'] = 'Invalid Token'
    return render(request, 'response_submit.html', context)
    