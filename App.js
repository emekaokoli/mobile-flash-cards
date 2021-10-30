import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { scheduleLocalNotification } from './utils/utils';
import { AppNavigator } from './utils/AppNavigator';

export default function App() {
  useEffect(() => {
    scheduleLocalNotification();
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
