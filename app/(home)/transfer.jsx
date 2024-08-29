import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { searchTransferPhone } from "@/lib/Fetcher";
import { router } from "expo-router";
export default function Transfer() {
    const toInput = useRef();
    const amountInput = useRef();
    const noteInput = useRef();
    const [available, setAvailable] = useState("12,543.74");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");

    const search = useMutation(async data => searchTransferPhone(data), {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async (data) => {
            console.log(data);

            // login(data)
            // router.push('/(home)')
        },
    });

    const handleSearchTransferPhone = () => {
        router.push('/(home)/transferamount')
        // if (to != '') {
        //     search.mutate({ to })
        // }
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Please enter phone number"
                ref={toInput}
                value={to}
                onChangeText={setTo}
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Amount"
                ref={amountInput}
                value={amount}
                onChangeText={setAmount}
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
            /> */}
            <TouchableOpacity style={styles.button} onPress={handleSearchTransferPhone}>
                <Text style={styles.buttonText}>Next</Text>
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
        backgroundColor: "#6d25e5",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
});