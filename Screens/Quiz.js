import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { getDeck } from '../utils/api';
import { scheduleLocalNotification } from '../utils/utils';
import { Button, ButtonGroup } from 'react-native-elements';


const { useEffect, useState, useCallback } = React;

export const Quiz = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { Title } = route.params;
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [decks, setDecks] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          const deck = await getDeck(Title);
          setDecks(deck);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      };
      loadData();
    }, [Title]),
  );

  const { questions } = decks || { questions: [] };
  const totalQuestions = questions?.length || 0;
  const isDeckData = questions[questionNumber] || {};
  const { question, answer } = isDeckData || {};
  const isLastQuestion = questionNumber === totalQuestions - 1;
  const isFirstQuestion = questionNumber === 0;
  const isCorrect = answer === answer;
  const isIncorrect = answer !== answer;
  const isAnswer = showQuestion ? answer : '';
  const isQuestion = showQuestion >= 0 || +1 ? question : '';
  const isIncorrectAnswer = showQuestion ? incorrectAnswer : 0;
  const isShowQuestionButton = showQuestion ? (
    <Text style={{ color: '#fff' }}>Toggle back</Text>
  ) : (
    <Text style={{ color: '#008080' }}>Show Answer</Text>
  );
  const totalScore = correctAnswer + incorrectAnswer;
  const totalIncorrect = totalQuestions - correctAnswer;
  const totalCorrect = correctAnswer - incorrectAnswer;
  // const isCorrectAnswer = showQuestion ? correctAnswer : 0;
  // const isTotalQuestions = showQuestion ? totalQuestions : 0;
  // const isQuestionNumber = showQuestion ? questionNumber : 0;
  // const isshowQuestion = showQuestion ? false : true;
  // const isshowQuestionText = showQuestion ? 'Show Answer' : 'Show Question';
  //const isShowQuestionButtonColor = showQuestion ? '#008080' : '#008080';

  const handleRestartQuiz = () => {
    setQuestionNumber(0);
    setCorrectAnswer(0);
    setIncorrectAnswer(0);
    setShowQuestion(true);
  };

  const handleBackToDeck = () => {
    navigation.navigate('Deck', { Title });
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleQuizComplete = () => {
    handleRestartQuiz();
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
      setShowQuestion(false);
    } else if (isFirstQuestion === 0) {
      setQuestionNumber(questionNumber + 1);
      setShowQuestion(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (isFirstQuestion) {
      handleRestartQuiz();
    } else {
      setQuestionNumber(questionNumber - 1);
      setShowQuestion(false);
    }
  };
  const handleshowQuestion = () => {
    setShowQuestion(!showQuestion);
  };

  const handleCorrectAnswer = () => {
    if (isCorrect) {
      setCorrectAnswer(correctAnswer + 1);
      setQuestionNumber(questionNumber + 1);
      setShowQuestion(false);
      handleNextQuestion();
    }
    
    if (isLastQuestion) {
      scheduleLocalNotification();
      handleQuizComplete();
      setShowQuestion(true);
    }
  };

  const handleIncorrectAnswer = () => {
    setIncorrectAnswer(incorrectAnswer + 1);
    setQuestionNumber(questionNumber + 1);
    setShowQuestion(false);
    handleNextQuestion();
  };

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='tomato' />
        </View>
      ) : totalQuestions === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>No Questions Found</Text>
          <Button title='Back to Deck' onPress={handleBackToDeck} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{Title} Quiz</Text>
          <Text style={styles.title}>{isQuestion}</Text>
          <Button
            title={isShowQuestionButton}
            buttonStyle={styles.button}
            onPress={handleshowQuestion}
          />
          <Text style={styles.title}>{isAnswer}</Text>
          <View style={styles.buttonGroup}>
            <Button
              title='Correct'
              buttonStyle={styles.button}
              onPress={handleCorrectAnswer}
            />
            <Button
              title='Incorrect'
              buttonStyle={styles.button}
              onPress={handleIncorrectAnswer}
            />
          </View>
          {/* <View style={styles.buttonGroup}>
            <Button
              title='Next Question'
              buttonStyle={styles.button}
              onPress={handleNextQuestion}
            />
            <Button
              title='Previous Question'
              buttonStyle={styles.button}
              onPress={handlePreviousQuestion}
            />
          </View> */}
          {isLastQuestion && (
            <Button
              title='Show Score'
              buttonStyle={styles.button}
              onPress={handleQuizComplete}
            />
          )}

          <Text>question number: {questionNumber}</Text>
        </View>
      )}
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
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 10,
    width: 150,
    height: 50,
    margin: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
