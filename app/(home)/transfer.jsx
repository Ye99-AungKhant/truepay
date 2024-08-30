import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { searchTransferPhone } from "@/lib/Fetcher";
import { router } from "expo-router";
export default function Transfer() {
    const transferPhoneInput = useRef();
    const amountInput = useRef();
    const noteInput = useRef();
    const [available, setAvailable] = useState("12,543.74");
    const [transferPhone, setTransferPhone] = useState("");
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");
    const [error, setError] = useState('')

    const { mutate, isLoading } = useMutation(async data => searchTransferPhone(data), {
        onError: async (e) => {
            console.log(e);
            setError('This number is not register')
        },
        onSuccess: async (data) => {
            const routeUrl = router.push({ pathname: `/(home)/transferamount`, params: data })
            console.log('transfer user url', routeUrl);
            return routeUrl
        },
    });

    const handleSearchTransferPhone = () => {
        // router.push('/(home)/transferamount')
        console.log('transferPhone', transferPhone);
        mutate(transferPhone)
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <TextInput
                style={styles.input}
                placeholder="Please enter phone number"
                ref={transferPhoneInput}
                value={transferPhone}
                onChangeText={setTransferPhone}
                keyboardType="numeric"
            />
            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity style={[styles.button, { backgroundColor: transferPhone.length > 10 ? "#6d25e5" : "gray" }]} onPress={handleSearchTransferPhone} disabled={transferPhone.length > 10 ? false : true}>
                <Text style={styles.buttonText}>{isLoading ? <ActivityIndicator size="small" color="white" /> : 'Next'}</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 20,
        marginTop: 10,
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
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    errorText: {
        color: 'red'
    }
});