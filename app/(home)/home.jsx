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
    ActivityIndicator,
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
import { router, useNavigation, useRouter } from "expo-router";
import { usePushNotifications } from "@/usePushNotifications";

export default function Home() {
    const [authId, setAuthId] = useState(null)
    const { isAuthenticated, setIsAuthenticated, userData, setUserData, verifiedData, setVerifiedData } = useContext(MainContext);
    const navigation = useNavigation()
    const { notification } = usePushNotifications();
    const expopushdata = JSON.stringify(notification, undefined, 2)
    console.log('expopushdata', expopushdata)

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    return router.push('/welcome')
                }
                const decoded = jwtDecode(token)
                setAuthId(decoded.id)
                console.log(decoded.id);
            } catch (error) {
                console.error('Error fetching auth token home', error);
            }
        };
        checkAuthToken();

    }, [isAuthenticated]);

    const { data, error, isLoading } = useQuery(['userData', authId], () => getUserProfileData(authId), {
        enabled: !!authId,
        onSuccess: (data) => {
            console.log(data);
            setUserData(data)
            setVerifiedData(...data.userverify)
        },
    });


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={["rgba(0,0,0,0.5)", "transparent"]}
                style={styles.background}
            />

            <View>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menu}>
                    <MaterialIcons
                        name="menu"
                        size={25}
                        color='white'
                    />
                </TouchableOpacity>
                <BalanceCard balance={userData.balance.toLocaleString()} />

                {userData.status != 'Verified'
                    ?
                    <View style={[styles.actions, { justifyContent: 'center' }]}>
                        <Text style={{ color: 'white' }}>
                            {userData.status == 'Unverified' ? 'You need to verify. Go to status of profile' :
                                `Your verification process is ongoing...${'\n'} We will complete within 24 hours.`
                            }
                        </Text>
                    </View>
                    :
                    <View style={styles.actions}>
                        <ActionButton
                            color="#ff009d"
                            icon="compare-arrows"
                            label="Transfer"
                            path="/transfer"
                        />
                        <ActionButton
                            color="#0e9ce2"
                            icon="qr-code-scanner"
                            label="Scan"
                            path="/scan"
                        />
                        <ActionButton
                            color="#93E0EC"
                            icon="qr-code-2"
                            label="Receive"
                            path="/receive"
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
                }
                <View style={styles.moreActionBar}></View>
                <View style={styles.transactions}>
                    <Text style={styles.text.label}>Recent Transactions</Text>
                    <Transactions />
                </View>
            </View>
            {isLoading && <View style={styles.loadingOverlay}><ActivityIndicator size="large" color="#6d25e5" /></View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    menu: {
        marginHorizontal: 20,
        marginVertical: 30
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        height: 500,
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
        height: 500,
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});   