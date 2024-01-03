//react
import React from "react";
//react-native
import { Text, TouchableOpacity } from "react-native";
//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
//screens
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
//icon
import Feather from "react-native-vector-icons/Feather";
//firebase
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/auth/authSlice";
import { signOutUser } from "../../redux/posts/postsSlice";

const HomeTab = createBottomTabNavigator();

const tabBarOption = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarButton: (props) => <TouchableOpacity {...props} />,
  tabBarIcon: ({ color }) => {
    if (route.name === "Posts") {
      return <Feather name="grid" size={24} color={color} />;
    }
    if (route.name === "CreatePosts") {
      return <Feather name="plus" size={24} color={color} />;
    }
    if (route.name === "Profile") {
      return <Feather name="user" size={24} color={color} />;
    }
  },
  tabBarActiveTintColor: "#FFFFFF",
  tabBarItemStyle: {
    borderRadius: 20,
    maxWidth: 70,
    height: 40,
    marginRight: 31,
  },
  tabBarActiveBackgroundColor: "#FF6C00",
  tabBarStyle: {
    display: route.name === "CreatePosts" ? "none" : "flex",
    height: 71,
    paddingTop: 9,
    paddingLeft: 58,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
  },
  headerTitleStyle: {
    display: "none",
  },
  headerStyle: {
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
  },
});
export const HomeScreen = ({ navigation }) => {
  const navigationToPage = useNavigation();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(authSignOut());
      dispatch(signOutUser());
      navigationToPage.navigate("Login");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <HomeTab.Navigator screenOptions={tabBarOption}>
      <HomeTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={handleLogOut}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Text
              style={{
                marginLeft: 148,
                fontFamily: "Roboto-Medium",
                fontSize: 17,
                color: "#212121",
              }}
            >
              Публікації
            </Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
                navigation={navigation}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Text
              style={{
                marginRight: 102,
                fontFamily: "Roboto-Medium",
                fontSize: 17,
                color: "#212121",
              }}
            >
              Створити публікацію
            </Text>
          ),
        }}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeTab.Navigator>
  );
};
