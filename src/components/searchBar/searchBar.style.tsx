import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: isDarkTheme ? '#f5f5f5' : '#1a1a1a',
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: 300,
      height: 40,
    },

    input: {
      flex: 1,
      width: '70%',
      color: isDarkTheme ? '#fff' : '#000',
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