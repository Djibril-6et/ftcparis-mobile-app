import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({

    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: isDarkTheme ? '#121212' : '#fff',
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkTheme ? '#121212' : '#fff',
    },
    
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
