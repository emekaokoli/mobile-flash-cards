import AsyncStorage from "@react-native-async-storage/async-storage";

import { initialData } from "./_DATA";
import { generateID } from "./utils";
import { DECKS_STORAGE_KEY } from "./utils";

export const getDecks = () =>
	AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) =>
		data
			? JSON.parse(data)
			: AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
	);

export const getDeck = (id) => {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) =>
			data ? JSON.parse(data)[id] : null
		);
	} catch {
		alert("Failed to get the deck!");
	}
};

export const addCardToDeck = (title, card) => {
	const trimmedTitle = title.replace(/ /g, "");

	try {
		return getDeck(trimmedTitle).then((data) =>
			AsyncStorage.mergeItem(
				DECKS_STORAGE_KEY,
				JSON.stringify({
					[trimmedTitle]: {
						questions: [...data.questions, card],
					},
				})
			)
		);
	} catch {
		alert("Failed to add card!");
	}
};

export const saveDeckTitle = (deck, title) => {
	try {
		return AsyncStorage.mergeItem(
			DECKS_STORAGE_KEY,
			JSON.stringify({
				[deck]: {
					title,
					id: generateID(),
					questions: [],
				},
			})
		);
	} catch {
		alert("Failed to add deck!");
	}
};

export const removeDeck = (title) => {
	try {
		return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
			const data = JSON.parse(result);
			delete data[title];

			return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data)).then(() =>
				alert("Deck was successfully deleted!")
			);
		});
	} catch {
		alert("Failed to delete deck!");
	}
};

export const reset = () => {
	try {
		return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData)).then(() =>
			alert("Reset successful!")
		);
	} catch {
		alert("Reset Failed!");
	}
};
