// import PostsScreen from "./PostsScreen/PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen/PostsScreen";
import postsIcon from "../assets/img/postsIcon.png";
import profileIcon from "../assets/img/profileIcon.png";
import CreatePostIcon from "./CreatePostsScreen/CreatePostIcon";
import { Image, View, StyleSheet } from "react-native";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName={"Posts"}
      tabBarOptions={{
        showLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.3)",
          height: 71,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconComponent;

          if (route.name === "CreatePosts") {
            iconComponent = <CreatePostIcon />;
          } else {
            let iconName;

            if (route.name === "Posts") {
              iconName = postsIcon;
            } else if (route.name === "Profile") {
              iconName = profileIcon;
            }

            iconComponent = (
              <Image source={iconName} style={{ width: 24, height: 24 }} />
            );
          }

          return <View>{iconComponent}</View>;
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default Home;
