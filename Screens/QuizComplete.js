import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';


export function QuizComplete() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    Title,
    correctAnswer,
    incorrectAnswer,
    totalQuestions,
    totalCorrect,
    totalIncorrect,
    totalScore,
  } = route.params;
  
  

  const correctPercentage = (correctAnswer / totalQuestions) * 100;
  const incorrectPercentage = (incorrectAnswer / totalQuestions) * 100;
  const totalPercentage = correctPercentage + incorrectPercentage;

  const handleRestartQuiz = () => {
    navigation.navigate('Quiz', {
      Title,
      correctAnswer: 0,
      incorrectAnswer: 0,
      totalQuestions: 0,
    });
  };

  const handleBackToDeck = () => {
    navigation.navigate('Deck', { Title });
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your {Title} Quiz Score</Text>
      <View style={styles.scoreContainer}>
        {/* <Text style={styles.score}> Correct Answers: {correctAnswer}</Text>
        <Text style={styles.score}> Incorrect Answers: {incorrectAnswer}</Text>
        <Text style={styles.score}> Total Questions: {totalQuestions}</Text> */}
        <Text style={styles.score}>
          Correct Percentage: {correctPercentage.toFixed(0)}%
        </Text>
        <Text style={styles.score}>
          {' '}
          Incorrect Percentage: {incorrectPercentage.toFixed(0)}%
        </Text>
        <Text style={styles.score}>
          {' '}
          Total Percentage: {totalPercentage.toFixed(0)}%
        </Text>
        <Text style={styles.score}> Total Score: {totalScore}</Text>
        <Text style={styles.score}> Total Correct: {totalCorrect}</Text>
        <Text style={styles.score}> Total Incorrect: {totalIncorrect}</Text>
        <Text style={styles.score}> Total Questions: {totalQuestions}</Text>

        <Text style={styles.score}>
          You got {correctAnswer} out of {totalQuestions} questions!
        </Text>
      </View>
      <Button
        title='Restart Quiz'
        buttonStyle={styles.button}
        onPress={handleRestartQuiz}
      />
      <Button
        title='Back to deck'
        buttonStyle={styles.button}
        onPress={handleBackToDeck}
      />
      <Button
        title='Back to home'
        buttonStyle={styles.button}
        onPress={handleBackToHome}
      />
    </View>
  );
}
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
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'tomato',
  },
  scoreContainer: {
    // flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
    padding: 10,
  },
  score: {
    margin: 3,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'tomato',
    margin: 8,
    padding: 8,
    width: 200,
    height: 50,
  },
});
