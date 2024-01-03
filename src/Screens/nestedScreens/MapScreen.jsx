//react-native
import { useRoute } from "@react-navigation/native";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  const { params } = useRoute();
  const { location } = params;

  console.log("params", params);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            title="Локація створення данного фото"
            coordinate={location}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
