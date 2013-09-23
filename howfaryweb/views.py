from pyramid.response import Response
from pyramid.view import view_config
from pyramid.renderers import get_renderer
from pyramid.httpexceptions import HTTPNotFound
import transaction

from sqlalchemy.exc import DBAPIError

from .models import (
    DBSession,
    Journey,
    )
from howfary.core.query import compute_howfar


@view_config(route_name='home', request_method='GET', renderer='templates/home.pt')
def home(request):
    return {'source': '', 'destination': '', 'distance':'', 'duration': '',
            'all_journies': DBSession.query(Journey).order_by(Journey.id.desc()).all()}


@view_config(route_name='howfar', request_method='POST', renderer='json')
def howfar(request):
    request_data = request.json
    source = request_data.get('source').strip().lower()
    destination = request_data.get('destination').strip().lower()
    results = DBSession.query(Journey).filter(Journey.source==source,
                                              Journey.destination==destination)
    if results.count():
        result = results.one()
        distance = result.distance
        duration = result.duration
    else:
        howfar = compute_howfar(source=source,
                                destination=destination)
        assert howfar['status'] == 'OK'
        distance = howfar['distance']['text']
        duration = howfar['duration']['text']
        with transaction.manager:
            journey = Journey(source=source,
                              destination=destination,
                              distance=distance,
                              duration=duration)
            DBSession.add(journey)
    return {'source': source,
            'destination': destination,
            'result': {'distance': distance,
                       'duration': duration,
                       }
            }
