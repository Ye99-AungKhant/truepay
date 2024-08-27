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


export default function Home() {
    const [authId, setAuthId] = useState(null)
    const { userData, setUserData, verifiedData, setVerifiedData } = useContext(MainContext);

    // const { mutate, isLoading } = useMutation(async (data) => {
    //     return await getUserProfileData(data);
    // }, {
    //     onError: async (e) => {
    //         console.log(e);
    //     },
    //     onSuccess: async (userdata) => {
    //         console.log('userdata from server', userdata);
    //         setUserData(userdata)
    //         setVerifiedData(...userdata.userverify)
    //     },
    // });

    useEffect(() => {
        AsyncStorage.getItem('authToken')
            .then(token => {
                if (token) {
                    const decoded = jwtDecode(token);
                    setAuthId(decoded.id)
                } else {
                    console.log('No token found');
                }
            })
            .catch(error => {
                console.error('Error decoding token:', error);
            });
    }, [])

    const { data, error, isLoading } = useQuery(['userData', authId], () => getUserProfileData(authId), {
        onSuccess: (data) => {
            console.log(data);
            setUserData(data)
            setVerifiedData(...data.userverify)
        },
    });


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='light-content' />
            <LinearGradient
                colors={["rgba(0,0,0,0.8)", "transparent"]}
                style={styles.background}
            />

            <View>
                <BalanceCard />
                <View style={styles.actions}>
                    <ActionButton
                        color="#ff009d"
                        icon="compare-arrows"
                        label="Transfer"
                        path="/transfer"
                    />
                    <ActionButton
                        color="#0e9ce2"
                        icon="qr-code-2"
                        label="Scan"
                        path="/scan"
                    />

                    <ActionButton
                        color="#7b48f4"
                        icon="attach-money"
                        label="Fx Rate"
                        path="/fxrate"
                    />
                    <ActionButton
                        color="#ff379e"
                        icon="history"
                        label="History"
                        path="/history"
                    />
                </View>
                <View style={styles.moreActionBar}></View>
                <View style={styles.transactions}>
                    <Text style={styles.text.label}>Recent Transactions</Text>
                    <Transactions />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    menu: {
        marginHorizontal: 20
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        height: 300,
    },
    container: {
        backgroundColor: "#6d25e5",
    },
    actions: {
        paddingTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    moreActionBar: {
        width: 100,
        height: 4,
        backgroundColor: "#ddd",
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 8,
    },
    transactions: {
        padding: 20,
        gap: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#f1f1f1",
    },
    text: {
        label: {
            fontWeight: "bold",
            color: "#aaa",
        },
    },
});   