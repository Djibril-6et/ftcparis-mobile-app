import * as Keychain from "react-native-keychain";
import Config from "react-native-config";

const API_URL = Config.API_URL;

// Save token
export async function saveToken(token: string) {
  await Keychain.setGenericPassword("auth", token, {
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  });
}

// Get token
export async function getToken(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword();
  return creds ? creds.password : null;
}

// Delete token
async function clearToken() {
  await Keychain.resetGenericPassword();
}

// ---- Login ----
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Identifiants invalides");
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

// Delete token and logout user
export async function logout(navigation: any) {
  await clearToken(); // supprime le token de Keychain
  // redirection vers Login
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
}