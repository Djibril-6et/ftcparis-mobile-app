import { StyleSheet } from 'react-native';
import { Colors } from '../../context/ThemeContext';

export const getStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color.surface,
      borderRadius: 20,
      borderWidth: 0.2,
      borderColor: color.border,
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '80%',
      height: 40,
    },

    input: {
      flex: 1,
      width: '70%',
      color: color.text,
      fontSize: 16,
      padding: 0,
      marginLeft: 10,
    },

    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
  });