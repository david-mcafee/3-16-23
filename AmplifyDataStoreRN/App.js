/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {DataStore, Predicates} from 'aws-amplify';
import {Todo} from './src/models';
import 'core-js/full/symbol/async-iterator';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [todos, setTodos] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function onCreate() {
    const todo = await DataStore.save(
      new Todo({
        name: `Todo ${Date.now()}`,
      }),
    );
    setTodos([todo]);
  }

  async function deleteAll() {
    await DataStore.delete(Todo, Predicates.ALL);
  }

  async function createTen() {
    const newTodos = await Promise.all(
      Array.from({length: 10}).map(() =>
        DataStore.save(
          new Todo({
            name: `Todo ${Date.now()}`,
          }),
        ),
      ),
    );
    setTodos(newTodos);
  }

  async function saveContainsTitle() {
    // Create a post with % in the name:
    await DataStore.save(
      new Todo({
        name: 'title-%-100',
      }),
    );
  }

  async function saveBeginsWithTitle() {
    // Create a post with % in the name:
    await DataStore.save(
      new Todo({
        name: '%title-100',
      }),
    );
  }

  async function containsDelete() {
    const deletedTodo = await DataStore.delete(Todo, c => c.name.contains('%'));
    console.log('deletedTodo', deletedTodo);
  }

  async function notContainsDelete() {
    const deletedTodo = await DataStore.delete(Todo, c =>
      c.name.notContains('%'),
    );
    console.log('deletedTodo', deletedTodo);
  }

  async function beginsWithDelete() {
    const deletedTodo = await DataStore.delete(Todo, c =>
      c.name.beginsWith('%'),
    );
    console.log('deletedTodo', deletedTodo);
  }

  async function betweenDelete() {
    const deletedTodo = await DataStore.delete(Todo, c =>
      c.name.between('+', 'title-%-150'),
    );
    console.log('deletedTodo', deletedTodo);
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos(_todos);
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button onPress={onCreate} title="Create" />
          <Button onPress={deleteAll} title="Delete All" />
          <Button onPress={createTen} title="createTen" />
          <Button onPress={saveContainsTitle} title="Save Contains Title" />
          <Button
            onPress={saveBeginsWithTitle}
            title="Save Begins With Title"
          />
          <Button onPress={getTodos} title="Query" />
          <Button onPress={containsDelete} title="Contains Delete" />
          <Button onPress={notContainsDelete} title="Not Contains Delete" />
          <Button onPress={beginsWithDelete} title="Begins With Delete" />
          <Button onPress={betweenDelete} title="Between Delete" />
          <Text>{todos?.length}</Text>
          <Section title="Todos">
            <Section data-test="datastore-output-1">
              {JSON.stringify(todos, null, 2)}
            </Section>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
