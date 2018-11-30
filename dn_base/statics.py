import sys
import traceback
from odoo.exceptions import UserError

try:
    import pyclamd
except:
    donothing = True

def scan_virus(attachment):
    try:
        cd = pyclamd.ClamdUnixSocket()
        res = cd.scan_file(attachment)
        if res:
            raise UserError("Sorry this file is virus infected")
    except:
        donothing = True
def raise_dn_model_error(er=False):
    eg = traceback.format_exception(*sys.exc_info())
    errorMessage = ''
    if er:
        errorMessage = er
    else:
        for er in eg:
            errorMessage += "--" + er
    raise UserError(errorMessage)