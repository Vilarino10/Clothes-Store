import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  router,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { CartProvider } from "@/context/CartContext";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [checkingSession, setCheckingSession] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      } else {
        router.replace("/login");
      }

      setCheckingSession(false);
    });

    return unsubscribe;
  }, []);

  if (checkingSession) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </ThemeProvider>
  );
}
