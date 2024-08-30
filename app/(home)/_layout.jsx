import React, { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import Transfer from './transfer';
import Scan from './scan';
import FxRate from './fxrate';
import History from './history';
import TransferAmount from './transferamount';
import TransferSuccess from './transfersuccess';

const HomeLayout = ({ navigation }) => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ headerShown: false, title: "Home" }}
            />
            <Stack.Screen
                name="transfer"
                component={Transfer}
                options={{ title: "Transfer" }}
            />
            <Stack.Screen
                name="transferamount"
                component={TransferAmount}
                options={{ title: "Transfer" }}
            />
            <Stack.Screen
                name="transfersuccess"
                component={TransferSuccess}
                options={{ title: "Transfer" }}
            />
            <Stack.Screen
                name="scan"
                component={Scan}
                options={{ title: "Scan" }}
            />
            <Stack.Screen
                name="fxrate"
                component={FxRate}
                options={{ title: "Exchange Rate" }}
            />
            <Stack.Screen
                name="history"
                component={History}
                options={{ title: "History" }}
            />
        </Stack.Navigator>
    )
}

export default HomeLayout