import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { getProfile, getToken } from "../../services/Auth.services";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { useAuth } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { getStyles } from "./ProfileScreen.styles";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { logout: loginContext } = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        if (!token) {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          return;
        }

        const data = await getProfile();
        setUser(data);
      } catch (err) {
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#000"} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Impossible de charger le profil.</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: isDark ? "#121212" : "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Profil</Text>
          
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
            
            <Text style={styles.label}>Nom:</Text>
            <Text style={styles.value}>{user.firstname} {user.lastname}</Text>
            
            <Text style={styles.label}>Nom d'utilisateur:</Text>
            <Text style={styles.value}>{user.username}</Text>
            
            <Text style={styles.label}>Date de naissance:</Text>
            <Text style={styles.value}>{new Date(user.birthdate).toLocaleDateString()}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => loginContext()}
          >
            <Text style={styles.buttonText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}