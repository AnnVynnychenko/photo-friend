//react-native
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//icon
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const HeaderSelectedPost = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Редагувати пост</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 90,
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
