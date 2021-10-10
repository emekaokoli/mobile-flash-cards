// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export const MFC_KEY = 'udacity_mobile_flash_cards';

function setStore() {
  let decks = {};
  AsyncStorage.setItem(MFC_KEY, JSON.stringify(decks));
  return decks;
}

function getStore(results) {
  return results === null ? setStore() : results;
}

export function _getDecks() {
  return AsyncStorage.getItem(MFC_KEY).then(getStore);
}

export function _getDeckByTitle(title) {
  return AsyncStorage.getItem(MFC_KEY).then((results) => results[title]);
}

export function _saveDeck(title) {
  return AsyncStorage.mergeItem(
    MFC_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    }),
  );
}

export function _deleteDeck(title) {
  return AsyncStorage.getItem(MFC_KEY).then((res) => {
    const data = JSON.parse(res);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(MFC_KEY, JSON.stringify(data));
  });
}

export function _addCard({ question, answer, name }) {
  return AsyncStorage.getItem(MFC_KEY).then((results) => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {...decks[name], questions: decks[name].questions.concat([{ question, answer }]),
      },
    };
    AsyncStorage.mergeItem(MFC_KEY, JSON.stringify(decks));
  });
}
export function _deleteCard(question, deck) {
 return AsyncStorage.getItem(MFC_KEY).then((results) => {
   let decks = { ...JSON.parse(results) };
   decks = {
     ...decks,
     [deck]: {
       ...decks[deck],
       questions: decks[deck].questions.filter((q) => question !== q.question),
     },
   };
   AsyncStorage.mergeItem(MFC_KEY, JSON.stringify(decks));
 })
}