import React, { useState } from "react";
import { Formik } from "formik";
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

const LoginScreen = (props) => {
  const [inputFocusState, setInputFocusState] = useState({
    email: false,
    password: false,
  });

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

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const handleLoginLink = () => {
    console.log("Open Login");
  };

  const handleViewPassword = () => {
    console.log("View Password");
  };

  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ values, handleChange, handleSubmit }) => (
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
                    onChangeText={handleChange("email")}
                    value={values.email}
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
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    placeholder="Пароль"
                  />
                  <TouchableOpacity onPress={handleViewPassword}>
                    <Text style={styles.viewPassword}>Показати</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.formBtn} onPress={handleSubmit}>
                  <Text style={styles.textBtn}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginLink}>
                  <Text style={styles.footerText}>
                    Немає акаунту? Зареєструватися
                  </Text>
                </TouchableOpacity>
                <View />
              </View>
            </ImageBackground>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
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
  footerText: {
    textAlign: "center",
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
