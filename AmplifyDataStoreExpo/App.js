import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

// Example showing how to observe the model and keep state updated before
// performing a save. This uses the useEffect React hook, but you can
// substitute for a similar mechanism in your application lifecycle with
// other frameworks.

function App() {
  const [post, setPost] = useState();

  useEffect(() => {
    /**
     * This keeps `todo` fresh.
     */
    const sub = DataStore.observeQuery(Post, (c) =>
      c.id.eq("e4dd1dc5-e85c-4566-8aaa-54a801396456")
    ).subscribe(({ items }) => {
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
    const post = await DataStore.save(
      new Post({
        title: `New title ${Date.now()}`,
        rating: Math.floor(Math.random() * (8 - 1) + 1),
        status: PostStatus.ACTIVE,
      })
    );
    setPost(post);
  }

  return (
    <>
      <h1>{post?.title}</h1>
      <input type="button" value="NEW TODO" onClick={onCreate} />
      <input
        disabled={!post}
        type="text"
        value={post?.title ?? ""}
        onChange={({ target: { value } }) => {
          /**
           * Each keypress updates the post in local React state.
           */
          setPost(
            Post.copyOf(post, (draft) => {
              draft.title = value;
            })
          );
        }}
      />
      <input
        disabled={!post}
        type="button"
        value="Save"
        onClick={async () => {
          /**
           * This post is already up-to-date because `observeQuery` updated it.
           */
          if (!post) return;
          await DataStore.save(post);
          console.log("Post saved");
        }}
      />
    </>
  );
}
