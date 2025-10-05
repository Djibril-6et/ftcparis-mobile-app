import 'dotenv/config';

export default {
  expo: {
    name: "ftcparismobileapp-expo",
    slug: "ftcparismobileapp-expo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ftcparismobileappexpo",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      apiUrl: process.env.API_URL, // ⬅️ Lecture depuis .env
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ftcparis.app",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Nous utilisons votre position pour afficher les événements à proximité."
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ],
      package: "com.ftcparis.app"
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      "expo-secure-store",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Nous utilisons votre position pour afficher les événements à proximité."
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    }
  }
};