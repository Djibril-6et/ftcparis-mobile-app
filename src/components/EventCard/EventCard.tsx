import React from 'react';
import { getStyles } from "./EventCard.styles"
import { useThemeContext } from '../../context/ThemeContext';
import { View, Text, Image } from 'react-native';

type Props = {
  event: {
    title: string;
    image: string;
    datetime: string;
    place: string;
    keywords: string[];
  };
};

const EventCard = ({ event }: Props) => {
    const { isDark } = useThemeContext();
    const styles = getStyles(isDark);

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

    // Manage the display of keywords with "+N" if more than 3
    const maxVisible = 3;
    const hasMore = event.keywords.length > maxVisible;
    const visibleKeywords = hasMore 
        ? [...event.keywords.slice(0, 2), `+${event.keywords.length - 2}`] 
        : event.keywords;

    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                {/* <Image 
                    source={{ uri: 'http://192.168.1.200:7474/api/images/0ab4076145d51528d3a492e6f0bc424a.jpg' }} 
                    style={styles.image} 
                /> */}
                <Text style={styles.image}>{event.image}</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.date}>{formatDate(event.datetime)}</Text>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.place}>
                    <Image 
                        style={styles.locationIcon} 
                        source={isDark 
                            ? require('../../assets/images/icons/location-black.png') 
                            : require('../../assets/images/icons/location-white.png')} 
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
                                        ? require('../../assets/images/icons/eye-black.png') 
                                        : require('../../assets/images/icons/eye-white.png')} 
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
export default EventCard;
