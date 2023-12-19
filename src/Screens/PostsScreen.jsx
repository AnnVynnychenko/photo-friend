import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SimpleLineIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { getAvatarImg, getEmail, getLogin } from "../redux/auth/selectors";
import { getPosts } from "../redux/posts/selectors.js";

const PostsScreen = () => {
  const navigation = useNavigation();

  const posts = useSelector(getPosts);

  const login = useSelector(getLogin);
  const avatarImg = useSelector(getAvatarImg);
  const email = useSelector(getEmail);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Image source={{ uri: avatarImg }} style={styles.avatarImg} />
        </View>
        <View style={styles.userText}>
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {posts && (
        <FlatList
          data={posts}
          keyExtractor={() => uuid.v4()}
          renderItem={({ item: post }) => (
            <View style={styles.postContainer}>
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: post.capturedImage }}
                  style={styles.capturedImage}
                />
              </View>
              <Text style={styles.photoName}>{post.photoName}</Text>
              <View style={styles.additionalInfoContainer}>
                {post.commentCount === 0 ? (
                  <View style={styles.commentContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: post.id,
                          post: post,
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                        style={styles.commentIcon}
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentQuantity}>
                      {post.commentCount}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.commentContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: post.id,
                          post: post,
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#FF6C00"
                        style={styles.commentIcon}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.commentQuantity,
                        styles.commentQuantityActive,
                      ]}
                    >
                      {post.commentCount}
                    </Text>
                  </View>
                )}
                <View style={styles.locationContainer}>
                  {post.location ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Map", { location: post.location })
                      }
                    >
                      <SimpleLineIcons
                        name="location-pin"
                        size={24}
                        color="#FF6C00"
                      />
                    </TouchableOpacity>
                  ) : (
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                  )}
                  <Text style={styles.locationText}>{post.userLocation}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  userText: {
    justifyContent: "center",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  login: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  postContainer: {
    marginBottom: 32,
  },
  photoContainer: {
    width: 343,
    height: 240,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  photoName: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  additionalInfoContainer: {
    flexDirection: "row",
    gap: 49,
  },
  commentIcon: {
    transform: [{ rotate: "270deg" }],
  },
  commentQuantity: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  commentQuantityActive: {
    color: "#212121",
  },
  commentContainer: {
    flexDirection: "row",
    gap: 3,
  },
  locationContainer: {
    width: 255,
    flexDirection: "row",
    gap: 3,
  },
  locationText: {
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
  capturedImage: {
    flex: 1,
    borderRadius: 8,
  },
});
