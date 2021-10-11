import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { primary, secondary, secondaryLight } from '../colors';

const DeckListView = () => {
  const [state, setstate] = useState()
  const deck = useSelector(state => state.decks)

  

 const handlePress = () => {
    const { deck } = props;
    props.toDeck(deck);
  };


    //const { deck } = this.props;
    const { questions, title } = deck;

    return (
      <TouchableOpacity onPress={handlePress} style={styles.deckItem}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.cardTitle}>
          {questions.length > 1 || questions.length < 1
            ? `${questions.length} Cards`
            : `${questions.length} Card`}
        </Text>
      </TouchableOpacity>
    );
  
}

const styles = StyleSheet.create({
  deckItem: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: secondaryLight,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primary,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    color: secondary,
  },
});

export default DeckListView;
