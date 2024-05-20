import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// airline = data['Airline']
// source = data['Source']
// destination = data['Destination']
// totalstops = data['Total_Stops']
// date = data['Date_of_Journey']

const Details = () => {
  const [airline, setAirline] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [totalStops, setTotalStops] = useState("");
  const [date, setDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const postData = async () => {
    try {
      const data = await fetch("http://10.0.2.2:5000/predict_price", {
        //http://10.0.2.2:5000/predict
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: source,
          destination: destination,
          departureDate: departureDate,
          arrivalDate: arrivalDate,
        }),
      });
      console.log(data.json());
    } catch (error) {
      console.log(error);
    }
  };
  // styles.input
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  });
  return (
    <View>
      <Text>Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Airline"
        onChangeText={(text) => setAirline(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Source"
        onChangeText={(text) => setSource(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        onChangeText={(text) => setDestination(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Stops"
        onChangeText={(text) => setTotalStops(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        onChangeText={(text) => setDate(text)}
      />
      <Button title="Predict" onPress={postData} />
    </View>
  );
};

export default Details;
