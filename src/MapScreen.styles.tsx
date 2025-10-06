import { StyleSheet } from 'react-native';
import type { Colors } from './context/ThemeContext';

export const getStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: color.background,
    },

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color.background,
    },
    
    map: {
      ...StyleSheet.absoluteFillObject,
    },

    logoAndSearchBar: {
      position: 'absolute',
      top: 35,
      alignSelf: 'center',
      zIndex: 0,
      elevation: 0,
    },

    topLogo: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      resizeMode: 'contain', 
      marginBottom: 20,
    },

    searchbarAndAccountWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },

    accountIconWrapper: {
      width: '15%',
      height: 40,
      borderRadius: 20,
      backgroundColor: color.background,
      borderColor: color.border,
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    accountIconTouchable: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    accountIcon: {
      width: '80%',
      height: '60%',
      resizeMode: 'contain',
    },
  });