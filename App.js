import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { QuizHome } from './Screens/QuizHome';
import { Quiz } from './Screens/Quiz';
import { ListDeckItems } from './Screens/ListDeckItems';
import { AddNewCard } from './Screens/AddNewCard';
import { AddNewDeck } from './Screens/AddNewDeck';
import { registerForPushNotificationsAsync } from './utils/utils';
import { AppHome } from './utils/AppHome';
import { QuizComplete } from './Screens/QuizComplete';
const { useState, useEffect, useRef, createRef, createContext } = React;

export default function App() {
  const Stack = createStackNavigator();
  const QuizContext = createContext();
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
      <QuizContext.Provider value={Quiz}>
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
              <Stack.Screen name='QuizComplete' component={QuizComplete} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </QuizContext.Provider>
    </SafeAreaProvider>
  );
}
