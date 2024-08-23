import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, TextInput, Button, RadioButton, Text, IconButton } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { MainContext } from '../provider/AppProvider';

const Verification = () => {
    const [gender, setGender] = useState('');
    const [idType, setIdType] = useState('');
    const [idNo, setIdNo] = useState('');
    const [dob, setDob] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const searchParams = useLocalSearchParams();
    const { frontIDImg, setFrontIDImg, backIDImg, setBackIDImg } = useContext(MainContext);

    useEffect(() => {
        if (frontIDImg) {
            console.log('front photo', frontIDImg);

        }
    }, [frontIDImg]);

    return (
        <ScrollView style={styles.container}>

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
                    <Text style={styles.genderLabel}>Upload ID Photo</Text>

                    <View style={styles.uploadIdContainer}>
                        <View>
                            {frontIDImg ? <Image source={{ uri: frontIDImg }}
                                style={styles.uploadImg} /> :
                                <TouchableOpacity onPress={() => router.navigate('cameracomponent')} style={styles.uploadId}>
                                    <Text style={styles.uploadIdText}>+ Upload Front</Text>
                                </TouchableOpacity>
                            }
                            {backIDImg ? <Image source={{ uri: backIDImg }}
                                style={styles.uploadImg} /> :
                                <TouchableOpacity onPress={() => router.navigate('cameracomponent')} style={styles.uploadId}>
                                    <Text style={styles.uploadIdText}>+ Upload Back</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </Card.Content>
            </Card>

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


            <Button mode="contained" style={styles.button} onPress={() => console.log('Form Submitted')}>
                Submit
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
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
    uploadIdContainer: {
        // flexDirection: 'row',
    },
    uploadId: {
        width: '100%',
        marginHorizontal: 2,
        backgroundColor: '#ccc',
        paddingVertical: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 3
    },
    uploadIdText: {
        color: 'gray'
    },
    uploadImg: {
        width: '100%',
        height: 250,
        objectFit: 'contain',
        marginHorizontal: 2,
        backgroundColor: '#ccc',
        marginBottom: 3
    }
});

export default Verification;
