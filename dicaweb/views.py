from pyramid.response import Response
from pyramid.view import view_config
from pyramid.renderers import get_renderer
from pyramid.httpexceptions import HTTPNotFound

from sqlalchemy.exc import DBAPIError

from .models import (
    DBSession,
    MyModel,
    )
from dica.core.query import compute_howfar


@view_config(route_name='home', renderer='templates/mytemplate.pt')
def my_view(request):
    try:
        one = DBSession.query(MyModel).filter(MyModel.name == 'one').first()
    except DBAPIError:
        return Response(conn_err_msg, content_type='text/plain', status_int=500)
    return {'one': one, 'project': 'dica.web'}

conn_err_msg = """\
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to run the "initialize_dica.web_db" script
    to initialize your database tables.  Check your virtual 
    environment's "bin" directory for this script and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.

After you fix the problem, please restart the Pyramid application to
try it again.
"""

@view_config(route_name='howfar', renderer='templates/howfar.pt')
def howfar(request):
    if request.method == 'GET':
        return {'source': '', 'destination': '', 'distance':'', 'duration': ''}
    elif request.method == 'POST':
        source = request.params['source']
        destination = request.params['destination']
        howfar = compute_howfar(source=source,
                                destination=destination)
        assert howfar['status'] == 'OK'
        return {'source': source,
                'destination': destination,
                'distance': howfar['distance']['text'],
                'duration': howfar['duration']['text'],
                }
    return HTTPNotFound()
