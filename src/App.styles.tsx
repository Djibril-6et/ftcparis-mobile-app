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

    logoAndSearchBar: {
      position: 'absolute',
      top: 35,
      alignSelf: 'center',
      zIndex: 10, // above the map   
      elevation: 10, // Android
    },

    topLogo: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      resizeMode: 'contain', 
      marginBottom: 20,
    },
  });
