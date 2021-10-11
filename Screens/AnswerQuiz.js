import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function AnswerQuiz({
  onFlipPress,
  thisDeck,
  index,
  onNextCard,
  buttonText,
}) {
  return (
    <View style={styles.view}>
      <Text style={styles.control}>{`${index + 1}/${
        thisDeck.questions.length
      }`}</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.answer}>{thisDeck.questions[index].answer}!</Text>
          <TouchableOpacity onPress={() => onFlipPress(true)}>
            <Text style={styles.flip}>Question</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => onNextCard()}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  control: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 20,
  },
  answer: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  flip: {
    marginTop: 15,
    fontSize: 18,
    alignSelf: 'center',
    color: '#ff0000',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: 150,
    height: 60,
    borderRadius: 8,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
  },
});
