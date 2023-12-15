import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import bgImage from "../assets/img/photoBG.jpg";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const RegistrationScreen = () => {
  const [inputFocusState, setInputFocusState] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarImg, setAvatarImg] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();

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
        setAvatarImg(selectedImage.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleDeleteAvatar = () => {
    if (avatarImg) {
      setAvatarImg(null);
    }
  };

  const handleInputOnFocus = (fieldName) => {
    setInputFocusState((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  const handleInputOnBlur = (fieldName) => {
    setInputFocusState((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  const handleSubmit = () => {
    dispatch(setUser({ login, email, avatarImg }));

    setSecurePassword(true);
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatarImg(null);

    navigation.navigate("Home", {
      screen: "Posts",
    });
  };

  const handleViewPassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-200}
        >
          <ImageBackground
            source={bgImage}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.formContainer}>
              <View style={styles.avatar}>
                {avatarImg ? (
                  <View>
                    <Image
                      source={{ uri: avatarImg }}
                      style={styles.avatarImg}
                    />
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
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={
                    inputFocusState.login
                      ? styles.formInputFocus
                      : styles.formInput
                  }
                  onFocus={() => handleInputOnFocus("login")}
                  onBlur={() => handleInputOnBlur("login")}
                  onChangeText={setLogin}
                  value={login}
                  placeholder="Логін"
                />
                <TextInput
                  style={
                    inputFocusState.email
                      ? styles.formInputFocus
                      : styles.formInput
                  }
                  onFocus={() => handleInputOnFocus("email")}
                  onBlur={() => handleInputOnBlur("email")}
                  onChangeText={setEmail}
                  value={email}
                  autoComplete="email"
                  placeholder="Адреса електронної пошти"
                />
                <TextInput
                  style={
                    inputFocusState.password
                      ? styles.formInputFocus
                      : styles.formInput
                  }
                  onFocus={() => handleInputOnFocus("password")}
                  onBlur={() => handleInputOnBlur("password")}
                  secureTextEntry={securePassword}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Пароль"
                />
                <TouchableOpacity onPress={handleViewPassword}>
                  <Text style={styles.viewPassword}>Показати</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.formBtn} onPress={handleSubmit}>
                <Text style={styles.textBtn}>Зареєструватися</Text>
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}> Вже є акаунт? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.footerText}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <View />
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

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
    width: Dimensions.get("window").width,
  },
  formContainer: {
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
  formInput: {
    height: 50,
    width: 343,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderRadius: 8,
    borderWidth: 1,
  },
  formInputFocus: {
    height: 50,
    width: 343,
    paddingHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 43,
  },
  viewPassword: {
    position: "absolute",
    bottom: 30,
    left: 255,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  formBtn: {
    width: 343,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  textBtn: { fontFamily: "Roboto-Regular", fontSize: 16, color: "#fff" },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
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
});
