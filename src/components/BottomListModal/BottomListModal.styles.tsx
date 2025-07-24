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
            minHeight: '75%',
        },

        handle: {
            width: 80,
            height: 5,
            backgroundColor: '#616161',
            borderRadius: 3,
            alignSelf: 'center',
            marginBottom: 15,
        },

        title: {
            color: isDarkTheme ? '#fff' : '#000',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
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
    });
