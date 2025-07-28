import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
    StyleSheet.create({ 

        wrapper: {
            backgroundColor: isDarkTheme ? '#f5f5f5' : '#1a1a1a',
            width: '100%',
            height: 100,
            marginBottom: 25,
            borderRadius: 15,
        },

        title: {
            color: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            marginLeft: 10
        }
    });