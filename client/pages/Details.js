import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Details = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

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
      const data = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: source,
          destination: destination,
          departureDate: departureDate,
          arrivalDate: arrivalDate,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button title="Departure Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Arrival Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TextInput placeholder="Source" value={source} onChangeText={setSource} />
      <TextInput
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Submit" onPress={postData} />
    </View>
  );
};

export default Details;
