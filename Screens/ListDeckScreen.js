import React, { useLayoutEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Divider } from 'react-native-elements';
import { removeDeck } from '../utils/api';

export const ListDecks = ({ navigation, route }) => {
  const { deckTitle, numberOfCards, isNewDeck } = route.params;

  useLayoutEffect(() => {
    if (isNewDeck === true) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton
            label='Deck List'
            tintColor='#fff'
            onPress={() => navigation.navigate('Home')}
          />
        ),
      });
    }
  }, [navigation]);
  const handleDeleteDeck = (deckTitle) => {
    const deck = deckTitle.replace(/ /g, '');
    return removeDeck(deck).then(() => navigation.navigate('Home'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{deckTitle} Deck</Text>
        <Divider style={{ backgroundColor: 'black' }}></Divider>
        <Text style={styles.cardsNumber}>
          {numberOfCards} {numberOfCards === 1 ? 'card' : 'cards'}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('NewCard', {
              deckTitle: route.params.deckTitle,
            })
          }
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 10, backgroundColor: '#444' }]}
          onPress={() =>
            navigation.navigate('Quiz', {
              deckTitle,
            })
          }
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>
            Start Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() =>
            Alert.alert(
              'Delete Deck?',
              'Are you sure you want to delete this deck?',
              [
                {
                  text: 'Cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => handleDeleteDeck(deckTitle),
                },
              ],
            )
          }
        >
          <Text style={styles.deleteText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  titleContainer: {
    alignSelf: 'center',
  },

  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 45,
    color: '#444',
  },
  cardsNumber: {
    fontSize: 20,
    textAlign: 'center',
    color: '#b3b3b3',
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
  delete: {
    marginTop: 30,
    padding: 5,
    justifyContent: 'center',
  },
  deleteText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ff0000',
  },
});
