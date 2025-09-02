import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useThemeContext } from "../../context/ThemeContext";
import { getStyles } from "./LoginScreen.styles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export default function LoginScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [identifier, setIdentifier] = useState(""); // email ou username
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email ou nom d'utilisateur"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Pas encore de compte ? <Text style={styles.spanLinkText}>Inscription</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
