import Constants from 'expo-constants';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from "./EventCard.styles";

type Props = {
  event: {
    _id: string;
    title: string;
    image: string;
    datetime: string;
    place: string;
    keywords: string[];
    imageUrl?: string;
  };
};

const EventCard = ({ event }: Props) => {
    const { isDark, colors } = useThemeContext();
    const styles = getStyles(colors);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // Format datetime
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("fr-FR", { month: "long" });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${day} ${month} ${year} ${hours}h${minutes}`;
    };

    // Manage keywords display
    const maxVisible = 3;
    const hasMore = event.keywords.length > maxVisible;
    const visibleKeywords = hasMore 
        ? [...event.keywords.slice(0, 2), `+${event.keywords.length - 2}`]
        : event.keywords;

    const API_URL = Constants.expoConfig?.extra?.apiUrl;
    const imageUrl = event.imageUrl || 
                    (event.image ? `${API_URL}/images/${event.image}` : null);

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                {imageUrl ? (
                    <>
                        {imageLoading && (
                            <View style={[styles.image, { 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                position: 'absolute',
                                zIndex: 2
                            }]}>
                                <ActivityIndicator 
                                    size="small" 
                                    color={isDark ? "#fff" : "#007bff"} 
                                />
                            </View>
                        )}
                        
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                            resizeMode="cover"
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageLoading(false);
                                setImageError(true);
                            }}
                        />
                        
                        {imageError && (
                            <View style={[styles.image, { 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                backgroundColor: isDark ? '#333' : '#f0f0f0'
                            }]}>
                                <Text style={{ color: isDark ? '#aaa' : '#666' }}>
                                    Image indisponible
                                </Text>
                            </View>
                        )}
                    </>
                ) : (
                    <View style={[styles.image, { 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: isDark ? '#333' : '#f0f0f0'
                    }]}>
                        <Text style={{ color: isDark ? '#aaa' : '#666' }}>
                            Pas d'image
                        </Text>
                    </View>
                )}
            </View>
            
            <View style={styles.contentWrapper}>
                <Text style={styles.date}>{formatDate(event.datetime)}</Text>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.place}>
                    <Image
                        style={styles.locationIcon}
                        source={isDark
                            ? require('../../../assets/images/icons/location-white.png')
                            : require('../../../assets/images/icons/location-black.png')}
                    />
                    {" "}{event.place}
                </Text>
                <View style={styles.keywordWrapper}>
                    {visibleKeywords.map((keyword, index) => (
                        <View style={styles.keywordView} key={index}>
                            <View style={styles.keywordContent}>
                                <Image
                                    style={styles.keywordIcon}
                                    source={isDark
                                        ? require('../../../assets/images/icons/eye-black.png')
                                        : require('../../../assets/images/icons/eye-white.png')}
                                />
                                <Text style={styles.keywordText}>{keyword}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default React.memo(EventCard);