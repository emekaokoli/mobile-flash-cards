import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { getDeck } from '../utils/api';
import { DECKS_STORAGE_KEY, scheduleLocalNotification } from '../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const { useEffect, useState, useLayoutEffect, useCallback } = React;

export const Quiz = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [decks, setDecks] = useState(null);
  const [loading, setLoading] = useState(false);

  const { Title } = route.params;

  useFocusEffect(() => {
    useCallback(() => {
      console.log('called');
      setLoading(true);
      getDeck(Title)
        .then((deck) => {
          setDecks(deck);
          setLoading(false);
        })
        .catch((error) => console.log(error.message));
    }, [decks]);
  }, []);

  console.log(decks);
  

  const { questions } = decks || {};
  const totalQuestions = questions?.length || 0;
  const isDeckData = questions[questionNumber] || {};
  const { question, answer } = isDeckData || {};
  const isLastQuestion = questionNumber === totalQuestions - 1;
  const isFirstQuestion = questionNumber === 0;
  const isCorrect = answer === answer;
  const isIncorrect = answer !== answer;
  const isAnswer = showAnswer ? answer : 'No answer';
  const isQuestion = showAnswer ? question : '';
  const isCorrectAnswer = showAnswer ? correctAnswer : 0;
  const isIncorrectAnswer = showAnswer ? incorrectAnswer : 0;
  const isTotalQuestions = showAnswer ? totalQuestions : 0;
  const isQuestionNumber = showAnswer ? questionNumber : 0;
  const isShowAnswer = showAnswer ? false : true;
  const isShowAnswerText = showAnswer ? 'Show Answer' : 'Show Question';
  const isShowAnswerButton = showAnswer ? 'Show Question' : 'Show Answer';
  const isShowAnswerButtonColor = showAnswer ? '#008080' : '#008080';
  const totalScore = correctAnswer + incorrectAnswer;
  const totalIncorrect = totalQuestions - correctAnswer;
  const totalCorrect = correctAnswer;
  const { question: questionText, answer: AnswerText } = questions || {};

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswer(correctAnswer + 1);
    setQuestionNumber(questionNumber + 1);
    setShowAnswer(false);
  };

  const handleIncorrectAnswer = () => {
    setIncorrectAnswer(incorrectAnswer + 1);
    setQuestionNumber(questionNumber + 1);
    setShowAnswer(false);
  };

  const handleRestartQuiz = () => {
    setQuestionNumber(0);
    setCorrectAnswer(0);
    setIncorrectAnswer(0);
    setShowAnswer(false);
  };

  const handleBackToDeck = () => {
    navigation.navigate('Deck', { Title });
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleQuizComplete = () => {
    navigation.navigate('QuizComplete', {
      Title,
      correctAnswer,
      incorrectAnswer,
      totalQuestions,
      totalScore,
      totalCorrect,
      totalIncorrect,
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      scheduleLocalNotification();
      handleQuizComplete();
      setShowAnswer(true);
    } else {
      setQuestionNumber(questionNumber + 1);
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) {
      handleRestartQuiz();
    } else {
      setQuestionNumber(questionNumber - 1);
      setShowAnswer(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={styles.container}>
        <ActivityIndicator size="large" color='tomato'/>
      </View>) : deckks &&  totalQuestions === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>No Questions Found</Text>
          <Button title="Back to Deck" onPress={handleBackToDeck} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{Title}</Text>
          <Text style={styles.title}>{isQuestion}</Text>
          <Button title={isShowAnswerButton} onPress={handleShowAnswer} />
          <Text style={styles.title}>{isAnswer}</Text>
          <Button title='Correct' onPress={handleCorrectAnswer} />
          <Button title='Incorrect' onPress={handleIncorrectAnswer} />
          <Button title='Next Question' onPress={handleNextQuestion} />
          <Button title='Previous Question' onPress={handlePreviousQuestion} />
          {isLastQuestion && (
            <Button title='Quiz Complete' onPress={handleQuizComplete} />
          )}
        </View>
      ) 
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  button: {
    width: 200,
    height: 50,
  }

});
