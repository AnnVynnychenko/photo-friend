//react
import React, { useState } from "react";
//react-native
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
//icon
import { SimpleLineIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
//navigation
import { useNavigation } from "@react-navigation/native";
//redux
import { useDispatch, useSelector } from "react-redux";
//firebase
import { getPosts } from "../../redux/posts/selectors";
import { editPost } from "../../redux/posts/postsSlice";
import { updatePostInFirestore } from "../../firebase/service";

export const SelectedPostScreen = ({ route }) => {
  const { capturedImage, photoName, userLocation, location, id } = route.params;
  const [textChange, setTextChange] = useState(false);
  const [imageName, setImageName] = useState(photoName || "");
  const [locationText, setLocationText] = useState(userLocation || "");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(
      editPost({
        postId: id,
        newPhotoName: imageName,
        newLocation: locationText,
      })
    );
    updatePostInFirestore(id, imageName, locationText);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          </View>
        </View>

        <TextInput
          onChangeText={(text) => {
            setTextChange(true), setImageName(text);
          }}
          style={styles.photoName}
          value={imageName}
          placeholder="Назва..."
          placeholderTextColor="#BDBDBD"
        />
        <View style={styles.locationContainer}>
          {!location ? (
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color="#BDBDBD"
              style={styles.locationPin}
            />
          ) : (
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color="#FF6C00"
              style={styles.locationPin}
            />
          )}
          <TextInput
            style={styles.photoLocation}
            onChangeText={(text) => {
              setTextChange(true);
              setLocationText(text);
            }}
            value={locationText}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
          />
        </View>
        {!textChange ? (
          <TouchableWithoutFeedback>
            <View style={styles.publishBtn}>
              <Text style={styles.textBtn}>Зберегти зміни</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity
            style={[styles.publishBtn, styles.publishBtnActive]}
            onPress={handleEdit}
          >
            <Text style={[styles.textBtn, styles.textBtnActive]}>
              Зберегти зміни
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.deletePhotoCircle}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  iconCircle: {
    position: "absolute",
    top: 90,
    left: 141,
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
  cameraContainer: {
    width: 343,
    marginBottom: 8,
  },
  camera: {
    width: 343,
    height: 240,
    marginBottom: 8,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  capturedImage: {
    flex: 1,
    borderRadius: 8,
  },
  iconCircleTransp: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  publishBtnActive: {
    backgroundColor: "#FF6C00",
  },
  textBtnActive: {
    color: "#fff",
  },
});
