import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text, Image } from "react-native";

const PostsScreen = () => {
  const {
    params: { email, login, avatarImg, photoName, location },
  } = useRoute();
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
      <View style={styles.photoContainer}>{/* <Image/> */}</View>
      <Text style={styles.downloadText}>{photoName}</Text>
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
  photoContainer: {
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
});
