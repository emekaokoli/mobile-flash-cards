import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import { getDeck, getDecks, saveDeckTitle } from '../utils/api';
import { Button } from 'react-native-elements';

const { useState, useCallback } = React;

export const AddNewDeck = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState('');
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const disabledButton = input?.length === 0;

  const handleAddNewDeck = async () => {
    getDeck(input)
      .then((data) => {
        if (data !== null && data === input) {
          alert('Deck already exists!');
        } else {
          saveDeckTitle(input);
          navigation.navigate('Deck', { Title: input, numOfCards: 0 });
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() =>  setInput(''));
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
          placeholder='Enter a new deck name'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <Button
          title='Add Deck'
          buttonStyle={styles.button}
          onPress={handleAddNewDeck}
          disabled={disabledButton}
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
    color: 'tomato',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  innerTitle: {
    color: '#444',
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignSelf: 'center',
    //borderWidth: 2,
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
