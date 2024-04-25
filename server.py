from flask import Flask,request
from flask_cors import CORS
import pandas as pd 
import pickle
import json
import numpy as np

app = Flask(__name__)
CORS(app)
model = pickle.load(open("flightPrice.pkl", "rb"))
print(model)
# def encodeCategoricalFeatures(data): 
#     if data['airline'] == 'Vistara': 
#         data['airline'] = 1
#         data['airline'] = 0
#         data['airline'] = 0
#     elif data['airline'] == 'Air India': 
#         data['airline'] = 0
#         data['airline'] = 0
#         data['airline'] = 1
#     elif data['airline'] == 'Indigo': 
#         data['airline'] = 0
#         data['airline'] = 1
#         data['airline'] = 0
        
#     print(data)
#     # del data['airline']s
#     return data

@app.route("/",methods=['POST'])
def predict(): 
    data = request.get_json(force=True)
    print("Data: ",data)
    data = encodeCategoricalFeatures(data)
    print("Encoded Data: ",data)
    features = [data['airline'],data['source_city'],data['destination_city'],data['stops'],data['class']]
    features_array = np.array(features)
    prediction = model.predict(features_array)
    print("Predicted Fare: ",prediction)
    return prediction
    

if __name__ == '__main__':
    app.run()