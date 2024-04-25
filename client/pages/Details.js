import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Details = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(Date());
  const [arrivalDate, setArrivalDate] = useState(Date());

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
      const data = await fetch("http://10.0.2.2:8000/predict", {
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
  return (
    <View>
      <Button title="Departure Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onChange={setDepartureDate}
      />
      <Button title="Arrival Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onChange={setArrivalDate}
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
