import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import Feather from "react-native-vector-icons/Feather";
import { Text, TouchableOpacity } from "react-native";

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
const HomeScreen = ({ navigation }) => {
  return (
    <HomeTab.Navigator screenOptions={tabBarOption}>
      <HomeTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity>
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

export default HomeScreen;
