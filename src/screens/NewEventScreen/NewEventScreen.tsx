import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from "../../context/ThemeContext";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { createEvent } from "../../services/Event.services";
import { getStyles } from "./NewEventScreen.styles";

export default function NewEventScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedImage, setSelectedImage] = useState<{
    uri: string;
    type: string;
    name: string;
    size?: number;
  } | null>(null);
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);
  const [place, setPlace] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateTimeConfirm = (date: Date) => {
    setDatetime(date);
    setDateTimePickerVisibility(false);
  };

  const handleImagePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true
      });
      
      if (!result.canceled && result.assets && result.assets[0]) {
        const pickedFile = result.assets[0];
        setSelectedImage({
          uri: pickedFile.uri,
          type: pickedFile.mimeType || 'image/jpeg',
          name: pickedFile.name || 'image.jpg',
          size: pickedFile.size || undefined
        });
      }
    } catch (err: any) {
      console.log('Erreur sélection image:', err);
      Alert.alert("Erreur", "Impossible de sélectionner l'image");
    }
  };

  const handleCreateEvent = async () => {
    if (!title.trim() || !keywords.trim() || !place.trim() || !instagram.trim()) {
      Alert.alert("Attention", "Veuiillez remplir tous les champs");
      return;
    }

    if (!datetime) {
      Alert.alert("Attention", "La date et l'heure sont obligatoires");
      return;
    }

    if (!selectedImage) {
      Alert.alert("Erreur", "Veuillez sélectionner une image pour l'événement");
      return;
    }

    try {
      setLoading(true);
      
      await createEvent(
        title,
        keywords,
        datetime.toISOString(),
        place,
        instagram,
        selectedImage || undefined
      );

      // Clean up temporary file after upload
      if (selectedImage && selectedImage.uri.startsWith('file://')) {
        try {
          await FileSystem.deleteAsync(selectedImage.uri, { idempotent: true });
        } catch (cleanupErr) {
          console.log('Erreur nettoyage fichier:', cleanupErr);
        }
      }

      Alert.alert("Succès", "Événement créé avec succès !", [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]);

    } catch (err: any) {
      console.error('Erreur création événement:', err);
      Alert.alert("Erreur", err.message || "Impossible de créer l'événement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: isDark ? "#121212" : "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Nouvel Événement</Text>

          {/* Image button */}
          <TouchableOpacity 
            style={[styles.button, { marginBottom: 10, backgroundColor: '#007bff' }]}
            onPress={handleImagePicker}
          >
            <Text style={styles.buttonText}>
              {selectedImage ? "Changer l'image" : "Sélectionner une image"}
            </Text>
          </TouchableOpacity>

          {/* Image preview */}
          {selectedImage && (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Image 
                source={{ uri: selectedImage.uri }} 
                style={{ 
                  width: 200, 
                  height: 150, 
                  borderRadius: 8,
                  backgroundColor: '#f0f0f0'
                }} 
                resizeMode="cover"
              />
              <Text style={{ 
                marginTop: 5, 
                fontSize: 12, 
                color: isDark ? '#aaa' : '#666' 
              }}>
                {selectedImage.name}
              </Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Titre de l'événement"
            placeholderTextColor={isDark ? "#aaa" : "#555"}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Mots-clés (séparés par des virgules)"
            placeholderTextColor={isDark ? "#aaa" : "#555"}
            value={keywords}
            onChangeText={setKeywords}
            multiline
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setDateTimePickerVisibility(true)}
          >
            <Text style={{ color: datetime ? (isDark ? "#fff" : "#000") : "#aaa" }}>
              {datetime ? datetime.toLocaleString() : "Date et heure"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode="datetime"
            date={datetime}
            onConfirm={(date) => handleDateTimeConfirm(date)}
            onCancel={() => setDateTimePickerVisibility(false)}
            minimumDate={new Date()}
          />

          <TextInput
            style={styles.input}
            placeholder="Lieu"
            placeholderTextColor={isDark ? "#aaa" : "#555"}
            value={place}
            onChangeText={setPlace}
          />

          <TextInput
            style={styles.input}
            placeholder="Instagram (@username)"
            placeholderTextColor={isDark ? "#aaa" : "#555"}
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={[
              styles.button,
              { opacity: loading ? 0.7 : 1 }
            ]} 
            onPress={handleCreateEvent} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Création..." : "Créer l'événement"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>
              <Text style={styles.spanLinkText}>Annuler</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}