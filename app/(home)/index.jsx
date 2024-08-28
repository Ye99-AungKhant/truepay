import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    Button,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Transactions from "../components/Transactions";
import ActionButton from "../components/ActionButton";
import BalanceCard from "../components/BalanceCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../provider/AppProvider";
import { getUserProfileData } from "@/lib/Fetcher";
import { Redirect, router, useRouter } from "expo-router";


export default function Home() {

    return (
        <View></View>
    )
    // return <Redirect href="/welcome" />;
}
