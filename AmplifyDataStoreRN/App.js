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
  Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {DataStore} from 'aws-amplify';
import {Todo} from './src/models';

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

  async function onDelete() {
    const toDelete = await DataStore.query(Todo, '1234567');
    DataStore.delete(toDelete);
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

  async function saveWithTitle() {
    // Create a post with % in the name:
    await DataStore.save(
      new Todo({
        name: 'title-%-100',
      }),
    );
  }

  async function fuzzyDelete() {
    // Delete post with % in the name:
    const deletedTodo = await DataStore.delete(Todo, c => c.name.contains('%'));
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
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button onPress={onCreate} title="Create" />
          <Button onPress={onDelete} title="Delete" />
          <Button onPress={createTen} title="createTen" />
          <Button onPress={saveWithTitle} title="Save With Title" />
          <Button onPress={getTodos} title="Query" />
          <Button onPress={fuzzyDelete} title="Fuzzy Delete" />
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
