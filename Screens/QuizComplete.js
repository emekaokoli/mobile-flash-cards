import React from 'react'
import { View, Text } from 'react-native'

export function QuizComplete({ navigation, route }) {
  const {
    Title,
    correctAnswer,
    incorrectAnswer,
    totalQuestions,
    totalCorrect,
    totalIncorrect,
    totalScore,
  } = route.params

const correctPercentage = (correctAnswer / totalQuestions) * 100
const incorrectPercentage = (incorrectAnswer / totalQuestions) * 100
const totalPercentage = correctPercentage + incorrectPercentage 


const handleRestartQuiz = () => {
  navigation.navigate('Quiz', {
    Title,
    correctAnswer: 0,
    incorrectAnswer: 0,
    totalQuestions: 0,
  })
}

  const handleBackToDeck = () => {
    navigation.navigate('Deck', { Title });
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Title} Quiz Score Card</Text>
      <Text> Correct Answers: {correctAnswer}</Text>
      <Text> Incorrect Answers: {incorrectAnswer}</Text>
      <Text> Total Questions: {totalQuestions}</Text>
      <Text> Correct Percentage: {correctPercentage}%</Text>
      <Text> Incorrect Percentage: {incorrectPercentage}%</Text>
      <Text> Total Percentage: {totalPercentage}%</Text>  
      <Text> Total Score: {totalScore}</Text>   
      <Text> Total Correct: {totalCorrect}</Text>
      <Text> Total Incorrect: {totalIncorrect}</Text>
      <Text> Total Questions: {totalQuestions}</Text>

      <Text>
        You got  {correctAnswer} {totalQuestions} correct!
      </Text>
      <Button title='Restart Quiz' onPress={handleRestartQuiz} />
      <Button title='Back to deck' onPress={handleBackToDeck} />
      <Button title='Back to home' onPress={handleBackToHome} />
    </View>
  );
}