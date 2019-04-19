from signalwire.rest import Client as signalwire_client

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



# +15082988825

# import nexmo

# client = nexmo.Client(key='2467bc2b', secret='6ZaTVoAmuYv8bUhp')

# def SendAuthSMS(Cell_Number,Message):
#     response=client.send_message({
#         'from': '923314757599',
#         'to': Cell_Number,
#         'text': Message,
#     })
#     response=response['messages'][0]

#     if response['status']=='0':
#         print('send message '+response['message-id'])
#     else:
#         print ('Error'+ response['error-text'])