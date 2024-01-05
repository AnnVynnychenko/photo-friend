//react
import React, { useState } from "react";
//react-native
import { Dimensions } from "react-native";
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
//navigation
import { useNavigation } from "@react-navigation/native";
//img
import bgImage from "../../assets/img/photoBG.jpg";
//firebase
import { getDataFromFirestore, loginDB } from "../../firebase/service";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setAvatar, setUserData } from "../../redux/auth/authSlice";
import { addPost } from "../../redux/posts/postsSlice";

export const LoginScreen = () => {
  const [inputFocusState, setInputFocusState] = useState({
    email: false,
    password: false,
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

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

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      await loginDB({ email: trimmedEmail, password: trimmedPassword });
      const user = auth.currentUser;
      if (user !== null) {
        dispatch(
          setUserData({
            login: user.displayName,
            email: user.email,
          })
        );
        dispatch(setAvatar({ avatarImg: user.photoURL }));
        const posts = await getDataFromFirestore();
        if (posts) {
          dispatch(addPost({ posts }));
        }
        navigation.navigate("Home", { screen: "Posts", params: { email } });
      } else {
        navigation.navigate("Login");
      }
      setSecurePassword(true);
      reset();
    } catch (error) {
      console.error("Error during authorization:", error);
    }
  };

  const handleViewPassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-230}
        >
          <ImageBackground
            source={bgImage}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.inputContainer}>
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
                <Text style={styles.textBtn}>Увійти</Text>
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Немає акаунту? </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Registration");
                    reset();
                  }}
                >
                  <Text style={styles.footerRegisterText}>Зареєструватися</Text>
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

const width = Dimensions.get("window").width;

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
    width: width,
  },
  formContainer: {
    width: width,
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 111,
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
  textBtn: { fontSize: 16, color: "#fff" },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
  },
  footerRegisterText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
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
    zIndex: 2,
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
    zIndex: 3,
    backgroundColor: "#FF6C00",
  },
  addAvatarBtnHorizontalLine: {
    position: "absolute",
    top: 11,
    left: 5,
    height: 1,
    width: 13,
    zIndex: 3,
    backgroundColor: "#FF6C00",
  },
});
