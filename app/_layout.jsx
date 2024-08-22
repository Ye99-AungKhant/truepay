import React, { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import Register from './register';
import Welcome from './welcome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeLayout from './(home)/_layout';
import ProfileLayout from './(profile)/_layout';

const Stack = createNativeStackNavigator();

function AppStack() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#6d25e5',
          elevation: 0,
          shadowOpacity: 0,
        }
      }}
    >
      <Drawer.Screen
        name="(home)"
        component={HomeLayout}
        options={{
          headerTitle: 'Home',
          headerShown: false,
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="(profile)"
        component={ProfileLayout}
        options={{
          title: 'Profile',
        }}
      />
    </Drawer.Navigator>
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   const checkAuthToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('authToken');
  //       setIsAuthenticated(!!token);
  //     } catch (error) {
  //       console.error('Error fetching auth token', error);
  //     }
  //   };

  //   checkAuthToken();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </QueryClientProvider>
  );
}
