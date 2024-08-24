import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import { Card, TextInput, Button, RadioButton, Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MainContext } from '../provider/AppProvider';
import { Picker } from '@react-native-picker/picker';
import CountryList from './../../lib/CountryList';
import { useMutation } from "react-query";
import { verifyUserData } from '@/lib/Fetcher';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = () => {
    const [idType, setIdType] = useState('');
    const [idNo, setIdNo] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('Myanmar');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const { frontIDImg, setFrontIDImg, backIDImg, setBackIDImg } = useContext(MainContext);
    const [date, setDate] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [submitBtnDisable, setSubmitBtnDisable] = useState(true)
    let authUserId

    AsyncStorage.getItem('authToken')
        .then(token => {
            if (token) {
                const decoded = jwtDecode(token);
                authUserId = decoded.id
                console.log(decoded);
            } else {
                console.log('No token found');
            }
        })
        .catch(error => {
            console.error('Error decoding token:', error);
        });



    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            setShowDatePicker(false)
            const currentDate = selectedDate
            setDate(currentDate)
            setDob(currentDate.toLocaleDateString())
        } else {
            setShowDatePicker(false)
        }
    }

    useEffect(() => {
        const isValid = idType && idNo && gender && dob && frontIDImg && backIDImg && country && city && postalCode
        if (isValid) {
            setSubmitBtnDisable(false)
        }
    }, [idType, idNo, gender, dob, frontIDImg, backIDImg, country, city, postalCode])

    const { mutate, isLoading } = useMutation(async (data) => {
        await verifyUserData(data);
    }, {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async (data) => {
            router.push('/(profile)')
        },
    });

    const handleSubmit = () => {
        console.log('submitl');
        mutate({ authUserId, idType, idNo, gender, dob, frontIDImg, backIDImg, country, city, postalCode })
    }

    return (
        <>
            <ScrollView style={styles.container}>

                <Card style={styles.card}>
                    <Card.Title title="Personal Information" />
                    <Card.Content>
                        <Text style={styles.genderLabel}>ID Type</Text>
                        <RadioButton.Group
                            onValueChange={newValue => setIdType(newValue)}
                            value={idType}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton value="NRC" />
                                <Text>NRC</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="Passport" />
                                <Text>Passport</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="Driver license" />
                                <Text>Driver license</Text>
                            </View>
                        </RadioButton.Group>
                        <TextInput
                            label="ID No."
                            value={idNo}
                            onChangeText={setIdNo}
                            style={styles.input}
                        />
                        <Pressable onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                label="Date of Birth"
                                value={dob}
                                onChangeText={setDob}
                                style={styles.input}
                                editable={false}
                            />
                        </Pressable>
                        {showDatePicker &&
                            <DateTimePicker
                                mode={'date'}
                                display={'spinner'}
                                value={date || new Date()}
                                onChange={onChange}
                            />
                        }

                        <Text style={styles.genderLabel}>Gender</Text>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(newValue, itemIndex) =>
                                setGender(newValue)
                            }>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>

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
                        <Text style={styles.genderLabel}>Country</Text>
                        <Picker
                            selectedValue={country}
                            onValueChange={(newValue, itemIndex) =>
                                setCountry(newValue)
                            }>
                            {CountryList.map((list) => <Picker.Item label={list.name} key={list.code} value={list.name} />)}
                        </Picker>

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
                            keyboardType='numeric'
                        />
                    </Card.Content>
                </Card>

                <Button mode='contained' style={styles.button} onPress={submitBtnDisable ? '' : handleSubmit} disabled={submitBtnDisable}>
                    <Text style={{ color: "white" }}>Submit</Text>
                </Button>
            </ScrollView>

            {isLoading && <View style={styles.loadingOverlay}><ActivityIndicator size="large" color="#6d25e5" /></View>}
        </>
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
        paddingHorizontal: 16,
        paddingTop: 16,
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
        marginBottom: 20,
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

export default Verification;
