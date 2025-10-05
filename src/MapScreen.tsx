import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapCluster from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getStyles } from './MapScreen.styles';
import BottomListModal from './components/BottomListModal/BottomListModal';
import SearchBar from './components/searchBar/searchBar';
import { useAuth } from './context/AuthContext';
import { useThemeContext } from './context/ThemeContext';
import type { RootStackParamList } from "./navigation/AppNavigator";
import { getEvents } from './services/Event.services';

type LatLng = {
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('📡 Chargement des événements pour la carte...');
        const response = await getEvents();
        const eventsData = response._j || response;
        console.log(`✅ ${eventsData.length} événements chargés`);
        setEvents(eventsData);
      } catch (err) {
        console.error("❌ Error fetching events:", err);
        setEvents([]);
      }
    };
    
    fetchEvents();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Permission refusée');
        setPermissionDenied(true);
        setUserLocation(null);
        setRegion({
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setLoading(false);
        return;
      }

      setPermissionDenied(false);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setLoading(false);
    } catch (error) {
      console.log('Erreur position :', error);
      setPermissionDenied(true);
      setUserLocation(null);
      setRegion({
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setLoading(false);
    }
  };

  const handleLocationButton = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setPermissionDenied(false);
    } else if (status === 'denied') {
      Alert.alert(
        "Localisation désactivée",
        "Pour activer votre position, vous devez autoriser l'accès dans les paramètres de votre appareil.",
        [
          { text: "Annuler", style: "cancel" },
          { 
            text: "Ouvrir les paramètres", 
            onPress: () => Linking.openSettings() 
          }
        ]
      );
    } else {
      requestLocationPermission();
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapCluster
            style={styles.map}
            region={region}
            clusterColor="red"
            clusterTextColor="white"
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Vous êtes ici"
                pinColor="blue"
              />
            )}

            {events
              .filter(event => event.geocoded && event.latitude && event.longitude)
              .map((event) => (
                <Marker
                  key={event._id}
                  coordinate={{ 
                    latitude: event.latitude, 
                    longitude: event.longitude 
                  }}
                  title={event.title}
                  description={event.place}
                />
              ))
            }
          </MapCluster>

          {permissionDenied && (
            <View
              style={{
                position: 'absolute',
                bottom: 120,
                left: 20,
                right: 20,
                backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Image
                source={require('../assets/images/icons/location-red.png')}
                style={{ width: 32, height: 32, marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: isDark ? '#fff' : '#000', 
                  fontSize: 14,
                  fontWeight: '500',
                  marginBottom: 4
                }}>
                  Localisation désactivée
                </Text>
                <Text style={{ 
                  color: isDark ? '#aaa' : '#666', 
                  fontSize: 12 
                }}>
                  Active ta position pour profiter pleinement de l'app
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#007bff',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
                onPress={handleLocationButton}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                  Activer
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.logoAndSearchBar}>
            <Image
              source={
                isDark
                  ? require('../assets/images/logo/iconwhitered.png')
                  : require('../assets/images/logo/iconblackred.png')
              }
              style={styles.topLogo}
            />
            <View style={styles.searchbarAndAccountWrapper}>
              <SearchBar />
              <View style={styles.accountIconWrapper}>
                <TouchableOpacity 
                  style={styles.accountIconTouchable} 
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Image
                    source={
                      isDark
                        ? require("../assets/images/icons/profile-white.png")
                        : require("../assets/images/icons/profile-black.png")
                    }
                    style={styles.accountIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <BottomListModal
            visible={isModalVisible}
            onOpen={() => setModalVisible(true)}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}