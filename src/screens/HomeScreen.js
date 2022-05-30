import { StyleSheet, View, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState } from 'react';
import { Button, Input, Text, Image, Avatar, } from "react-native-elements";

import CustomButton from '../utils/CustomButton';
import CustomButton1 from '../utils/CustomButton1';
import CustomButton2 from '../utils/CustomButton2';

// import { AntDesign, SimpleLineIcons} from "react-native-vector-icons";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomListItem from '../components/CustomListItem';
// import {auth, db } from "../../firebase/config";
import auth from '@react-native-firebase/auth';


export default function HomeScreen ({ navigation }) {
    const signOutUser = () => {
        auth().signOut().then( ()=> {
            navigation.replace("Home");})
        

    };
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Casual Talk",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    
                    <TouchableOpacity activeOpacity={0.5}>
                    <Icon name='home' size={24} color="black" />
                </TouchableOpacity>
                </View>
            ),
            headerRight: () => (<View style={{
                flexDirection:"row",
                justifyContent: "space-between",
                width:80,
                marginRight:20,

            }}>
                {/* <TouchableOpacity 
                onPress={()=> navigation.navigate("AddPost")}
                activeOpacity={0.5}>
                    <Icon name='pencil' size={24} color="black" />
                </TouchableOpacity> */}

                <View><Icon name='user' size={16} color="black" /></View>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    
                    <View><Text>{auth()?.currentUser?.displayName}</Text></View>
                        
                    </TouchableOpacity>

            </View>)
        
        });

    }, [navigation]);

    const navigatePage = () => {
        navigation.navigate('Help');
    };

    const navigatePage1 = () => {
        navigation.navigate('Topics');
    };
    const navigatePage2 = () => {
        console.log("Login Button was clicked!")
        navigation.navigate('Login Screen');
    };


    return (
        <SafeAreaView>
            <View style={styles.body} >
            {/*<Image
                style={styles.logo}
                source={require('../../assets/greenplanet.png')}
    />*/}
            <Text style={styles.textLogo}>
                Discussion App 
            </Text>
            <Icon1
                         name="comments-o"
                         size={155}
                         color="#99ef74"/>   


           <View   style={styles.viewbody}>
            <CustomButton 
                style={styles.button}
                title='Help'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            
            <CustomButton1
                style={styles.button}
                title='Topic'
                color='#6ddd3d'
                onPressFunction={navigatePage1}

               
            />
            <CustomButton2
                style={styles.button}
                title='Login'
                color='#6ddd3d'
                onPressFunction={navigatePage2}
            />
            </View>
        </View>
        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        //flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    text: {
        fontSize: 33,
        color: '#ffffff',
        marginBottom: 150,
        
    },
    textLogo: {
        fontSize: 27,
        color: 'green',
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 70,
        marginTop: 30,
        fontWeight: 'bold',
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
    },
    button: {
        flex: 1,
       // flexDirection: 'row',
        width: 150,
        height: 150,
        marginTop: 80,
        margin: 20,
        icon: 
            <Icon2
              name="questioncircleo"
              size={30}
              color="black"
            />,
    },
    button1: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
      },

    viewbody: {
        flexDirection: 'row',
    }
});