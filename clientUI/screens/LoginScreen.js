import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import CustomButton3 from '../utils/CustomButton3';
import SQLite from 'react-native-sqlite-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

export default function LoginScreen({ navigation, route }) {

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

   // useEffect(() => {
       // createTable();
        //getData();
    //}, []);

    // const createTable = () => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "CREATE TABLE IF NOT EXISTS "
    //             + "Users "
    //             + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Password INTEGER);"
    //         )
    //     })
    // }

    // const getData = () => {
    //     try {
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "SELECT Username, Password FROM Users",
    //                 [],
    //                 (tx, results) => {
                
    //                 }
    //             )
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const setData = async () => {
            try {
                // var user = {
                //     Name: name,
                //     Password: password
                // }
                await db.transaction(async (tx) => {
                    
                    await tx.executeSql(
                        "INSERT INTO Users (Username, Password) VALUES (?,?)",
                        [username, password]
                    );
                })
                //navigation.navigate('Home');
            } catch (error) {
                console.log(error);
            }
        }
    

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../../assets/greenplanet.png')}
            />
            <Text style={styles.text}>
                   Log in
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Please enter your username'
                //onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Please enter your password'
                //onChangeText={(value) => setPassword(value)}
            />
            <CustomButton3
                title='Login'
                color='#6ddd3d'
                //onPressFunction={setData}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 40,
        color:'#50bf9e',
        marginBottom: 80,
        fontFamily: 'NanumPenScript-Regular',
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    }
})