//react
import React from "react";
//react-native
import { Dimensions, ScrollView } from "react-native";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
//img and icon
import bgImage from "../../assets/img/photoBG.jpg";
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import { SimpleLineIcons } from "@expo/vector-icons";
//redux
import { incrementLike } from "../../redux/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAvatarImg, getLogin } from "../../redux/auth/selectors";
import { clearAvatarImg, setAvatar } from "../../redux/auth/authSlice";
import { getPosts } from "../../redux/posts/selectors";
//navigation
import { useNavigation } from "@react-navigation/native";
import {
  updateLikesInFirestore,
  uploadAvatarToServer,
} from "../../firebase/service";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const avatarImg = useSelector(getAvatarImg);
  const posts = useSelector(getPosts);
  console.log("posts", posts);
  const login = useSelector(getLogin);

  const user = auth.currentUser;

  const handleAddAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        const photoLink = await uploadAvatarToServer({
          uri: selectedImage.uri,
          mimeType: selectedImage.uri.split(".").pop(),
        });

        await updateProfile(user, {
          photoURL: photoLink,
        });
        dispatch(setAvatar({ avatarImg: photoLink }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleDeleteAvatar = async () => {
    if (avatarImg) {
      await updateProfile(user, {
        photoURL: "",
      });
      dispatch(clearAvatarImg());
    }
  };

  const handleIncrementLike = (postId, currentLikes) => {
    dispatch(incrementLike({ postId }));
    updateLikesInFirestore(postId, currentLikes);
  };

  return (
    <View style={styles.contentContainer}>
      <ImageBackground
        source={bgImage}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.avatar}>
              {avatarImg ? (
                <View>
                  <Image source={{ uri: avatarImg }} style={styles.avatarImg} />
                  <TouchableOpacity onPress={handleDeleteAvatar}>
                    <View style={styles.deleteAvatarBtnCircle}>
                      <View style={styles.deleteAvatarBtnVerticalLine} />
                      <View style={styles.deleteAvatarBtnHorizontalLine} />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={handleAddAvatar}>
                  <View style={styles.addAvatarBtnCircle}>
                    <View style={styles.addAvatarBtnVerticalLine} />
                    <View style={styles.addAvatarBtnHorizontalLine} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.title}>{login}</Text>
            <ScrollView>
              {posts &&
                posts.map(({ id, data }) => {
                  if (!data) {
                    return null;
                  }
                  const {
                    capturedImage,
                    photoName,
                    commentCount,
                    likes,
                    location,
                    userLocation,
                  } = data;
                  return (
                    <View style={styles.postContainer} key={id}>
                      <View style={styles.photoContainer}>
                        <Image
                          source={{ uri: capturedImage }}
                          style={styles.capturedImage}
                        />
                      </View>
                      <Text style={styles.photoName}>{photoName}</Text>
                      <View style={styles.additionalInfoContainer}>
                        <View style={styles.commentAndLikeContainer}>
                          {commentCount === 0 ? (
                            <View style={styles.commonContainer}>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("Comments", {
                                    postId: id,
                                    post: data,
                                  });
                                }}
                              >
                                <Feather
                                  name="message-circle"
                                  size={24}
                                  color="#BDBDBD"
                                  style={styles.commentIcon}
                                />
                              </TouchableOpacity>
                              <Text style={styles.quantity}>
                                {commentCount}
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.commonContainer}>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("Comments", {
                                    postId: id,
                                    post: data,
                                  });
                                }}
                              >
                                <Feather
                                  name="message-circle"
                                  size={24}
                                  color="#FF6C00"
                                  style={styles.commentIcon}
                                />
                              </TouchableOpacity>
                              <Text
                                style={[styles.quantity, styles.quantityActive]}
                              >
                                {commentCount}
                              </Text>
                            </View>
                          )}
                          {likes === 0 ? (
                            <View style={styles.commonContainer}>
                              <TouchableOpacity
                                onPress={() => handleIncrementLike(id, likes)}
                              >
                                <Feather
                                  name="thumbs-up"
                                  size={24}
                                  color="#BDBDBD"
                                />
                              </TouchableOpacity>
                              <Text style={styles.quantity}>{likes}</Text>
                            </View>
                          ) : (
                            <View style={styles.commonContainer}>
                              <TouchableOpacity
                                onPress={() => handleIncrementLike(id, likes)}
                              >
                                <Feather
                                  name="thumbs-up"
                                  size={24}
                                  color="#FF6C00"
                                />
                              </TouchableOpacity>
                              <Text
                                style={[styles.quantity, styles.quantityActive]}
                              >
                                {likes}
                              </Text>
                            </View>
                          )}
                        </View>
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
                          <Text style={styles.locationText}>
                            {userLocation}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: width,
  },
  container: {
    flex: 1,
    paddingTop: 203,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: width,
    alignItems: "center",

    paddingTop: 92,
    paddingBottom: 45,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginBottom: 33,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  avatar: {
    position: "absolute",
    top: -55,
    left: 130,
    zIndex: 1,
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  addAvatarBtnCircle: {
    position: "absolute",
    left: 108,
    top: 75,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  addAvatarBtnVerticalLine: {
    position: "absolute",
    top: 5,
    left: 11,
    width: 1,
    height: 13,
    backgroundColor: "#FF6C00",
  },
  addAvatarBtnHorizontalLine: {
    position: "absolute",
    top: 11,
    left: 5,
    height: 1,
    width: 13,
    backgroundColor: "#FF6C00",
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  deleteAvatarBtnCircle: {
    position: "absolute",
    left: 108,
    bottom: 25,
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderColor: "#BDBDBD",
    borderWidth: 1,
  },
  deleteAvatarBtnVerticalLine: {
    position: "absolute",
    top: 5,
    left: 11,
    width: 1,
    height: 13,
    transform: [{ rotate: "135deg" }],
    backgroundColor: "#BDBDBD",
  },
  deleteAvatarBtnHorizontalLine: {
    position: "absolute",
    top: 11,
    left: 5,
    height: 1,
    width: 13,
    transform: [{ rotate: "135deg" }],
    backgroundColor: "#BDBDBD",
  },
  postContainer: { width: 343, marginBottom: 32 },
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
  },
  commentIcon: { transform: [{ rotate: "270deg" }] },
  quantity: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  quantityActive: { color: "#212121" },
  commentAndLikeContainer: {
    flexDirection: "row",
    gap: 24,
  },
  commonContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "baseline",
  },
  locationContainer: {
    flexDirection: "row",
    marginLeft: "auto",
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
