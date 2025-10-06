import { StyleSheet } from "react-native";
import { Colors } from "../../context/ThemeContext";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: colors.text,
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 15,
      color: colors.text,
      marginBottom: 15,
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
    linkText: {
      marginTop: 10,
      color: colors.text,
    },
    
    spanLinkText: {
      color: "#ff0000",
      fontWeight: "bold",
    },
  });
