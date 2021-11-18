import * as React from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getDecks, reset } from '../utils/api';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const { useEffect, useState, useCallback } = React;

export const QuizHome = () => {
  const [loading, setLoading] = useState(false);
  const [decks, setDecks] = useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
 useFocusEffect(
   React.useCallback(() => {
     const fetchDecks = async () => {
       setLoading(true);
       try {
         const data = await getDecks();
         setDecks(data);
         setLoading(false);
       } catch (error) {
         console.log(error.message);
       }
     };
     fetchDecks();
   }, []),
 );

  const totalDecks = Object.keys(decks)?.length;

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='tomato' />
        </View>
      ) : decks && totalDecks > 0 ? (
        <ScrollView contentContainerStyle={styles.innerContainer}>
          {Object.keys(decks)?.map((item) => {
            const { title, questions } = decks[item];
            const numOfQuestions = questions?.length;
            const numOfCards = numOfQuestions > 0 ? numOfQuestions : 0;

            return (
              <View key={item} style={styles.deck}>
                <TouchableOpacity
                style={styles.cards}
                onPress={() =>
                  navigation.navigate('Deck', {
                    Title: title,
                    numOfCards,
                  })
                }
              >
                <View style={styles.card}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.numOfCard}>
                     {numOfCards} {numOfCards === 1 ? 'card' : 'cards'}
                  </Text>
                </View>
              </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyCardText}>You don't have decks!</Text>
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
  },
  innerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  cards: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 45,
    color: '#444',
  },
  title: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'tomato',
  },
  numOfCard: {
    color: 'gray',
  },
  emptyCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCardText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'tomato',
  },
});
