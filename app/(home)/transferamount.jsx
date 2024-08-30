import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    Alert,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ModalPopUp from './../components/ModalPopUp';
import OtpInput from './../components/OtpInput';
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalSearchParams } from "expo-router";
import { MainContext } from "../provider/AppProvider";
import { useMutation, useQueryClient } from "react-query";
import { transfer } from "@/lib/Fetcher";



const TransferAmount = () => {
    const toInput = useRef();
    const amountInput = useRef();
    const noteInput = useRef();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");
    const [visible, setVisible] = useState(false)
    const [otp, setOtp] = useState('')
    const transferUser = useGlobalSearchParams()
    const { userData } = useContext(MainContext);
    const [available, setAvailable] = useState(`${userData.balance}`);
    const queryClient = useQueryClient();



    const maskNumber = (number) => {
        const maskedSection = number.slice(0, -4).replace(/\d/g, '*');
        const lastFourDigits = number.slice(-4);
        return maskedSection + lastFourDigits;
    };

    const maskedPhoneNumber = maskNumber(transferUser.phone ? transferUser.phone : '0000')

    const handleModal = () => {
        if (amount > userData.balance) {
            return
        }
        setVisible(!visible)
    }

    useEffect(() => {
        console.log(otp);
        if (otp) {
            mutate({ password: otp, senderId: userData.id, recipientId: transferUser.id, amount, note })
        }

    }, [otp])

    const { mutate, isLoading, isError, error } = useMutation(async (data) => {
        return await transfer(data);
    }, {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async (data) => {
            console.log('transferres', data);

            setOtp('')
            setVisible(!visible)
            queryClient.invalidateQueries(['userData'])
            router.push({ pathname: '/(home)/transfersuccess', params: { authId: userData.id, transferData: JSON.stringify(data), recipientData: JSON.stringify(transferUser) } })
        },
    });

    return (
        <View style={styles.container}>
            <ModalPopUp visible={visible} >
                <View style={styles.transfercard}>

                    <View style={styles.divider}>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Ionicons name="close" size={24} color='#ccc' />
                        </TouchableOpacity>
                        <Text style={[styles.modalHeader]}>Enter Password</Text>
                    </View>
                    <View style={[styles.divider, styles.modalBody]}>
                        <Text>Transfer to {transferUser.name}</Text>
                        <Text style={{ fontSize: 40 }}>{amount.toLocaleString()}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <OtpInput
                            length={6}
                            onComplete={(otp) => {
                                setOtp(otp);
                            }}
                        />
                    </View>
                    {isError && <Text style={{ color: 'red', textAlign: 'center' }}>Your password is wrong</Text>}
                    {isLoading && <Text style={{ textAlign: 'center' }}>transfering...</Text>}
                </View>
            </ModalPopUp>
            <View style={styles.card}>
                {transferUser.profile_url ?
                    <Image source={{ uri: transferUser.profile_url }} style={styles.image} />
                    : <FontAwesome name="user-circle" size={50} color="gray" />
                }

                <View style={styles.item}>
                    <Text>{transferUser.name}</Text>
                    <Text> ({maskedPhoneNumber})</Text>
                </View>
            </View>
            <View style={styles.transfercard}>
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    ref={amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.inputDes}
                    onPress={() => {
                        setAmount(available);
                    }}>
                    <Text>Balance: </Text>
                    <Text style={styles.balance}>{available}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Note"
                    ref={noteInput}
                    value={note}
                    onChangeText={setNote}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleModal()}>
                    <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TransferAmount


const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 10,
        marginTop: 10,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 10,
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 10
    },
    item: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    transfercard: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 10,
    },
    input: {
        flexGrow: 1,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    inputDes: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    balance: {
        color: "#0e9ce2",
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        padding: 15,
        backgroundColor: "#6d25e5",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    modalHeader: {
        textAlign: 'center',
        marginBottom: 10
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center'
    }

});