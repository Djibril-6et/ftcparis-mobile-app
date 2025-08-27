import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './BottomListModal.styles';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import EventCard from '../EventCard/EventCard';

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const BottomListModal = ({ visible, onOpen, onClose }: Props) => {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);

  const events = [
    { title: "Conférence Tech 2025" },
    { title: "Atelier React Native" },
    { title: "Hackathon Étudiant" },
    { title: "Webinar : UX Design" },
    { title: "Networking Startup" },
    { title: "Salon de l’Innovation" },
    { title: "Coding Challenge Paris" },
    { title: "Masterclass en Cybersécurité" },
    { title: "Festival Digital Nomad" },
    { title: "Conférence sur l’IA Responsable" }
  ];
  
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
              <EventCard title={event.title} key={event.title} />
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default BottomListModal;