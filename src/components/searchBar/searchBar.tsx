import React, { useEffect, useState } from 'react';
import { Image, Keyboard, Pressable, TextInput, View } from 'react-native';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './searchBar.style';

const icons = {
  searchWhite: require('../../../assets/images/icons/search-white.png'),
  searchBlack: require('../../../assets/images/icons/search-black.png'),
  closeWhite: require('../../../assets/images/icons/close-white.png'),
  closeBlack: require('../../../assets/images/icons/close-black.png'),
};

const SearchBar = () => {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  // Choix instantané de l'icône
  const iconSource = isKeyboardVisible
    ? isDark
      ? icons.closeWhite
      : icons.closeBlack
    : isDark
    ? icons.searchWhite
    : icons.searchBlack;

  const handlePressIcon = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
      setSearchText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par filtre, lieu, nom"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Pressable onPress={handlePressIcon}>
        <Image source={iconSource} style={styles.searchIcon} />
      </Pressable>
    </View>
  );
};

export default SearchBar;