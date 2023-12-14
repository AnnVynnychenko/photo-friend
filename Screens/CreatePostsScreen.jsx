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
import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const CreatePostsScreen = () => {
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState({});
  const [userLocation, setUserLocation] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [takePhoto, setTakePhoto] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePublish = () => {
    const newPost = { photoName, location, capturedImage, userLocation };
    setPosts(posts.concat(newPost));
    navigation.navigate("Home", {
      screen: "Posts",
      params: { posts: posts.concat(newPost) },
    });
    setPhotoName("");
    setLocation({});
    setUserLocation("");
    setCapturedImage(null);
    setTakePhoto(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentContainer}>
        {!takePhoto ? (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={setCameraRef}
            >
              <View style={styles.photoView}>
                <TouchableOpacity
                  style={styles.iconCircle}
                  onPress={async () => {
                    if (cameraRef) {
                      const { uri } = await cameraRef.takePictureAsync();
                      await MediaLibrary.createAssetAsync(uri);
                      setCapturedImage(uri);
                      setTakePhoto(true);
                    }
                  }}
                >
                  <FontAwesome5 name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            </Camera>
            <Text style={styles.downloadText}>Завантажте фото</Text>
          </View>
        ) : (
          <View>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
              />
              <TouchableOpacity
                style={[styles.iconCircle, styles.iconCircleTransp]}
                onPress={async () => {
                  setCapturedImage(null);
                  setTakePhoto(false);
                }}
              >
                <FontAwesome5 name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.downloadText}>Редагувати фото</Text>
          </View>
        )}

        <TextInput
          style={styles.photoName}
          onChangeText={setPhotoName}
          value={photoName}
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
            onChangeText={setUserLocation}
            value={userLocation}
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
          />
        </View>
        {!takePhoto ? (
          <TouchableWithoutFeedback>
            <View style={styles.publishBtn}>
              <Text style={styles.textBtn}>Опубліковати</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableOpacity
            style={[styles.publishBtn, styles.publishBtnActive]}
            onPress={handlePublish}
          >
            <Text style={[styles.textBtn, styles.textBtnActive]}>
              Опубліковати
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
  cameraContainer: {
    width: 343,
    marginBottom: 8,
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
