import smtplib

def send_mail(msg):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("myemail", "psw")
    recievers = "zartash.baig@gmail.com,asfand.yar@digitalnet.com"
    server.sendmail("sami.akram@digitalnet.com", recievers, msg)