import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { useThemeContext } from '../../context/ThemeContext';
import type { RootStackParamList } from "../../navigation/AppNavigator";
import EventCard from '../EventCard/EventCard';
import { getStyles } from './BottomListModal.styles';

type Event = {
  _id: string;
  title: string;
  image: string;
  datetime: string;
  place: string;
  keywords: string[];
  imageUrl?: string;
  geocoded?: boolean;
  latitude?: number;
  longitude?: number;
};

type Props = {
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const BottomListModal = ({ visible, onOpen, onClose }: Props) => {
  const { isDark, colors } = useThemeContext();
  const styles = getStyles(colors);
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Utiliser le context au lieu de l'état local
  const { events } = useEvents();
  
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '40%', '60%', '90%'], []);

  // Plus besoin de fetchEvents ici, c'est géré par le context

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.snapToIndex(3);
    } else {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableOverDrag={false}
      animateOnMount={false}
      enableDynamicSizing={false}
      overDragResistanceFactor={0}
      animationConfigs={{
        duration: 400,
      }}
      onChange={(index) => {
        if (index === 0) {
          onClose();
        } else {
          onOpen();
        }
      }}
      style={{
        shadowColor: colors.text,
        shadowOffset: {
          width: 0,
          height: -8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 10,
      }}
      backgroundStyle={{
        backgroundColor: colors.surface,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.border,
        width: 60,
      }}
    >
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Where are we going ?</Text>
        </View>
        
        <View style={styles.filterContainer}>
          {(user?.role === 'admin' || user?.role === 'eventholder') && (
            <TouchableOpacity 
              style={styles.filterItem} 
              onPress={() => {
                navigation.navigate("NewEvent");
                bottomSheetRef.current?.snapToIndex(0);
              }}
            >
              <Text style={styles.filterText}>+ Ajouter</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.filterItem}>
            <Text style={styles.filterText}>Filtrer</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList
          data={events}
          renderItem={({ item }: { item: Event }) => <EventCard event={item} />}
          keyExtractor={(item: Event) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default BottomListModal;