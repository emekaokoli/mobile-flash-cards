import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialData } from './_DATA';
import { generateID } from './utils';
import { DECKS_STORAGE_KEY } from './utils';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const getDecks = () =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) =>
    data
      ? JSON.parse(data)
      : AsyncStorage.setItem(
          DECKS_STORAGE_KEY,
          JSON.stringify(initialData),
        ),
  );

export const getDeck = (id) =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => (data ? JSON.parse(data)[id] : null))
    .catch((error) => alert('Failed to get the deck!'));

export const addCardToDeck = (title, card) => {
  const trimmedTitle = title.replace(/ /g, '');

  return getDeck(trimmedTitle)
    .then((data) => {
			const storeData = {
            [trimmedTitle]: {
              questions: [...data.questions, card],
            }
          };
			return AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(
          storeData,
          getCircularReplacer()
        ),
      )//.catch((error) => alert(`failed to merge ${error}`)),
		}).catch((error) => alert(`failed to new add card to the deck ${error}`));
};

export const saveDeckTitle = async (deck, title) => {
  try {
    return await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify(
        {
          [deck]: {
            title,
            id: generateID(),
            questions: [],
          },
        },
        getCircularReplacer(),
      ),
    );
  } catch {
    alert('Failed to add deck!');
  }
};

export function removeDeck(title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result);
      delete data[title];

      return AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(data),
      ).then(() => alert('Deck was successfully deleted!'));
    })
    .catch((error) => alert(`Failed to delete deck! ${error}`));
}

export const reset = () =>
  AsyncStorage.setItem(
    DECKS_STORAGE_KEY,
    JSON.stringify(initialData),
  )
    .then(() => alert('Reset successful!'))
    .catch((error) => alert(`Reset Failed! ${error}`));
