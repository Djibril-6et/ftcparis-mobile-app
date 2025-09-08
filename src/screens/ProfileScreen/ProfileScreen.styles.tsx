import { StyleSheet } from "react-native";

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: isDark ? "#fff" : "#000",
      textAlign: "center",
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    errorText: {
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
    },
    profileInfo: {
      flex: 1,
      marginBottom: 30,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginTop: 15,
      marginBottom: 5,
    },
    value: {
      fontSize: 16,
      color: isDark ? "#ccc" : "#555",
      marginBottom: 10,
      paddingLeft: 10,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "#ff0000",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });