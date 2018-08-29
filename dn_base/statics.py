import sys
import traceback

from odoo.exceptions import UserError

def raise_dn_model_error(er=False):
    eg = traceback.format_exception(*sys.exc_info())
    errorMessage = ''
    if er:
        errorMessage = er
    for er in eg:
        errorMessage += "--" + er
    raise UserError(errorMessage)