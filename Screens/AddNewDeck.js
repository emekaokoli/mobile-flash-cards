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
import { getDeck, getDecks, saveDeckTitle } from '../utils/api';

const { useState } = React;

export const AddNewDeck = ({ route }) => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');

  const disabledButton = input.length === 0;

  const title = input || route.params?.Title;

  const handleAddNewDeck = async () => {
  try {
      const decks = await getDeck(input);
      if (decks) {
        alert('Deck already exist');
      } else {
        const deck = await saveDeckTitle(input, title);
        navigation.navigate('Deck', {
          Title: input,
          deck: deck.questions.length,
        });
      }
  } catch (error) {
    console.log(error);
  }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add new Deck</Text>
        <Text style={styles.innerTitle}> Whats the name of your deck?</Text>

        <TextInput
          style={styles.textInput}
          placeholder='deck name'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <Button
          title='Add Deck'
          onPress={handleAddNewDeck}
          disabled={disabledButton}
          style={styles.button}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
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
