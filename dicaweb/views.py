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
from dica.core.query import compute_howfar


@view_config(route_name='home', renderer='templates/howfar.pt')
def howfar(request):
    if request.method == 'GET':
        return {'source': '', 'destination': '', 'distance':'', 'duration': '',
                'all_journies': DBSession.query(Journey).all()}
    elif request.method == 'POST':
        source = request.params['source'].strip().lower()
        destination = request.params['destination'].strip().lower()
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
    return HTTPNotFound()
