import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
export default function BalanceCard({ balance }) {
    const [balanceVisible, setBalanceVisible] = useState(false);

    const handleBalanceVisible = () => {
        setBalanceVisible(!balanceVisible)
    }

    return (
        <View style={styles.banner}>
            <View style={styles.header}>
                <Text style={styles.text.label}>Balance</Text>
                <MaterialIcons
                    name={balanceVisible ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="#fff"
                    onPress={handleBalanceVisible}
                />
            </View>

            <View style={styles.balance}>
                <Text style={styles.text.label}>ks</Text>
                <Text style={styles.text.amount}>{balanceVisible ? balance : '*****'}</Text>
            </View>
            {/* <View style={styles.balanceGrowth}>
                <Text style={styles.text.growth}>+520 Today</Text>
            </View> */}
        </View>
    );
}


const styles = StyleSheet.create({
    banner: {
        padding: 30,
        paddingTop: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#6d25e5",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    balance: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    balanceGrowth: {
        alignItems: "flex-end",
        paddingTop: 10,
    },
    text: {
        label: {
            fontWeight: "bold",
            color: "#aaa",
        },
        amount: {
            fontWeight: "bold",
            fontSize: 40,
            color: "#fff",
        },
        growth: {
            color: "#6f6",
        },
    },
});
