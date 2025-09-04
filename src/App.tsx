import React, { useState, useEffect } from 'react';
import { getStyles } from './App.styles';
import { useThemeContext } from './context/ThemeContext';
import {
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapCluster from 'react-native-map-clustering';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomListModal from './components/BottomListModal/BottomListModal';
import SearchBar from './components/searchBar/searchBar';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./navigation/AppNavigator";

// Import JSON des événements avec coordonnées
import eventsData from './assets/localData/eventlist.json';

type LatLng = {
  latitude: number;
  longitude: number;
};

export default function App() {
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
  const [events, setEvents] = useState(eventsData);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: 'Cette application a besoin d’accéder à votre position.',
            buttonNeutral: 'Plus tard',
            buttonNegative: 'Refuser',
            buttonPositive: 'Accepter',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          setLoading(false);
        },
        (error) => {
          console.log('❌ Erreur position :', error);
          setUserLocation({ latitude: 48.8566, longitude: 2.3522 });
          setRegion({
            latitude: 48.8566,
            longitude: 2.3522,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
          showLocationDialog: true,
        }
      );
    };

    fetchLocation();
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
            {/* User marker */}
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Vous êtes ici"
                pinColor="blue"
              />
            )}

            {/* Events markers */}
            {events.map((event, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: event.latitude, longitude: event.longitude }}
                title={event.title}
                description={event.place}
              />
            ))}
          </MapCluster>

          <View style={styles.logoAndSearchBar}>
            <Image
              source={
                isDark
                  ? require('./assets/images/logo/iconwhitered.png')
                  : require('./assets/images/logo/iconblackred.png')
              }
              style={styles.topLogo}
            />
            <View style={styles.searchbarAndAccountWrapper}>
              <SearchBar />
              <View style={styles.accountIconWrapper}>
                <TouchableOpacity style={styles.accountIconTouchable} onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={
                      isDark
                        ? require("./assets/images/icons/profile-white.png")
                        : require("./assets/images/icons/profile-black.png")
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
