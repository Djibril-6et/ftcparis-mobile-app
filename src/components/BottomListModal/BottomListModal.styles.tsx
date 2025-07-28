import { StyleSheet } from 'react-native';

export const getStyles = (isDarkTheme: boolean) =>
    StyleSheet.create({

        modal: {
            justifyContent: 'flex-end',
            margin: 0,
        },

        content: {
            backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            padding: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: '75%',
            display: 'flex',
            width: '100%',
        },

        handle: {
            width: 100,
            height: 5,
            backgroundColor: '#616161',
            borderRadius: 3,
            alignSelf: 'center',
        },

        titleWrapper: {
            width: '100%',
            height: 22,
            marginBottom: 15,
            marginTop: 15,
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

        previewButton: {
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            backgroundColor: isDarkTheme ? '#1a1a1a' : '#f5f5f5',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: isDarkTheme ? '#f5f5f5' : '#1a1a1a',
            zIndex: 20,
        },

        previewButtonText: {
            color: isDarkTheme ? '#fff' : '#000',
            fontWeight: 'bold',
            fontSize: 16,
        },

        filterContainer: {
            width: '90%',
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
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

        scrollView: {
            display: 'flex',
            width: '100%',
        },
    });