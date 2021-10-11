import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { setLocalNotification } from './utils/utils';
import { AppNavigator } from './utils/AppNavigator';

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}
