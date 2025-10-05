import { useFonts as useExpoFonts } from 'expo-font';

export default function useFonts() {
  const [fontsLoaded] = useExpoFonts({
    'ArchivoBlack-Regular': require('../assets/fonts/ArchivoBlack-Regular.ttf'),
  });

  return fontsLoaded;
}