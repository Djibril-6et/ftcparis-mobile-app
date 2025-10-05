import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
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
      color: isDarkTheme ? '#fff' : '#000',
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
      backgroundColor: isDarkTheme ? '#f5f5f5' : '#1a1a1a',
      height: '100%',
      width: '30%',
      borderRadius: 15,
    },

    filterText: {
      color: isDarkTheme ? '#000' : '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 40,
    },
  });