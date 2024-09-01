import { View, Text, StyleSheet, BackHandler } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from "@expo/vector-icons";
import { router, useNavigation } from 'expo-router';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import { getUserProfileData } from '@/lib/Fetcher';
import { MainContext } from '../provider/AppProvider';

export default function ProfileIndex() {
    const navigation = useNavigation()
    const { userData, setUserData, verifiedData, setVerifiedData } = useContext(MainContext)


    useEffect(() => {
        const backAction = () => {
            // Prevent going back to the welcome screen
            if (navigation.isFocused()) {
                router.push('/(home)/home')
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.divider}>
                    <TouchableOpacity style={styles.item} onPress={() => router.navigate('verification')} disabled={userData.status == 'Unverified' ? false : true}>
                        <Text>Status</Text><View style={userData.status != 'Verified' ? styles.chip.pending : styles.chip.verified}><Text style={styles.chipText}>{userData.status}</Text></View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.divider]}>
                    <TouchableOpacity style={styles.item} onPress={() =>
                        router.navigate('profileupdate')
                    }
                        disabled={userData.status != 'Unverified' ? false : true}
                    >
                        <Text>Profile Photo</Text>
                        <MaterialIcons
                            name="arrow-forward-ios"
                            size={16}
                            color='#ccc'
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.item, styles.divider]}><Text>Full Name</Text><Text>{verifiedData?.gender == 'Male' ? 'Mr. ' : 'Mrs. '} {userData.name}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Phone No.</Text><Text>{userData.phone}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Email</Text><Text>{userData.email}</Text></View>
            </View>
            <View style={styles.container}>
                <View style={[styles.item, styles.divider]}><Text>ID Type</Text><Text>{verifiedData?.id_type}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>ID No.</Text><Text>{verifiedData?.id_no}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Date of Birth</Text><Text>{verifiedData?.dob}</Text></View>
                <View style={styles.item}><Text>Gender</Text><Text>{verifiedData?.gender}</Text></View>
            </View>
            <View style={styles.container}>
                <View style={[styles.item, styles.divider]}><Text>Country</Text><Text>{verifiedData?.country}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>City</Text><Text>{verifiedData?.city}</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Postal Code</Text><Text>{verifiedData?.postal_code}</Text></View>
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