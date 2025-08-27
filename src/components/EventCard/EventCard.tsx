import React from 'react';
import { getStyles } from "./EventCard.styles"
import { useThemeContext } from '../../context/ThemeContext';
import { View, Text } from 'react-native';

type Props = {
  title: string;
};

const EventCard = ({ title }: Props) => {
    const { isDark } = useThemeContext();
    const styles = getStyles(isDark);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default EventCard;