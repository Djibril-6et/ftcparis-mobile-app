import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

// Save token
export async function saveToken(token: string) {
  await SecureStore.setItemAsync('userToken', token);
}

// Get token
export async function getToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('userToken');
}

// Delete token
export async function clearToken() {
  await SecureStore.deleteItemAsync('userToken');
}

// ---- Login ----
export async function login(email: string, password: string) {
  console.log("📡 Tentative login vers :", `${API_URL}/auth/login`);
  console.log("Payload :", { email, password });

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Identifiants invalides");
  }

  const data = await res.json();
  await saveToken(data.token);
  return data.user;
}

// ---- Register ----
export async function register(
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string,
  birthdate: string,
  role: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      username,
      firstname,
      lastname,
      birthdate,
      role,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erreur à l'inscription");
  }

  const data = await res.json();
  await saveToken(data.token);
  return data.user;
}

// ---- Get user profile ----
export async function getProfile() {
  const token = await getToken();
  if (!token) throw new Error("User not logged in");

  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Impossible de récupérer le profil");
  }

  const data = await res.json();
  return data;
}

// ---- Logout ----
export async function logout(navigation: any) {
  await clearToken();
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
}