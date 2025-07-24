import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './BottomListModal.styles';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const BottomListModal = ({ visible, onOpen, onClose }: Props) => {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  return (
    <>
      {/* Modal preview button when it's closed */}
      {!visible && (
        <Pressable style={styles.previewButton} onPress={onOpen}>
          <Text style={styles.previewButtonText}>Afficher la liste</Text>
        </Pressable>
      )}

      {/* Full modal when visible === true */}
      <Modal
        isVisible={visible}
        swipeDirection={['down']}
        onSwipeComplete={onClose}
        onBackdropPress={onClose}
        style={styles.modal}
        backdropOpacity={0.3}
        propagateSwipe
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationOutTiming={400}
      >
        <View style={styles.content}>
          <View style={styles.handle} />
          <Text style={styles.title}>Where are we going ?</Text>
        </View>
      </Modal>
    </>
  );
};

export default BottomListModal;
