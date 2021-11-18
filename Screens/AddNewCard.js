import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import {Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addCardToDeck, getDeck } from '../utils/api';
const { useState } = React;

export const AddNewCard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const disabledButton = question.length === 0 || answer.length === 0;

  const title  = route.params?.Title;

  const handleAddNewCard = async () => {
    if (question.length === 0 || answer.length === 0) return;

    addCardToDeck(title, {
      answer,
      question,
    })
      .then(() => {
        getDeck(title)
          .then((deck) => {
            navigation.navigate('Deck', {
              Title: title,
              deck,
              numOfCards: deck.questions?.length,
            });
          }).catch((error) => alert(error.message)).finally(() => {
            setQuestion('');
            setAnswer('');
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.keyboard}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add new Card</Text>
        <Text style={styles.label}>Question</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setQuestion(e)}
        />
        <Text style={styles.label}>Asnwer </Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setAnswer(e)}
        />
        <Button
          title=' add new card'
          onPress={handleAddNewCard}
          buttonStyle={(styles.button, { backgroundColor: 'tomato' })}
          disabled={disabledButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'tomato',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: 200,
    borderRadius: 5,
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
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
