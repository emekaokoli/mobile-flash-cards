import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';
const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export const scheduleLocalNotification = async() => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Daily Quiz',
                  body: "Please Don't forget to practice today!",
                },
                trigger: {
                  time: tomorrow,
                  repeat: 'day',
                },
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                .then((respose) => response)
                .catch((error) => error.message);
            }
          })
          .catch((error) => error.message);
      }
    });
};

export const generateID = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
