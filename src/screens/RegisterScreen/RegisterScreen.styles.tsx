import { StyleSheet } from "react-native";

export const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#121212" : "#fff",
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      color: isDark ? "#fff" : "#000",
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: isDark ? "#555" : "#ccc",
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
      color: "#e63946",
      fontWeight: "bold",
    },
  });
