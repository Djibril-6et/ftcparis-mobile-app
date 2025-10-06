import { StyleSheet } from "react-native";
import { Colors } from "../../context/ThemeContext";

export const getStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.background,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: color.text,
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: color.border,
      borderRadius: 10,
      paddingHorizontal: 15,
      justifyContent: "center",
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
    },
    
    spanLinkText: {
      color: "#ff0000",
      fontWeight: "bold",
    },
  });
