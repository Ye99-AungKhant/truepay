import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import { getUserProfileData } from '@/lib/Fetcher';

export default function ProfileIndex() {

    const [userData, setUserData] = useState({
        id: null,
        name: null,
        phone: null,
        email: null,
        status: null,
        userverify: null,
    });
    const [verifiedData, setVerifiedData] = useState({
        id_type: null,
        id_no: null,
        country: null,
        city: null,
        postal_code: null,
        dob: null,
        gender: null,
    })

    const { mutate, isLoading } = useMutation(async (data) => {
        return await getUserProfileData(data);
    }, {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async (userdata) => {
            console.log(...userdata.userverify);
            setUserData(userdata)
            setVerifiedData(...userdata.userverify)
        },
    });

    useEffect(() => {
        AsyncStorage.getItem('authToken')
            .then(token => {
                if (token) {
                    const decoded = jwtDecode(token);
                    mutate(decoded.id)
                    // setUserData(decoded)
                    console.log(decoded);
                } else {
                    console.log('No token found');
                }
            })
            .catch(error => {
                console.error('Error decoding token:', error);
            });

    }, [])


    return (
        <View>
            <View style={styles.container}>
                <View style={styles.divider}>
                    <TouchableOpacity style={styles.item} onPress={() => router.navigate('verification')} disabled={userData.status == 'Pending' ? false : true}>
                        <Text>Status</Text><View style={userData.status != 'Verified' ? styles.chip.pending : styles.chip.verified}><Text style={styles.chipText}>{userData.status}</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.divider]}>
                    <TouchableOpacity style={styles.item}>
                        <Text>Profile Photo</Text>
                        <MaterialIcons
                            name="arrow-forward-ios"
                            size={16}
                            color='#ccc'
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.item, styles.divider]}><Text>Full Name</Text><Text>{verifiedData.gender == 'Male' ? 'Mr. ' : 'Mrs. '} {userData.name}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Phone No.</Text><Text>{userData.phone}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Email</Text><Text>{userData.email}</Text></View>
            </View>
            <View style={styles.container}>
                <View style={[styles.item, styles.divider]}><Text>ID Type</Text><Text>{verifiedData.id_type}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>ID No.</Text><Text>{verifiedData.id_no}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Date of Birth</Text><Text>{verifiedData.dob}</Text></View>
                <View style={styles.item}><Text>Gender</Text><Text>{verifiedData.gender}</Text></View>
            </View>
            <View style={styles.container}>
                <View style={[styles.item, styles.divider]}><Text>Country</Text><Text>{verifiedData.country}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>City</Text><Text>{verifiedData.city}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Postal Code</Text><Text>{verifiedData.postal_code}</Text></View>
                <View style={styles.item}><Text>Gender</Text><Text>{verifiedData.gender}</Text></View>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.item}><Text>Delete Account</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#fefefe',
        paddingHorizontal: 10,
    },
    item: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    chip: {
        verified: {
            backgroundColor: 'green',
            borderRadius: 3,
        },
        pending: {
            backgroundColor: '#f9a609',
            borderRadius: 3,
        }
    },
    chipText: {
        paddingHorizontal: 5,
        fontSize: 12,
        color: 'white'
    }

})