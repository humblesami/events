def get_user_name(user):
    name = False
    if user.first_name:
        name = user.first_name
        if user.last_name:
            name += ' ' + user.last_name
    elif user.last_name:
        name += user.last_name
    else:
        name = user.username
    return name