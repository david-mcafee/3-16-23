/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  //   StyleSheet,
  Text,
  //   useColorScheme,
  View,
  Button,
  TextInput,
} from 'react-native';

import //   Colors,
// DebugInstructions,
// Header,
// LearnMoreLinks,
// ReloadInstructions,
'react-native/Libraries/NewAppScreen';
import {DataStore} from 'aws-amplify';
import {Post} from './src/models';
import 'core-js/full/symbol/async-iterator';

// const Section = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

const App = () => {
  const [post, setPost] = useState();

  useEffect(() => {
    /**
     * This keeps `post` fresh.
     */
    const sub = DataStore.observeQuery(Post, c =>
      c.id.eq('5a3b284c-8afc-436a-9027-c8c32bfc8ed2'),
    ).subscribe(({items}) => {
      setPost(items[0]);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  /**
   * Create a new Post
   */
  async function onCreate() {
    const _post = await DataStore.save(
      new Post({
        title: `New title ${Date.now()}`,
        rating: Math.floor(Math.random() * (8 - 1) + 1),
        status: PostStatus.ACTIVE,
      }),
    );

    console.log(_post);
    setPost(_post);
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>{post?.title}</Text>
          <Button onPress={onCreate} title={'New Post'} />
          <TextInput
            disabled={!post}
            value={post?.name ?? ''}
            onChangeText={text => {
              /**
               * Each keypress updates the post in local React state.
               */
              setPost(
                Post.copyOf(post, draft => {
                  draft.title = text;
                }),
              );
            }}
          />
          <Button
            disabled={!post}
            title={'Save'}
            onPress={async () => {
              /**
               * This post is already up-to-date because `observeQuery` updated it.
               */
              if (!post) {
                return;
              }
              const savedPost = await DataStore.save(post);
              console.log('Post saved: ', savedPost);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
