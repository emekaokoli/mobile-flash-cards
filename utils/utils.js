
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export const DECKS_STORAGE_KEY = 'DECKS_STORAGE';
const NOTIFICATION_KEY = 'NOTIFICATION';

export const clearLocalNotification = async () =>
  AsyncStorage.removeItem(NOTIFICATION_KEY) .then(
    Notifications.cancelAllScheduledNotificationsAsync,
  );
  
export const scheduleLocalNotification = async () => {
  
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(19);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Daily Quiz',
                  body: "Practiced today!",
                },
                ios: {
                  sound: true,
                },
                android: {
                  sound: true,
                  priority: 'high',
                  sticky: false,
                  vibrate: true,
                },
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
          .catch((error) => error.message);
      }
    });
};

 export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};