import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useThemeContext } from "../../context/ThemeContext";
import { getStyles } from "./RegisterScreen.styles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

export default function RegisterScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirm = (date: Date) => {
    setBirthdate(date);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={firstname}
        onChangeText={setFirstname}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={lastname}
        onChangeText={setLastname}
      />

      {/* Sélecteur de date */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={{ color: birthdate ? (isDark ? "#fff" : "#000") : "#aaa" }}>
          {birthdate ? birthdate.toLocaleDateString() : "Date de naissance"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={birthdate}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        maximumDate={new Date()}
        // display="inline" // For more recent display 
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Déjà un compte ? <Text style={styles.spanLinkText}>Se connecter</Text></Text>
      </TouchableOpacity>
    </View>
  );
}
