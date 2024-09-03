import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useGlobalSearchParams } from 'expo-router'
import { useQuery } from 'react-query'
// import { getTransaction } from '@/lib/Fetcher'
import { getTransaction } from "../../lib/Fetcher";
import { MainContext } from '../provider/AppProvider'

const TransferSuccessNoti = () => {
    const transferSuccessData = useGlobalSearchParams()
    const { userData } = useContext(MainContext);
    const authId = userData.id
    const transactionId = transferSuccessData.transactionId
    let recipientData = {}

    const { data, error, isLoading } = useQuery(['getTransaction', transactionId], () => getTransaction(transactionId), {
        enabled: !!transactionId,
        onSuccess: (data) => {
        },
    });

    if (isLoading) {
        return <View style={styles.container}><ActivityIndicator size="small" color="#6d25e5" /></View>
    }

    const date = new Date(data.createdAt);
    const formattedDateTime = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-US')}`;

    if (authId == data.sender_user_id) {
        recipientData = {
            name: data.recipient.name,
            phone: data.recipient.phone
        }
    } else {
        recipientData = {
            name: data.sender.name,
            phone: data.sender.phone
        }
    }
    const maskNumber = (number) => {
        const maskedSection = number.slice(0, -4).replace(/\d/g, '*');
        const lastFourDigits = number.slice(-4);
        return maskedSection + lastFourDigits;
    };

    const maskedPhoneNumber = maskNumber(recipientData.phone)

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.card}>
                <View style={styles.success.header}>
                    <Ionicons name='checkmark-outline'
                        size={40} color='white'
                        style={styles.success.icon}
                    />
                    <Text>Transaction Success</Text>
                    <Text style={{ fontSize: 30 }}>{data.recipient_user_id == authId ? '+' : '-'}{data.amount.toLocaleString()} <Text style={{ fontSize: 15, color: '#454545' }}>(ks)</Text></Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Transaction Date</Text>
                    <Text>{formattedDateTime}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Transaction No.</Text>
                    <Text>{data.transactionId}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Transfer {data.sender_user_id == authId ? 'to' : 'from'}</Text>
                    <Text>{recipientData.name} ({maskedPhoneNumber})</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Amount</Text>
                    <Text>{data.amount.toLocaleString()}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Note</Text>
                    <Text>{data?.note}</Text>
                </View>
            </View>
        </View>
    )
}

export default TransferSuccessNoti

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 5,
    },
    item: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        color: 'gray',
    },
    success: {
        header: { alignItems: 'center' },
        icon: {
            backgroundColor: 'green',
            borderRadius: 20,
        }
    }
})