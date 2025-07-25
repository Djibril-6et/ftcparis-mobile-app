import React, { useState, useEffect, useMemo } from 'react';
import { getStyles } from './App.styles';
import { useThemeContext } from './context/ThemeContext';
import {
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomListModal from './components/BottomListModal/BottomListModal';

type LatLng = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);

  // Default region for the map = Paris
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);

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
          <MapView style={styles.map} region={region}>
            {userLocation && (
              <Marker coordinate={userLocation} title="Vous êtes ici" />
            )}
          </MapView>

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
