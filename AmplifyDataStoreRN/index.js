/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {DataStore} from 'aws-amplify';
import {SQLiteAdapter} from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';

DataStore.configure({
  storageAdapter: SQLiteAdapter,
});

AppRegistry.registerComponent(appName, () => App);
