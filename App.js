import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef, createRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
// import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { DeckHome } from './Screens/DeckHome';
import { Quiz } from './Screens/Quiz';
import { ListDeckItems } from './Screens/ListDeckItems';
import { AddNewCard } from './Screens/AddNewCard';
import { AddNewDeck } from './Screens/AddNewDeck';
import {
  registerForPushNotificationsAsync,
  scheduleLocalNotification
} from './utils/utils';
import { AppHome } from './utils/AppHome';



export default function App() {
  const Stack = createStackNavigator();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    
    scheduleLocalNotification();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={createRef()}>
        <View style={{ flex: 1 }}>
          <StatusBar style='auto' />

          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={AppHome}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name='Deck'
              component={ListDeckItems}
              options={({ route }) => ({
                title: route.params.Title,
                headerStyle: {
                  backgroundColor: '#444',
                },
                headerTintColor: '#fff',
              })}
            />

            <Stack.Screen name='AddCard' component={AddNewCard} />
            <Stack.Screen name='Quiz' component={Quiz} />
            {/* <Stack.Screen name='Score' component={ScoreScreen} /> */}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
