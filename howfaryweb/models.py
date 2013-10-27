from sqlalchemy import (
    Column,
    Integer,
    String,
    )

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData
from sqlalchemy.ext.hybrid import hybrid_property

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker,
    )

from zope.sqlalchemy import ZopeTransactionExtension
from howfary.core.query import DIRECTIONS_LINK_URL

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base(metadata=MetaData())


class Journey(Base):
    __tablename__ = 'journey'
    id = Column(Integer, primary_key=True)
    source = Column(String)
    destination = Column(String)
    distance = Column(String)
    duration = Column(String)

    @hybrid_property
    def howfar(self):
        return dict(distance=self.distance, duration=self.duration)

    @hybrid_property
    def link(self):
        return DIRECTIONS_LINK_URL.format(source=self.source,
                                          destination=self.destination)
