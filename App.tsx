import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { StarPRNT, Printer, CommandsArray } from "react-native-star-prnt";

export default function App() {
  const [printers, setPrinters] = React.useState<Printer[]>([]);
  const [loading, setLoading] = React.useState(false);

  const onRenderItem = ({ item }: { item: Printer }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>{item.portName}</Text>
        <Text style={styles.listItem}>{item.modelName}</Text>
      </View>
    );
  };

  const onSearchPress = async () => {
    setLoading(true);
    try {
      let printers = await StarPRNT.portDiscovery("All");
      setPrinters(printers);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert("Port Discorvery Error");
    }
  };

  const onPrintPress = async () => {
    const commands: CommandsArray = [];
    commands.push({
      appendBitmapText: "HELLO WORLD",
      fontSize: 32,
      alignment: "Center",
    });
    commands.push({
      appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed,
    });

    try {
      var printResult = await StarPRNT.print(
        "StarGraphic",
        commands,
        printers[0].portName
      );
      Alert.alert("PRINT STATUS", printResult);
    } catch (e) {
      console.error(e);
      Alert.alert("PRINT ERROR", e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSearchPress}>
          <Text>Scan for Printer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPrintPress}
          disabled={printers.length === 0}
        >
          <Text>Print</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={styles.emptyText}>LOADING ...</Text>
      ) : (
        <FlatList
          data={printers}
          keyExtractor={(item) => item.portName as string}
          renderItem={onRenderItem}
          style={{ width: "100%" }}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>EMPTY PRINTER LIST</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
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
  listContainer: {
    width: "100%",
    padding: 10,
  },
  listItem: {
    fontSize: 14,
  },
  emptyContainer: {
    width: "100%",
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    marginTop: "35%",
    alignSelf: "center",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "silver",
  },
});
