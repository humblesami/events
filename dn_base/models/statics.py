try:
    import pyclamd
except:
    donothing = True
from odoo.exceptions import UserError

def scan_virus(attachment):
    try:
        cd = pyclamd.ClamdUnixSocket()
        res = cd.scan_file(attachment)
        if res:
            raise UserError("Sorry this file is virus infected")
    except:
        donothing = True