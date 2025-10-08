// context/EventContext.tsx
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getEvents } from '../services/Event.services';

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

type EventContextType = {
  events: Event[];
  loading: boolean;
  refreshEvents: () => Promise<void>;
  addEvent: (event: Event) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      console.log('🔄 Chargement des événements...');
      setLoading(true);
      const response = await getEvents();
      const eventsData = response._j || response;
      console.log(`✅ ${eventsData.length} événements chargés`);
      setEvents(eventsData);
    } catch (err) {
      console.error("❌ Error fetching events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = async () => {
    await fetchEvents();
  };

  const addEvent = (event: Event) => {
    setEvents(prev => [event, ...prev]);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, refreshEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};