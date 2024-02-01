//react-native
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//navigation
import { useNavigation } from "@react-navigation/native";
//icon
import Feather from "react-native-vector-icons/Feather";
import { SimpleLineIcons } from "@expo/vector-icons";
//redux
import { useSelector } from "react-redux";
import {
  getAvatarImg,
  getEmail,
  getLogin,
} from "../../redux/auth/selectors.js";
import { getPosts } from "../../redux/posts/selectors.js";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const posts = useSelector(getPosts);
  const avatarImg = useSelector(getAvatarImg);
  const login = useSelector(getLogin);
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
      <ScrollView>
        {posts &&
          posts.map(({ id, data }) => {
            if (!data) {
              return null;
            }
            const {
              capturedImage,
              commentCount,
              photoName,
              location,
              userLocation,
            } = data;
            return (
              <View style={styles.postContainer} key={id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SelectedPost", {
                      capturedImage,
                      photoName,
                      userLocation,
                      location,
                      id,
                    })
                  }
                >
                  <View style={styles.photoContainer}>
                    <Image
                      source={{ uri: capturedImage }}
                      style={styles.capturedImage}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={styles.photoName}>{photoName}</Text>
                <View style={styles.additionalInfoContainer}>
                  {commentCount === 0 ? (
                    <View style={styles.commentContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: id,
                            post: data,
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
                      <Text style={styles.commentQuantity}>{commentCount}</Text>
                    </View>
                  ) : (
                    <View style={styles.commentContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Comments", {
                            postId: id,
                            post: data,
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
                        {commentCount}
                      </Text>
                    </View>
                  )}
                  <View style={styles.locationContainer}>
                    {location ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Map", {
                            location,
                          })
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
                    <Text style={styles.locationText}>{userLocation}</Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

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
