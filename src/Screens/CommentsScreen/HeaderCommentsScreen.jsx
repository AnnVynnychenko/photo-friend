import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const HeaderCommentsScreen = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        // onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
        <Text style={styles.headerTitle}>Коментарі</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCommentsScreen;

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
