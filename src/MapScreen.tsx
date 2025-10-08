import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapCluster from 'react-native-map-clustering';
import { Marker, Polyline } from 'react-native-maps';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getStyles } from './MapScreen.styles';
import BottomListModal from './components/BottomListModal/BottomListModal';
import EventCard from './components/EventCard/EventCard';
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import SearchBar from './components/searchBar/searchBar';
import { useAuth } from './context/AuthContext';
import { useEvents } from './context/EventContext';
import { useThemeContext } from './context/ThemeContext';
import type { RootStackParamList } from "./navigation/AppNavigator";

type LatLng = {
  latitude: number;
  longitude: number;
};

type Event = {
  _id: string;
  title: string;
  image: string;
  datetime: string;
  place: string;
  keywords: string[];
  imageUrl?: string;
  geocoded?: boolean;
  latitude?: number;
  longitude?: number;
};

export default function MapScreen() {
  const { isDark, colors } = useThemeContext();
  const styles = getStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  
  // Utiliser le context au lieu de l'état local
  const { events } = useEvents();

  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);

  // Plus besoin de fetchEvents ici, c'est géré par le context

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

  const handleMarkerPress = async (event: Event) => {
    console.log('🎯 Marqueur cliqué:', event.title);
    setSelectedEvent(event);
    setModalVisible(false);
    
    if (userLocation && event.latitude && event.longitude) {
      console.log('🚀 Lancement getDirections...');
      await getDirections(
        userLocation,
        { latitude: event.latitude, longitude: event.longitude }
      );
    } else {
      console.log('⚠️ Pas de position utilisateur ou événement');
    }
  };

  const getDirections = async (origin: LatLng, destination: LatLng) => {
    try {
      const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;
      
      console.log('🔑 Clé API:', GOOGLE_API_KEY ? 'Trouvée' : 'Non trouvée');
      console.log('📍 Origine:', origin);
      console.log('📍 Destination:', destination);
      
      if (!GOOGLE_API_KEY) {
        console.error('❌ Clé API Google Maps non trouvée');
        setRouteCoordinates([origin, destination]);
        return;
      }
      
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=${GOOGLE_API_KEY}`;
      
      console.log('🗺️ Appel API Directions...');
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('📦 Statut réponse:', data.status);
      
      if (data.status === 'OK' && data.routes.length > 0) {
        const points = data.routes[0].overview_polyline.points;
        const decodedPoints = decodePolyline(points);
        console.log(`✅ Itinéraire trouvé avec ${decodedPoints.length} points`);
        console.log('🎯 Premiers points:', decodedPoints.slice(0, 3));
        setRouteCoordinates(decodedPoints);
      } else {
        console.warn('⚠️ Pas d\'itinéraire:', data.status);
        if (data.error_message) {
          console.error('💥 Erreur API:', data.error_message);
        }
        console.log('➡️ Fallback: ligne droite');
        setRouteCoordinates([origin, destination]);
      }
    } catch (error) {
      console.error('❌ Erreur fetch:', error);
      setRouteCoordinates([origin, destination]);
    }
  };

  const decodePolyline = (encoded: string): LatLng[] => {
    const poly: LatLng[] = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return poly;
  };

  const handleCloseEventCard = () => {
    setSelectedEvent(null);
    setRouteCoordinates([]);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <LoadingComponent visible={loading} />
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
              .map((event) => {
                if (event.latitude === undefined || event.longitude === undefined) {
                  return null;
                }
                
                return (
                  <Marker
                    key={event._id}
                    coordinate={{ 
                      latitude: event.latitude, 
                      longitude: event.longitude 
                    }}
                    onPress={() => handleMarkerPress(event)}
                  />
                );
              })
            }

            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor={isDark ? "#4A90E2" : "#007AFF"}
                strokeWidth={4}
              />
            )}
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
            {!selectedEvent && (
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
            )}
          </View>

          {selectedEvent && (
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                left: 15,
                right: 15,
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 10,
                  backgroundColor: colors.background,
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 5,
                }}
                onPress={handleCloseEventCard}
              >
                <Image
                  source={
                    isDark
                      ? require('../assets/images/icons/close-white.png')
                      : require('../assets/images/icons/close-black.png')
                  }
                  style={{ width: 16, height: 16 }}
                />
              </TouchableOpacity>
              <EventCard event={selectedEvent} />
            </View>
          )}
          {!selectedEvent && (
            <BottomListModal
              visible={isModalVisible}
              onOpen={() => setModalVisible(true)}
              onClose={() => setModalVisible(false)}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}