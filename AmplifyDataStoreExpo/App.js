import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text } from "react-native";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { Amplify, DataStore, Predicates } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { Todo } from "./src/models";
import "core-js/full/symbol/async-iterator";

Amplify.configure(awsconfig);

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function App() {
  const [todos, setTodos] = useState();

  // async function onCreate() {
  //   const todo = await DataStore.save(
  //     new Todo({
  //       name: `Todo ${Date.now()}`,
  //     })
  //   );
  //   setTodos([]);
  //   setTodos([todo]);
  // }

  function deleteAll() {
    DataStore.delete(Todo, Predicates.ALL);
  }

  async function createTen() {
    const newTodos = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        DataStore.save(
          new Todo({
            name: `Todo ${Date.now()}`,
          })
        )
      )
    );
    setTodos([]);
    setTodos(newTodos);
  }

  async function saveWithTitle() {
    // Create a post with % in the name:
    await DataStore.save(
      new Todo({
        name: "title-%-100",
      })
    );
  }

  async function fuzzyDelete() {
    // Delete post with % in the name:
    const deletedTodo = await DataStore.delete(Todo, (c) =>
      c.name.contains("%")
    );
    console.log("deletedTodo", deletedTodo);
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos([]);
    setTodos(_todos);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View title="Todos">
        {/* <Text>{JSON.stringify(todos, null, 2)}</Text> */}
        <Text>{todos?.length}</Text>
      </View>
      {/* <Button onPress={onCreate} title="Create" /> */}
      <Button onPress={deleteAll} title="Delete All" />
      <Button onPress={getTodos} title="Query" />
      <Button onPress={fuzzyDelete} title="Fuzzy Delete" />
      <Button onPress={createTen} title="createTen" />
      <Button onPress={saveWithTitle} title="Save With Title" />
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
