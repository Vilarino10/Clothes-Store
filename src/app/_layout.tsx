import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [checkingSession, setCheckingSession] = useState(true)
   const colorScheme = useColorScheme();

  useEffect(() => {
    const checkSession = async () => {
      const loggedUser = await AsyncStorage.getItem(
        '@gotham_store:user_logged'
      );

      if (loggedUser === 'true') {
        router.replace('/');
      } else {
        router.replace('/login');
      }

      setCheckingSession(false);
    };

    checkSession();
  }, [])

  if (checkingSession) {
    return null;
  }
 
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{
        headerShown: false
      }}
      />
    </ThemeProvider>
  );
}
