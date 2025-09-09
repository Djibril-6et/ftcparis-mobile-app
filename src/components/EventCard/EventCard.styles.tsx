import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
    StyleSheet.create({ 

        wrapper: {
            backgroundColor: isDarkTheme ? '#f5f5f5' : '#1a1a1a',
            width: '100%',
            height: 130,
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 25,
            borderRadius: 15,
        },

        imageWrapper: {
            width: '30%',
            height: '100%',
            borderRadius: 15,
            overflow: 'hidden',
            backgroundColor: '#ff0000',
            justifyContent: 'center',
            alignItems: 'center',
        },

        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },

        contentWrapper: {
            width: '70%',
            height: '100%',
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },

        date: {
            height: '20%',
            color: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            fontSize: 12,
        },

        title: {
            height: '20%',
            color: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            fontSize: 12,
            fontWeight: 'bold',
        },

        place: {
            height: '20%',
            color: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            fontSize: 12,
        },

        locationIcon: {
            width: 12,
            height: 12,
            marginRight: 5,
        },

        keywordWrapper: {
            height: '35%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        keywordView: {
            backgroundColor: '#2C2C2C',
            marginRight: 5,  
            paddingHorizontal: 6,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '32%',
        },

        keywordContent: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        keywordIcon: {
            width: 12,
            height: 12,
            marginRight: 4,
        },

        keywordText: {
            color: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            fontSize: 12,
            flexShrink: 1,
            flexWrap: 'wrap', 
        },
    });
