from fastapi import FastAPI
from models.details import FlightDetails
import uvicorn

app = FastAPI()

@app.get("/ping")
async def ping():
    return {'message': 'Hello, I am alive'}

@app.post("/predict")
async def predict(data: FlightDetails): 
    print(data)
    return {"data": data}

if __name__ == "__main__":
    
    uvicorn.run(app, port=8000, host="localhost")
