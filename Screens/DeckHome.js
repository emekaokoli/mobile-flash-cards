import * as React from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getDecks, reset } from '../utils/api';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { useEffect, useState } = React;

export const DeckHome = () => {
  const [loading, setLoading] = useState(false);
  const [decks, setDecks] = useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchDecks = async () => {
      setLoading(true);
      try {
        const data = await getDecks();
        setDecks(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }
    isFocused && fetchDecks();
  }, [isFocused]);

  return (
    <View style={styles.cardContainer}>
      {loading === true ? (
        <ActivityIndicator size='large' color='tomato' />
      ) : decks && Object.keys(decks)?.length > 0 ? (
        <ScrollView>
          {Object.keys(decks)?.map((item) => {
            const numberOfCards = decks[item].questions.length;
            return (
              <TouchableOpacity
                key={item}
                style={styles.cards}
                onPress={() =>
                  navigation.navigate('Deck', {
                    Title: decks[item]?.title,
                    numberOfCards,
                  })
                }
              >
                <Text style={styles.cardTitle}>{decks[item]?.title}</Text>
                <Text style={styles.cardsNumber}>
                  {numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.nullCards}>
          <Text style={styles.nullCardsText}>You don't have decks!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cards: {
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 45,
    color: '#444',
  },
  cardTitle: {
    fontSize: 30,
    color: 'tomato',
  },
  cardsNumber: {
    color: 'gray',
  },
  nullCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nullCardsText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'tomato',
  },
});
