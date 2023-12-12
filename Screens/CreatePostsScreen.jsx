import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState("");

  const navigation = useNavigation();

  const handlePublish = () => {
    navigation.navigate("Home", {
      screen: "Posts",
      params: { photoName, location },
    });
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.photoContainer}>
        <TouchableOpacity>
          <View style={styles.iconCircle}>
            <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
          </View>
        </TouchableOpacity>
        {/* <Image/> */}
      </View>
      <Text style={styles.downloadText}>Завантажте фото</Text>
      <TextInput
        style={styles.photoName}
        onChangeText={setPhotoName}
        placeholder="Назва..."
        placeholderTextColor="#BDBDBD"
      />
      <View style={styles.locationContainer}>
        <SimpleLineIcons
          name="location-pin"
          size={24}
          color="#BDBDBD"
          style={styles.locationPin}
        />
        <TextInput
          style={styles.photoLocation}
          onChangeText={setLocation}
          placeholder="Місцевість..."
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
        <Text style={styles.textBtn}>Опубліковати</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deletePhotoCircle}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
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
  iconCircle: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  downloadText: {
    marginBottom: 32,
    fontSize: 16,
    color: "#BDBDBD",
  },
  photoName: {
    width: 343,
    height: 50,
    marginBottom: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationContainer: { marginBottom: 32 },
  photoLocation: {
    width: 343,
    height: 50,
    paddingLeft: 26,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationPin: { position: "absolute", top: 12 },
  publishBtn: {
    width: 343,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginBottom: 120,
  },
  textBtn: { fontSize: 16, color: "#BDBDBD" },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  deletePhotoCircle: {
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
  },
});
