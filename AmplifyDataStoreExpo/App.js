import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
