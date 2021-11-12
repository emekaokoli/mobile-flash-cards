import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DeckHome } from '../Screens/DeckHome';
import { AddNewDeck } from '../Screens/AddNewDeck';
import { Ionicons } from '@expo/vector-icons';



export const AppHome = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Quiz Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === 'Add Deck') {
            iconName = focused
              ? 'ios-add-circle-sharp'
              : 'ios-add-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName='Home'
    >
      <Tab.Screen
        name='Quiz Home'
        component={DeckHome}
        options={{ tabBarLabel: 'Home!' }}
      />
      <Tab.Screen
        name='Add Deck'
        component={AddNewDeck}
        options={{ tabBarLabel: 'AddDeck' }}
      />
    </Tab.Navigator>
  );
};
