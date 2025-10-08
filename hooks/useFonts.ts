import { useFonts as useExpoFonts } from 'expo-font';

export default function useFonts() {
  const [fontsLoaded] = useExpoFonts({
    // Archivo Black
    'ArchivoBlack-Regular': require('../assets/fonts/ArchivoBlack/ArchivoBlack-Regular.ttf'),
    // Inria Serif
    'InriaSerif-Regular.': require('../assets/fonts/Inria_Serif/InriaSerif-Regular.ttf'),
    'InriaSerif-Bold': require('../assets/fonts/Inria_Serif/InriaSerif-Bold.ttf'),
    'InriaSerif-Italic': require('../assets/fonts/Inria_Serif/InriaSerif-Italic.ttf'),
    'InriaSerif-BoldItalic': require('../assets/fonts/Inria_Serif/InriaSerif-BoldItalic.ttf'),
    'InriaSerif-Light': require('../assets/fonts/Inria_Serif/InriaSerif-Light.ttf'),
    'InriaSerif-LightItalic': require('../assets/fonts/Inria_Serif/InriaSerif-LightItalic.ttf'),
    // Anton SC
    'Anton-Regular': require('../assets/fonts/Anton_SC/AntonSC-Regular.ttf'),
  });

  return fontsLoaded;
}