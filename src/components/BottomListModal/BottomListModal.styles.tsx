import { StyleSheet } from 'react-native';
import { Colors } from '../../context/ThemeContext';

export const getStyles = (color: Colors) =>
  StyleSheet.create({
    content: {
      flex: 1,
      // backgroundColor: color.background,
      padding: 15,
    },

    titleWrapper: {
      width: '100%',
      height: 22,
      marginBottom: 25,
      overflow: 'hidden',
    },

    title: {
      maxWidth: '100%',
      maxHeight: '100%',
      color: color.text,
      fontFamily: 'ArchivoBlack-Regular',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 4,
    },

    filterContainer: {
      width: '90%',
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      marginBottom: 20,
    },

    filterItem: {
      display: 'flex',
      backgroundColor: color.buttonBackground,
      height: '100%',
      width: '30%',
      borderRadius: 15,
    },

    filterText: {
      color: color.buttonText,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 40,
    },
  });