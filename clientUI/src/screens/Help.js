//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



export default function Help({ navigation, route }) {

    const [name, setName] = useState('');
    const [age, setPassword] = useState('');
   

    return (
        <View style={styles.body}>
           
            <Text style={[
                //GlobalStyle.CustomFont
                styles.text
            ]}>
                Welcome to "Discussion App" !
            </Text>
            <Text style={[
                //GlobalStyle.CustomFont,
                styles.text1
            ]}>
                General explanations of this app
            </Text>
        </View>
    )
        }


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 27,
        margin: 10,
        color: '#52a22f',
        fontFamily: 'NanumPenScript-Regular',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 25,
        margin: 10,
        color: '#226d57',
        fontFamily: 'AbrilFatface-Regular',
    },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
    }
})