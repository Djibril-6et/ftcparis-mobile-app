import React, { use, useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { getStyles } from './BottomListModal.styles';
import { View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import EventCard from '../EventCard/EventCard';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { getEvents } from '../../services/Event.services';

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const BottomListModal = ({ visible, onOpen, onClose }: Props) => {
  const { isDark } = useThemeContext();
  const styles = getStyles(isDark);
  const [events, setEvents] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        const eventsData = response._j || response;
        setEvents(eventsData);
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };
    
    fetchEvents();
  }, [visible]);

  const {user} = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <>
      {/* Modal preview button when it's closed */}
      {!visible && (
        <Pressable style={styles.previewButton} onPress={onOpen}>
          <Text style={styles.previewButtonText}>Les événements</Text>
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
            {(user?.role === 'admin' || user?.role === 'eventholder') && (
              <TouchableOpacity style={styles.filterItem} onPress={() => {
                navigation.navigate("NewEvent")
                onClose();
              }}>
                <Text style={styles.filterText}>+ Ajouter</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Filtrer</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={events}
            renderItem={({ item }) => <EventCard event={item} />}
            keyExtractor={(item) => item._id}
            style={styles.scrollView}
            initialNumToRender={4}
            maxToRenderPerBatch={3}
            windowSize={7}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            onEndReached={() => console.log('Fin de liste atteinte')}
            getItemLayout={(data, index) => ({
              length: 130,
              offset: 130 * index, 
              index,
            })}
          />
        </View>
      </Modal>
    </>
  );
};

export default BottomListModal;