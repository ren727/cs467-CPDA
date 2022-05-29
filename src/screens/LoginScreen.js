import React, { useState, useEffect, useCallback } from 'react';
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

import FetchExample from './fetchExample';
import fetchExample2 from './fetchExample2';
import FetchExample2 from './fetchExample2';
//https://cs467api.uw.r.appspot.com/users

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

    // post is to create
    // get is retrieve

    // login function
    const getUserWithEMailOnServer = useCallback(async () => {

        // we are using /users to hit the @app.route('/users')
        const resposne = fetch(`https://cs467api.uw.r.appspot.com/users`, {
            // get here to get a user with this username
            method: "POST",
            body: JSON.stringify({ email: username })
        })
        if (resposne.ok) {
            // could not reach the url
            return;
        }
        //The json() method of the Response interface takes a Response stream and reads it to completion.
        // It returns a promise which resolves with the result of parsing the body text as JSON. 
        const data = await  resposne.json();
        const { email, created_at, vote_score, posts, tags, id } = data;
        /// save the data in to sql database.
    }, [username]);

    // Ask this question
    // what route do we call with fetch that allows
    // use(react-native) to get a user with a given email
    
    
    // This is an example of how to use "POST" for posts function
    // const createPostOnServer = useCallback(async () => {
    //     const resposne = fetch("https://cs467api.uw.r.appspot.com/post", {
    //         // create a post
    //         method: "POST"
    //         body: JSON.stringify({ 
    //             user_id: "",
    //             title: "", 
    //             content: "",
    //             categories: []
    //          })
    //     })
    //     if (resposne.ok) {
    //         // could not reach the url
    //         return;
    //     }
    //     const data = await  resposne.json();
    //     const {  } = data;
    // }, []);
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

  //  const setData = async () => {
    //        try {
                // var user = {
                //     Name: name,
                //     Password: password
                // }
      //          await db.transaction(async (tx) => {
                    
        //            await tx.executeSql(
          //              "INSERT INTO Users (Username, Password) VALUES (?,?)",
            //            [username, password]
              //      );
               // })
                //navigation.navigate('Home');
            //} catch (error) {
              //  console.log(error);
            //}
        //}
    

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
                label = "Login"
                style={styles.input}
                placeholder='Please enter your username or email'
                onChangeText={(value) => setName(value)}
            />
            
            <CustomButton3
                title='Login'
                color='#6ddd3d'
               // onPressFunction={getUserEithEMailOnServer}
            />
            <FetchExample2/>
            
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