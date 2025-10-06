import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './LoadingComponent.styles';

type Props = {
  visible: boolean;
};

export default function LoadingComponent({ visible }: Props) {
  const { isDark, colors } = useThemeContext();
  const styles = getStyles(colors);

  const scale = useSharedValue(1);
  
  // Animation de translation verticale pour chaque point
  const dot1TranslateY = useSharedValue(0);
  const dot2TranslateY = useSharedValue(0);
  const dot3TranslateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animation de pulsation
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      // Point 1 monte immédiatement
      dot1TranslateY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400 }) // Pause
        ),
        -1,
        false
      );

      // Point 2 monte avec un délai
      dot2TranslateY.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 200 }), // Délai
          withTiming(-8, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 200 }) // Pause
        ),
        -1,
        false
      );

      // Point 3 monte avec un délai plus long
      dot3TranslateY.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 400 }), // Délai
          withTiming(-8, { duration: 400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [visible]);

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedDot1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: dot1TranslateY.value }],
    };
  });

  const animatedDot2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: dot2TranslateY.value }],
    };
  });

  const animatedDot3Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: dot3TranslateY.value }],
    };
  });

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ImageWrapper, animatedScaleStyle]}>
        <Image
          source={
            isDark
              ? require('../../../assets/images/logo/iconwhitered.png')
              : require('../../../assets/images/logo/iconblackred.png')
          }
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View style={[styles.textWrapper, animatedScaleStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={styles.text}>Chargement </Text>
          <Animated.Text style={[styles.spanText, animatedDot1Style]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.spanText, animatedDot2Style]}>
            .
          </Animated.Text>
          <Animated.Text style={[styles.spanText, animatedDot3Style]}>
            .
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
}