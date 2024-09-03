import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { transactionHistory } from "@/lib/Fetcher";
import { MainContext } from "../provider/AppProvider";
import { useQuery } from "react-query";
import { router } from "expo-router";


export default function Transactions() {

    const { userData } = useContext(MainContext)
    const authId = userData.id

    const { data, error, isLoading } = useQuery(['transactionHistory', authId], () => transactionHistory(authId), {
        enabled: !!authId,
        onSuccess: (data) => {
        },
    })

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDateTime = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-US')}`
        return formattedDateTime
    };

    const handleDetail = (transactionData) => {
        const transferData = transactionData
        if (authId == transactionData.sender_user_id) {
            const recipientData = {
                name: transactionData.recipient.name,
                phone: transactionData.recipient.phone
            }
            // console.log('transaction detail', transferData);
            // console.log('transaction detail', recipientData);
            router.push({
                pathname: '/(home)/transfersuccess',
                params: {
                    authId: userData.id, transferData: JSON.stringify(transferData),
                    recipientData: JSON.stringify(recipientData)
                }
            })
        } else {
            const recipientData = {
                name: transactionData.sender.name,
                phone: transactionData.sender.phone
            }
            router.push({
                pathname: '/(home)/transfersuccess',
                params: {
                    authId: userData.id, transferData: JSON.stringify(transferData),
                    recipientData: JSON.stringify(recipientData)
                }
            })
            // console.log('transaction detail', transferData);
            // console.log('transaction detail', recipientData);
        }
    }

    return (
        <ScrollView>
            {data && data.map(transaction => {
                return (
                    <View style={styles.container} key={transaction.id}>
                        <View style={styles.transaction}>
                            <MaterialIcons
                                name="compare-arrows"
                                size={30}
                                color={
                                    transaction.recipient_user_id === authId ? "green" : "brown"
                                }
                            />
                            <View style={styles.content}>
                                <Text style={styles.text.payment}>
                                    Transfer {transaction.sender_user_id == authId ? `to ${transaction.recipient.name}` : `from ${transaction.sender.name}`}
                                </Text>
                                <Text style={[styles.text.muted, { fontSize: 13 }]}>
                                    {formatDate(transaction.createdAt)}
                                </Text>

                            </View>
                            <View style={styles.amount}>
                                <Text style={{ fontSize: 16 }}>{transaction.recipient_user_id == authId ? '+' : '-'}{transaction.amount.toLocaleString()}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => handleDetail(transaction)}>
                            <View style={styles.detail}>
                                <Text style={styles.text.muted}>Detail</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
    },
    transaction: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    text: {
        payment: {
            fontSize: 15,
        },
        muted: {
            color: "#888",
        },
    },
    content: {
        width: 'auto'
    },
    amount: {
        width: 'auto',
    },
    detail: {
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#888',
    }
});