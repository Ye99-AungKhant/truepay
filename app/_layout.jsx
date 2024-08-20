import React, { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import Register from './register';
import Welcome from './welcome';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="transfer"
        options={{ title: "Transfer" }}
      />
      <Stack.Screen
        name="scan"
        options={{ title: "Scan" }}
      />
      <Stack.Screen
        name="fxrate"
        options={{ title: "Exchange Rate" }}
      />
      <Stack.Screen
        name="history"
        options={{ title: "History" }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={Welcome}
        options={{ headerShown: false, title: "Welcome" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false, title: "Login" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false, title: "Register" }}
      />
    </Stack.Navigator>
  );
}

export const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Error fetching auth token', error);
      }
    };

    checkAuthToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </QueryClientProvider>
  );
}
