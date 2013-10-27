from pyramid.view import view_config
import transaction
from howfary.core.query import compute_howfar, DIRECTIONS_LINK_URL

from .models import (
    DBSession,
    Journey,
    )


@view_config(route_name='home', request_method='GET',
             renderer='templates/home.pt')
def home(request):
    return {'source': '', 'destination': '', 'distance': '', 'duration': '',
            'all_journies': DBSession.query(Journey).order_by(
                Journey.id.desc()).all(),
            'link': DIRECTIONS_LINK_URL.format(source='', destination='')
            }


@view_config(route_name='howfar', request_method='POST', renderer='json')
def howfar(request):
    request_data = request.json
    source = request_data.get('source').strip()
    destination = request_data.get('destination').strip()
    results = DBSession.query(Journey).filter(
        Journey.source == source.lower(),
        Journey.destination == destination.lower())
    if results.count():
        result = results.one()
        distance = result.distance
        duration = result.duration
    else:
        howfar_info = compute_howfar(source=source,
                                     destination=destination)
        distance = howfar_info['distance']['text']
        duration = howfar_info['duration']['text']
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
                       'link': DIRECTIONS_LINK_URL.format(source=source,
                                                          destination=destination)
                       }
            }
