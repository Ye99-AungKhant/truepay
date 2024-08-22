import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, TextInput, Button, RadioButton, Text, IconButton } from 'react-native-paper';

const Verification = () => {
    const [gender, setGender] = useState('');
    const [idType, setIdType] = useState('');
    const [idNo, setIdNo] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    return (
        <ScrollView style={styles.container}>
            {/* First Card */}
            <Card style={styles.card}>
                <Card.Title title="Personal Information" />
                <Card.Content>
                    <TextInput
                        label="ID Type"
                        value={idType}
                        onChangeText={setIdType}
                        style={styles.input}
                    />
                    <TextInput
                        label="ID No."
                        value={idNo}
                        onChangeText={setIdNo}
                        style={styles.input}
                    />
                    <TextInput
                        label="Date of Birth"
                        value={dob}
                        onChangeText={setDob}
                        style={styles.input}
                    />

                    <Text style={styles.genderLabel}>Gender</Text>
                    <RadioButton.Group
                        onValueChange={newValue => setGender(newValue)}
                        value={gender}
                    >
                        <View style={styles.radioContainer}>
                            <RadioButton value="male" />
                            <Text>Male</Text>
                        </View>
                        <View style={styles.radioContainer}>
                            <RadioButton value="female" />
                            <Text>Female</Text>
                        </View>
                    </RadioButton.Group>
                </Card.Content>
            </Card>

            {/* Second Card */}
            <Card style={styles.card}>
                <Card.Title title="My Address" />
                <Card.Content>
                    <TextInput
                        label="Country"
                        value={country}
                        onChangeText={setCountry}
                        style={styles.input}
                    />
                    <TextInput
                        label="City"
                        value={city}
                        onChangeText={setCity}
                        style={styles.input}
                    />
                    <TextInput
                        label="Postal Code"
                        value={postalCode}
                        onChangeText={setPostalCode}
                        style={styles.input}
                    />
                </Card.Content>
            </Card>

            {/* Submit Button */}
            <Button mode="contained" style={styles.button} onPress={() => console.log('Form Submitted')}>
                Submit
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,

    },
    card: {
        marginBottom: 16,
        backgroundColor: '#fefefe',
    },
    input: {
        marginBottom: 16,
    },
    genderLabel: {
        marginBottom: 8,
        fontSize: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        marginVertical: 16,
    },
});

export default Verification;
