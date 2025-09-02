import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './BottomListModal.styles';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import EventCard from '../EventCard/EventCard';

import eventsData from '../../assets/localData/eventlist.json';

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const BottomListModal = ({ visible, onOpen, onClose }: Props) => {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);

  const events = eventsData;

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
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Where are we going ?</Text>
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterItem}/>
            <View style={styles.filterItem}/>
            <View style={styles.filterItem}/>
          </View>
          <ScrollView style={styles.scrollView}>
            {events && events.map(event => 
              <EventCard event={event} key={event.title} />
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default BottomListModal;