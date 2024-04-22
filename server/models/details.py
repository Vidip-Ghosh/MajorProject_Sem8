from pydantic import BaseModel

class FlightDetails(BaseModel):
    source: str
    destination: str   
    departureDate: str
    arrivalDate: str