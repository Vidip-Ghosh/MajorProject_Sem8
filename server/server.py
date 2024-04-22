from flask import Flask,request
from flask_cors import CORS
import pandas as pd 
import pickle

app = Flask(__name__)
CORS(app)

# model = pickle.load('flight_rf.pkl')
# file_path = 'flight_rf.pkl'
# with open(file_path , 'rb') as f:
#     model = pickle.load(file_path)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route("/predict")
def predict(): 
    if request.method=="POST": 
        # Date_of_Journey
        date_dep = request.form["Dep_Time"]
        Journey_day = int(pd.to_datetime(date_dep, format="%Y-%m-%dT%H:%M").day)
        Journey_month = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").month)
        
        # Departure
        Dep_hour = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").hour)
        Dep_min = int(pd.to_datetime(date_dep, format ="%Y-%m-%dT%H:%M").minute)
        
        # Arrival
        date_arr = request.form["Arrival_Time"]
        Arrival_hour = int(pd.to_datetime(date_arr, format ="%Y-%m-%dT%H:%M").hour)
        Arrival_min = int(pd.to_datetime(date_arr, format ="%Y-%m-%dT%H:%M").minute)
        
        # Duration
        dur_hour = abs(Arrival_hour - Dep_hour)
        dur_min = abs(Arrival_min - Dep_min)
        
        model.predict([Journey_day, Journey_month, Dep_hour, Dep_min, Arrival_hour, Arrival_min, dur_hour, dur_min])

if __name__ == '__main__':
    app.run()