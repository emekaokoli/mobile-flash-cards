import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import { Provider } from 'react-redux';
import { setLocalNotification } from './utils/notifications';

import {store} from './redux/store'
import { AppNavigator } from './components/AppNavigator';
import { initializeDeckData } from './redux/slices.decks.reducers';



export default function App() {
useEffect(() => {
 //setLocalNotification()
 initializeDeckData()
}, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar style='auto' />
          {/* <AppNavigator /> */}
        </View>
      </Provider>
    </SafeAreaProvider>
  );
}
