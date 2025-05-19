import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EntryScreen from './screens/EntryScreen';
import MainNavigator from './navigation/MainNavigator';

// Inicializa o navegador de pilha
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Entry"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Entry" component={EntryScreen} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}