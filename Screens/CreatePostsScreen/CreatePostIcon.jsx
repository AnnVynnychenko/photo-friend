import { View, StyleSheet } from "react-native";

const CreatePostIcon = () => {
  return (
    <View style={styles.icon}>
      <View style={styles.verticalLine} />
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default CreatePostIcon;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
  verticalLine: {
    width: 1,
    height: 13,
    backgroundColor: "#fff",
  },
  horizontalLine: {
    position: "absolute",
    width: 13,
    height: 1,
    backgroundColor: "#fff",
  },
});
