import { StyleSheet } from "react-native";
import type { Colors } from "../../context/ThemeContext";

export const getStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: color.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: color.text,
      textAlign: "center",
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.background,
    },
    errorText: {
      color: color.error,
      fontSize: 16,
    },
    profileInfo: {
      flex: 1,
      marginBottom: 30,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      color: color.text,
      marginTop: 15,
      marginBottom: 5,
    },
    value: {
      fontSize: 16,
      color: color.textSecondary,
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