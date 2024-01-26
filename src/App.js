//react-native
import "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
//expo
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
//screens
import { RegistrationScreen } from "./Screens/authScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/authScreens/LoginScreen";
import { HomeScreen } from "./Screens/mainScreens/HomeScreen";
import { MapScreen } from "./Screens/nestedScreens/MapScreen";
import { CommentsScreen } from "./Screens/nestedScreens/CommentsScreen";
import { HeaderComments } from "./components/HeaderComments";
import { SelectedPostScreen } from "./Screens/nestedScreens/SelectedPostScreen";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//redux
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HeaderSelectedPost } from "./components/HeaderSelectedPost";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#FF6C00" />}
        persistor={store.persistor}
      >
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Map"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                headerTitle: (props) => <HeaderComments {...props} />,
                headerStyle: {
                  backgroundColor: "#fff",
                  borderBottomColor: "rgba(0, 0, 0, 0.3)",
                  borderBottomWidth: 1,
                },
                headerLeft: null,
              }}
            />
            <MainStack.Screen
              name="SelectedPost"
              component={SelectedPostScreen}
              options={{
                headerTitle: (props) => <HeaderSelectedPost {...props} />,
                headerStyle: {
                  backgroundColor: "#fff",
                  borderBottomColor: "rgba(0, 0, 0, 0.3)",
                  borderBottomWidth: 1,
                },
                headerLeft: null,
              }}
            />
          </MainStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
