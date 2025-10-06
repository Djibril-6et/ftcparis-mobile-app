import { StyleSheet } from 'react-native';
import { Colors } from '../../context/ThemeContext';

export const getStyles = (color: Colors) =>
  StyleSheet.create({

    container: {
      flex: 1,
      zIndex: 1000,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: color.background,
    },

    ImageWrapper: {
      alignItems: 'center',
    },

    logo: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },

    textWrapper: {
      alignItems: 'center',
      marginTop: 20,
    },

    text: {
      fontSize: 18,
      color: color.text,
    },

    spanText: {
      fontSize: 18,
      color: '#ff0000',
      fontWeight: 'bold',
    },
  });