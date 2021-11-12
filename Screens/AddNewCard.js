import { TabRouter } from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addCardToDeck, getDeck } from '../utils/api';
const { useState } = React;

export const AddNewCard = ({ route }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState('');

  const disabledButton = question.length === 0 || answers.length === 0;

  const title  = route.params?.Title;

  const navigation = useNavigation();

  const handleAddNewCard = async () => {
    if (question.length === 0 || answers.length === 0) return;
    try {
      const deck = await getDeck(title);
      const card = {
        question,
        answers,
      };
      console.log(deck.questions.length);
      await addCardToDeck(title, card);
      navigation.navigate('Deck', {
        Title: title,
        deck,
        numberOfCards: deck.questions.length,
      });
      setQuestion('');
      setAnswers('');
    } catch (error) {
      console.log(error.message);
    }
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
          onChangeText={(question) => setQuestion(question)}
        />
        <Text style={styles.label}>Asnwer </Text>
        <TextInput
          style={styles.input}
          onChangeText={(answers) => setAnswers(answers)}
        />
        <Button
          title=' add new card'
          onPress={handleAddNewCard}
          style={styles.button}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
});
