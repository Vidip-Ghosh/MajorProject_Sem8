from flask import Flask, request, render_template
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb

app = Flask(__name__)
CORS(app)
model = pickle.load(open("flightPrice.pkl", "rb"),encoding='utf-8')

@app.route("/predict",methods=['POST'])
def predict(): 
    data = request.get_json()
    features = [str(item) for item in [data['Airline'], data['Date_of_Journey'], data['Source'], data['Destination'], data['Total_Stops']]]
    print("Features: ",features)
    le = LabelEncoder()
    # ValueError: setting an array element with a sequence. The requested array has an inhomogeneous shape after 1 dimensions. The detected shape was (5,) + inhomogeneous part.
    features = le.fit_transform(features)
    print("Features after label encoding: ",features)
    features = np.array(features).reshape(1,-1)
    print("Features after reshaping: ",features)
    prediction = model.predict(features)
    print("Prediction: ",prediction)
    return str(prediction[0])

@app.route('/')
def prediction(): 
    return render_template('index.html')

@app.route("/form",methods=['POST'])
def predict_price():
    if request.method == 'POST':
        airline = request.form['airline']
        source = request.form['source']
        destination = request.form['destination']
        totalstops = request.form['totalstops']
        date = request.form['date']
    
    features = [source, destination, totalstops, date, airline]
    print("Features: ",features)
    # Label Encoding
    le = LabelEncoder()
    features_encoded = le.fit_transform(features)
    features_encoded = np.array(features_encoded).reshape(1,-1)
    print("Features after label encoding: ",features_encoded)
    # Making prediction
    prediction = model.predict(features_encoded)
    print("Prediction: ",prediction)
    return render_template('index.html', prediction_text=f"Predicted Flight Price: {prediction[0]:.2f}")
if __name__ == '__main__':
    app.run(debug=True)