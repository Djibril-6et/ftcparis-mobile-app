import { StyleSheet } from 'react-native';
import { Colors } from '../../context/ThemeContext';

export const getStyles = (color: Colors) =>
    StyleSheet.create({ 

        wrapper: {
            backgroundColor: color.background,
            width: '100%',
            height: 130,
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 25,
            borderRadius: 15,
            borderWidth: 0.1,
            borderColor: color.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 4,
        },

        imageWrapper: {
            width: '30%',
            height: '100%',
            borderRadius: 15,
            overflow: 'hidden',
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
            color: color.text,
            fontSize: 12,
            fontFamily: 'InriaSerif-Light',
        },

        title: {
            height: '25%',
            color: color.text,
            fontSize: 16,
            fontFamily: 'Anton-Regular',
        },

        place: {
            height: '20%',
            color: color.text,
            fontSize: 12,
            fontFamily: 'InriaSerif-Light',
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
            backgroundColor: color.buttonBackground,
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
            color: color.buttonText,
            fontSize: 12,
            flexShrink: 1,
            flexWrap: 'wrap', 
        },
    });
