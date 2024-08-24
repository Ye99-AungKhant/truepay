import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';

export default function ProfileIndex() {

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.divider}>
                    <TouchableOpacity style={styles.item} onPress={() => router.navigate('verification')}>
                        <Text>Status</Text><View style={styles.chip}><Text style={styles.chipText}>Verified</Text></View>
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
                <View style={[styles.item, styles.divider]}><Text>Full Name</Text><Text>Mr. Ye Aung Khant</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Phone No.</Text><Text>09794263094</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Email</Text><Text>yeaungkhant077@gmail.com</Text></View>
                <View style={styles.item}><Text>Gender</Text><Text>Male</Text></View>
            </View>
            <View style={styles.container}>
                <View style={[styles.item, styles.divider]}><Text>ID Type</Text><Text>NRC</Text></View>
                <View style={[styles.item, styles.divider]}><Text>ID No.</Text><Text>0119334</Text></View>
                <View style={[styles.item, styles.divider]}><Text>Date of Birth</Text><Text>12/31/1999</Text></View>
                <View style={styles.item}><Text>Gender</Text><Text>Male</Text></View>
            </View>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={styles.item}>
                        <Text>My Address</Text>
                        <MaterialIcons
                            name="arrow-forward-ios"
                            size={16}
                            color='#ccc'
                        />
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'green',
        borderRadius: 3,
    },
    chipText: {
        paddingHorizontal: 5,
        fontSize: 12,
        color: 'white'
    }

})