import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import { Score } from '../Screens/Score';
import {Deck} from '../Screens/DeckScreen';
import {Quiz} from '../Screens/QuizScreen'
import {ListDecks} from '../Screens/ListDeckScreen';
import { NewCard } from '../Screens/NewCard';
import { NewDeck } from '../Screens/NewDeck';


const HeaderOptions = {
  headerStyle: {
    title: 'Deck List',
    backgroundColor: '#00ccff',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff',
  },
};

export const AppNavigator = () => {
 const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={HeaderOptions} initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Deck}
          options={({ navigation }) => ({
            title: 'Deck List',
            headerStyle: {
              backgroundColor: '#444',
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Button
                title='Add'
                color='#00ccff'
                onPress={() =>
                  navigation.navigate('NewCard')
                }
              />
            ),
          })}
        />
        <Stack.Screen
          name='Deck'
          component={ListDecks}
          options={({ route }) => {
            const deckTitle = route.params.deckTitle
            return {
              title: deckTitle,
              headerStyle: {
                backgroundColor: '#444',
              },
              headerTintColor: '#fff',
            };
          }
          }
        />
        <Stack.Screen
          name='NewCard'
          component={NewCard}
          options={{
            title: 'Add Card',
            headerStyle: {
              backgroundColor: '#444',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name='Quiz'
          component={Quiz}
          options={{
            title: 'Quiz',
            headerStyle: {
              backgroundColor: '#444',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name='Score'
          component={Score}
          options={({ navigation }) => ({
            title: 'Score',
            headerStyle: {
              backgroundColor: '#444',
            },
            headerTintColor: '#fff',
            headerLeft: () => (
              <Button
                title='Deck'
                color='#fff'
                onPress={() => navigation.navigate('Deck')}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
