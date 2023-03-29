/**
 * @format
 */

// import 'core-js/full/symbol/async-iterator';
// import 'react-native-get-random-values';
// import 'react-native-url-polyfill';
import {AppRegistry} from 'react-native';
// import App from './App';
import App2 from './App2';
import {name as appName} from './app.json';

import {Amplify, DataStore} from 'aws-amplify';
import {SQLiteAdapter} from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

DataStore.configure({
  storageAdapter: SQLiteAdapter,
});

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App2);
