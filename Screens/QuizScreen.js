import { useIsFocused } from '@react-navigation/core';
import React, { useState, useEffect,useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { getDeck } from '../utils/api';
// import { scheduleLocalNotification } from '../utils/utils';
import * as Notifications from 'expo-notifications';
import AnswerQuiz from './AnswerQuiz';
import {QuestionQuiz} from './QuestionQuiz';
import { scheduleLocalNotification } from '../utils/utils';






Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// export const clearLocalNotification = () => {
// 	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
// 		Notifications.cancelAllScheduledNotificationsAsync);
// };



export const Quiz = ({ route, navigation }) => {
  const { deckTitle } = route.params;
  const [isQuestion, setIsQuestion] = useState(true);
  const [thisDeck, setThisDeck] = useState(null);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [buttonText, setButtonText] = useState('Next Card');

    //const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) =>
    //   setExpoPushToken(token),
    // );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  

  const resetQuiz = () => {
    setCorrect(0);
    setIncorrect(0);
    setIndex(0);
    setButtonText('Next Card');
    setIsQuestion(true);
  };

  const isFocused = useIsFocused();
  const deckLength = () => thisDeck.questions.length;

  useEffect(() => {
    isFocused && resetQuiz();
  }, [isFocused]);

  useEffect(() => {
    const deck = deckTitle.replace(/ /g, '');
    getDeck(deck).then((response) => setThisDeck(response));
  }, []);

  const answerCheck = (answer) => {
    const correctAnswer = thisDeck.questions[index].answer;
    answer === correctAnswer
      ? setCorrect(correct + 1)
      : setIncorrect(incorrect + 1);
    return answer === correctAnswer ? true : false;
  };

  const handleAnswer = (answer) => {
    if (deckLength() === 1) {
      setButtonText('Show Score');
    }
    answerCheck(answer);
    setIsQuestion(false);
  };

  const handleNextCard =  () => {
    if (index + 1 === deckLength()){
      
         scheduleLocalNotification().then(() =>
           navigation.navigate('Score', {
             correctAnswers: correct,
             incorrectAnswers: incorrect,
             deckTitle,
           }),
         ).catch((err) => alert(err))
          
      
         
      
    }
    if (index + 2 === deckLength() || deckLength() === 1) {
      setButtonText('Show Score');
    }
    setIndex(index + 1);
    setIsQuestion(true);
  };
  return thisDeck !== null ? (
    isQuestion === true ? (
      <QuestionQuiz
        thisDeck={thisDeck}
        deckTitle={deckTitle}
        onFlipPress={setIsQuestion}
        index={index}
        onAnswer={handleAnswer}
      />
    ) : (
      <AnswerQuiz
        onFlipPress={setIsQuestion}
        thisDeck={thisDeck}
        index={index}
        onNextCard={handleNextCard}
        buttonText={buttonText}
      />
    )
  ) : (
    <View>
      <ActivityIndicator size='large' color='#0000ff' />
    </View>
  );
};

