import logOut from "../../assets/img/logOut.png";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const HeaderPostsScreen = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Публікації</Text>
      <TouchableOpacity>
        <Image style={styles.logOut} source={logOut} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderPostsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 109,
    paddingLeft: 148,
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    color: "#212121",
  },
  logOut: {
    width: 24,
    height: 24,
    tintColor: "#BDBDBD",
  },
});
