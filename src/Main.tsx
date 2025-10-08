import React from "react";
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useFonts from '../hooks/useFonts';
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

export default function Main() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <AppNavigator />
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}