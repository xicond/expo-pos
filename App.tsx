import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import { StarPRNT } from "react-native-star-prnt";

export default function App() {
  const [printers, setPrinters] = React.useState();

  React.useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Scan for Printer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 80,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
