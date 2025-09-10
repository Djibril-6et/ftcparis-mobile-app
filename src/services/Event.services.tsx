import * as Keychain from "react-native-keychain";
import Config from "react-native-config";

const API_URL = Config.API_URL;

// Get token
export async function getToken(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword();
  return creds ? creds.password : null;
}

// Function to duplicate events for testing lazy loading in dev mode
const duplicateEventsForTesting = (events: any[]): any[] => {
  const duplicated: any[] = [];
  for (let i = 0; i < 10; i++) { // Créer 10 copies de chaque événement
    events.forEach(event => {
      duplicated.push({
        ...event,
        _id: `${event._id}-copy-${i}`,
        title: `${event.title} (Test ${i + 1})`
      });
    });
  }
  return duplicated;
};

// ---- Get all events ----
export async function getEvents() {
  console.log("📡 Récupération des événements depuis :", `${API_URL}/events`);

  const res = await fetch(`${API_URL}/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Impossible de récupérer les événements");
  }

  const data = await res.json();
  
  // Add thumbnail query param to image URLs to optimize loading
  let eventsWithThumbs = data.map((event: any) => ({
    ...event,
    imageUrl: event.image ? `${API_URL}/images/${event.image}?thumb=true` : null,
    fullImageUrl: event.image ? `${API_URL}/images/${event.image}` : null
  }));

  // In dev mode, duplicate events to test lazy loading
  if (__DEV__) {
    eventsWithThumbs = duplicateEventsForTesting(eventsWithThumbs);
    console.log(`🔄 Mode dev: ${eventsWithThumbs.length} événements générés pour test lazy loading`);
  }
  
  return eventsWithThumbs;
}

// ---- Get event by ID ----
export async function getEventById(eventId: string) {
  console.log("📡 Récupération de l'événement :", `${API_URL}/events/${eventId}`);

  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Événement non trouvé");
  }

  const data = await res.json();
  return data;
}

// ---- Create event ----
export async function createEvent(
  title: string,
  keywords: string,
  datetime: string,
  place: string,
  instagram: string,
  imageFile?: {
    uri: string;
    type: string;
    name: string;
  }
) {
  console.log("📡 Création d'événement vers :", `${API_URL}/events`);
  console.log("Payload :", { title, keywords, datetime, place, instagram, hasImage: !!imageFile });

  const token = await getToken();
  if (!token) throw new Error("Token d'authentification manquant");

  const formData = new FormData();
  
  formData.append('title', title);
  formData.append('keywords', keywords);
  formData.append('datetime', datetime);
  formData.append('place', place);
  formData.append('instagram', instagram);
  
  // Add image if provided
  if (imageFile) {
    formData.append('image', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.name,
    } as any);
  }

  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Impossible de créer l'événement");
  }

  const data = await res.json();
  return data;
}

// ---- Update event ----
export async function updateEvent(
  eventId: string,
  title?: string,
  keywords?: string,
  datetime?: string,
  place?: string,
  instagram?: string,
  imageFile?: {
    uri: string;
    type: string;
    name: string;
  }
) {
  console.log("📡 Mise à jour de l'événement :", `${API_URL}/events/${eventId}`);

  const token = await getToken();
  if (!token) throw new Error("Token d'authentification manquant");

  const formData = new FormData();
  
  if (title) formData.append('title', title);
  if (keywords) formData.append('keywords', keywords);
  if (datetime) formData.append('datetime', datetime);
  if (place) formData.append('place', place);
  if (instagram) formData.append('instagram', instagram);
  
  if (imageFile) {
    formData.append('image', {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.name,
    } as any);
  }

  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Impossible de mettre à jour l'événement");
  }

  const data = await res.json();
  return data;
}

// ---- Delete event ----
export async function deleteEvent(eventId: string) {
  console.log("📡 Suppression de l'événement :", `${API_URL}/events/${eventId}`);

  const token = await getToken();
  if (!token) throw new Error("Token d'authentification manquant");

  const res = await fetch(`${API_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Impossible de supprimer l'événement");
  }

  const data = await res.json();
  return data;
}