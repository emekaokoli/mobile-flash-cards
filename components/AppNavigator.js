import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {AddCard} from './AddCard'
import Decks from './Decks';
import {Quiz} from './Quiz'

const HeaderOptions = {
  headerStyle: {
    backgroundColor: 'blue',
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
      <Stack.Navigator screenOptions={HeaderOptions}>
        <Stack.Screen name='Deck' component={Decks} />
        <Stack.Screen name='Add Card' component={AddCard} />
        {/* {(props) => <Restart {...props} />} */}
        <Stack.Screen name='Quiz' component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
