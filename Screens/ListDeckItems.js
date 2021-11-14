import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { removeDeck } from '../utils/api';
const { useState, useEffect } = React;

export const ListDeckItems = ({ route }) => {
  const { Title, numOfCards } = route.params;
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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{Title} Deck</Text>
        <Text style={styles.numOfCard}>
          {numOfCards} {numOfCards === 1 ? 'card' : 'cards'}
        </Text>
      </View>
      <View>
        <Button
          title='Add Card'
          buttonStyle={styles.button}
          onPress={() =>
            navigation.navigate('AddCard', {
              Title,
            })
          }
        />

        <Button
          title='Start Quiz'
          buttonStyle={styles.quizButton}
          onPress={() =>
            navigation.navigate('Quiz', {
              Title,
            })
          }
        />

        <Button
          type='clear'
          title='Delete Deck'
          buttonStyle={styles.delete}
          titleStyle={{ color: 'red' }}
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
        />
      </View>
    </View>
  );
};

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
    fontSize: 30,
    color: 'tomato',
  },
  numOfCard: {
    fontSize: 20,
    textAlign: 'center',
    color: '#b3b3b3',
  },
  button: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    width: 200,
    height: 50,
  },
  quizButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'tomato',
    borderRadius: 10,
    width: 200,
    height: 50,
  },
  delete: {
    marginTop: 30,
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 16,
  },
});
