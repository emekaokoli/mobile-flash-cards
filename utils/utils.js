import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from "expo-notifications";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const DECKS_STORAGE_KEY = "MobileFlashcards:decks";
const NOTIFICATION_KEY = "MobileFlashcards:notifications";

export const clearLocalNotification = () => {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync()
	);
};

export const setLocalNotification = () => {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync();

						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(20);
						tomorrow.setMinutes(0);

						Notifications.scheduleNotificationAsync({
							content: {
								title: "Let's practice!",
								body: "Don't forget to practice with your flashcards today!",
							},
							trigger: {
								time: tomorrow,
								repeat: "day",
							},
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
};

export const generateID = () =>
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
