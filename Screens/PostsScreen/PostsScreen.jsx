import { useRoute } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";

const PostsScreen = () => {
  const {
    params: { email, login },
  } = useRoute();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.userContainer}>
        <View style={styles.avatar}></View>
        <View style={styles.userText}>
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
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
});
