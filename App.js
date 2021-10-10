import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';

export default function App() {
  return (
    <SafeAreaProvider>
      <Header
        placement='left'
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View style={styles.container}>
        {/* <StatusBar style='auto' /> */}

        <Text>Blank</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    color:'#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
