import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useThemeContext } from "../../context/ThemeContext";
import { getStyles } from "./LoginScreen.styles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { login } from "../../services/Auth.services";

export default function LoginScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [identifier, setIdentifier] = useState(""); // email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await login(identifier, password);
      Alert.alert("Succès", `Bienvenue ${user.email}`);
      navigation.navigate("Profile");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Impossible de se connecter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
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

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Connexion..." : "Se connecter"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>
          Pas encore de compte ? <Text style={styles.spanLinkText}>Inscription</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
