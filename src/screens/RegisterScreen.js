import { StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import React, {useLayoutEffect, useState } from 'react'
import { Button, Input, Text, Image, } from "react-native-elements";
// import { auth } from "../../firebase/config";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import auth from "@react-native-firebase/auth"

export default function RegisterScreen ({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // navigation
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerBackTitle:"Back to Login",
    });
  },[navigation])

  // const register = () => {

  // };
  const register = () => {
    console.log(email, password);
    auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
    const user = userCredential.user;
    user.updateProfile({
      displayName: name,
      photoURL: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    });

    let user_data = {
      user_id: user.uid
    };
    console.log(user_data);
    fetch('https://cs467api.uw.r.appspot.com/users',{
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json, text/plain, */*',
                  },
                  body: JSON.stringify(user_data) 
              }).then(response => response.json()).then((data) => {
                  console.log(data);
              }).catch((error) => {
                  console.error(error);
                });

    })
    .catch((e) => {
      console.log(e);
    });

  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text h3 style={{marginBottom:50}}>
          Create an account
        </Text>
        <View style={styles.inputContainer}>
            <Input 
                placeholder = "nick name" 
                autoFocus 
                type = 'text'
                value={name}
                onChangeText={(text)=>setName(text)}
            />
            <Input 
                placeholder = "email" 
                type = 'email'
                value={email}
                onChangeText={(text)=>setEmail(text)}
            />
            <Input 
                placeholder = "password" 
                type="text"
                value={password}
                onChangeText={(text)=>setPassword(text)}
                onSubmitEditing={register}
            />

        </View>
        <Button
          containerStyle={styles.button}
          raised
          onPress={register}
          title="Register"
        />
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    backgroundColor:"white",
  },
  inputContainer:{
    width:300,
  },
  button:{
    width:200,
    margin:10,
  },
})