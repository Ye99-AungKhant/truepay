import React, { useContext, useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import Register from './register';
import Welcome from './welcome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeLayout from './(home)/_layout';
import ProfileLayout from './(profile)/_layout';
import { AppProvider, MainContext } from './provider/AppProvider'
import CustomDrawerContent from './components/CustomDrawerContent';

const Stack = createNativeStackNavigator();


export function AppStack() {
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
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="welcome"
        component={Welcome}
        initialParams={{ initialRoute: true }}
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="(home)"
        component={HomeLayout}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="(profile)"
        component={ProfileLayout}
        options={{
          title: 'Profile',
        }}
      />


      <Drawer.Screen
        name="login"
        component={Login}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="register"
        component={Register}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
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

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppStack />
      </AppProvider>
    </QueryClientProvider>
  );
}
