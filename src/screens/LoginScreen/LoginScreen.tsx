import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { getStyles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const { isDark, colors } = useThemeContext();
  const styles = getStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [identifier, setIdentifier] = useState(""); // email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginContext(identifier, password); // update the context
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Impossible de se connecter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: isDark ? "#121212" : "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
