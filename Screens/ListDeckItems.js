import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Divider,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { removeDeck } from '../utils/api';
const { useState, useEffect } = React;

export const ListDeckItems = ({ route }) => {
  const { Title, numberOfCards:cards } = route.params;
    const navigation = useNavigation();
  

  const handleDeleteDeck = (Title) =>
    removeDeck(Title).then(() => navigation.navigate('Home'));

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          label='Deck'
          tintColor='#fff'
          onPress={() => navigation.navigate('Home')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.listContainer}>
      <View style={styles.listContainerTitle}>
        <Text style={styles.listTitle}>{Title} Deck</Text>
        <Text style={styles.numberOfDeckCards}>
          {cards} {cards === 1 ? 'card' : 'cards'}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('AddCard', {
              Title: route.params.Title,
            })
          }
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() =>
            navigation.navigate('Quiz', {
              Title,
            })
          }
        >
          <Text style={styles.quizButtonText}>
            Start Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteDeck}
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
                  onPress: () => handleDeleteDeck(Title),
                },
              ],
            )
          }
        >
          <Text style={styles.deleteDeckText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  listContainerTitle: {
    alignSelf: 'center',
  },

  listTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: 'tomato',
  },
  numberOfDeckCards: {
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
  quizButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: 150,
    height: 60,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#444',
  },
  quizButtonText:{
    alignSelf: 'center',
    fontSize: 20,
    color: 'white' 
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color:'tomato'
  },
  deleteDeck: {
    marginTop: 30,
    padding: 5,
    justifyContent: 'center',
  },
  deleteDeckText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ff0000',
  },
});
