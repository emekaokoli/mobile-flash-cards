import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { initializeDeckData } from '../redux/slices.decks.reducers';

import DeckListView from './DeckListView';


const Decks = (props) => {
 const decks = useSelector((state) => state.decks);
 console.log(decks);
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(initializeDeckData())

}, [])

  const handleNav = (deck) => {
    props.navigation.navigate('Deck', { deckId: deck.title });
  };


    //const { decks } = props;
    if (Object.keys(decks).length === 0) {
      return (
        <View>
          <Header
            placement='left'
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Mobile Flash Cards', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
          <View style={styles.container}>
            <Text style={styles.textOnly}>
              You have no decks, please add a deck to get started.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        <View>
          <Header title={'Mobile Flashcards'} />
          <View style={styles.container}>
            {Object.keys(decks).map((deck) => (
              <View key={deck}>
                <DeckListView deck={decks[deck]} toDeck={handleNav} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  textOnly: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 20,
  },
});


export default Decks
