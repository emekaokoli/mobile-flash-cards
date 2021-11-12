import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDeck, saveDeckTitle } from '../utils/api';

const { useState } = React;

export const AddNewDeck = ({ route }) => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');

  const disabledButton = () => (input === '' ? true : false);

  const handleAddNewDeck = () => {
    getDecks().then((data) => {
      if (input === '') return;
      if (!data[input]) {
        return saveDeckTitle(input.trim(), input).then(() =>
          navigation.navigate('DeckItems', {
            Title: input,
            numberOfCards: 0,
          }),
        );
      } else {
        alert('Deck name exist. try another name.');
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.keyboard}
    >
      <View style={styles.newDeckContainer}>
        <Text style={styles.title}>Add new Deck</Text>
        <Text style={styles.innerTitle}> Whats the name of your deck?</Text>

        <TextInput
          style={styles.textInput}
          placeholder='deck name'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <TouchableOpacity
          onPress={handleAddNewDeck}
          disabled={disabledButton()}
          style={styles.button}
        >
          <Text style={styles.enterText}>Add Deck</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  newDeckContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  innerTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: 300,
    height: 60,
    borderRadius: 8,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    height: 40,
    borderColor: 'gray',
  },
  enterText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
