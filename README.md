# 3-16-23

## Expo:

`npx expo start`

To run your project, navigate to the directory and run one of the following yarn commands.

- cd AmplifyDataStoreExpo
- yarn android
- yarn ios
- yarn web

`rm -rf node_modules && yarn && yarn link @aws-amplify/datastore-storage-adapter && yarn web`

## RN CLI:

`npx pod-install && npx react-native run-ios --simulator="iPhone 14"`

`rm -rf node_modules && yarn && yarn link @aws-amplify/datastore @aws-amplify/datastore-storage-adapter aws-amplify && npx react-native run-ios --simulator="iPhone 14"`

### Copy directly:

JS - `yarn && yarn setup-dev`, then watch.

In the sample:
`yarn && npx pod-install && cp -r /Users/mcafd/workplace/origin/amplify-js/packages/datastore-storage-adapter/ /Users/mcafd/workplace/3-16-23/AmplifyDataStoreRN/node_modules/@aws-amplify/datastore-storage-adapter/ && npx react-native run-ios --simulator="iPhone 14"`

or 

`cp -r /Users/mcafd/workplace/origin/amplify-js/packages/datastore-storage-adapter/ /Users/mcafd/workplace/3-16-23/AmplifyDataStoreRN/node_modules/@aws-amplify/datastore-storage-adapter/`

`yarn build:esm:watch`