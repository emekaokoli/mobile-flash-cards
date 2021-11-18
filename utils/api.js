import AsyncStorage from '@react-native-async-storage/async-storage';

import { initialData } from './data';
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
  !AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
    ? AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
    : AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => JSON.parse(data));

export const getDeck = (params) =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data);
      return decks[params];
    })
    .catch((error) => alert(`Failed to get the deck!${error}`));

export const addCardToDeck = async (title, card) =>
  getDeck(title)
    .then((data) =>
      AsyncStorage.mergeItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({
          [title]: {
            questions: [...data.questions, card],
          },
        }),
      ),
    )
    .catch((error) => alert(`Failed to add the card!${error}`));

//   return AsyncStorage.mergeItem(
//     DECKS_STORAGE_KEY,
//     JSON.stringify(
//       storeData,
//     ),
//   ); // merge the new data with the existing one
// })
// .catch((error) => alert(`failed to add new card to the deck ${error}`));

export const saveDeckTitle = async (deck, title) =>
  await AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [deck]: {
        title,
        id: randomId(),
        questions: [],
      },
    }),
  ).catch((error) => alert(`Insert failed, ${error}`));

export const removeDeckItem = (params) =>
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data);
      const filtered = Array.from(decks).filter(
        (deck) => deck.title !== params,
      );
      return AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(filtered),
      ).then(() => alert(`Deck ${params} deleted!`));
    })
    .catch((error) => alert(`Failed to remove deck!${error}`));


 export const randomId = () => {
   const min = 1;
   const max = 100;
   return min + Math.random() * (max - min);
 };