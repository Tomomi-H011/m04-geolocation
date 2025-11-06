import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "ghostwhite",
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  mapView: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
  },
});