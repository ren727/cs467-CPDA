import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { Button, Input, Image, } from "react-native-elements";
import Header from "../components/Header";

// import { auth } from "../../firebase/config";
// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import auth from '@react-native-firebase/auth';

export default function LoginScreen2({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(()=>{ 
        const unsubscribe = auth().onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                const uid = authUser.uid;
                console.log(uid);
                navigation.replace("Home")

            }
        });
        return unsubscribe;
      },[]);
    console.log(email);
    console.log(password);

    const signIn = () => {
        try {
          let response = auth().signInWithEmailAndPassword(email, password);
          if (response && response.user) {
            Alert.alert("Success ✅", "Authenticated successfully")
          }
        } catch (e) {
          console.error(e.message)
        }
      };

    return (
    <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
        <Header />
        {/*<Image 
        //source={require("../../assets/funpic.jpeg")} 
        style={{width:100, height:100}}
    />*/}
        <View style={styles.inputContainer}>
            <Input 
                placeholder='Email' 
                autoFocus 
                type="email" 
                value={email} 
                onChangeText={(text) => setEmail(text)}
            />
            <Input 
                placeholder='Password' 
                secureTextEntry 
                type="password" 
                value={password} 
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
            />
        </View>

        <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
        <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register"/>
        <View style={{height:50}}/>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        padding: 10,

    },
    inputContainer:{
        width:300,


    },
    button:{
        width:200,
        marginTop:10,

    },
})