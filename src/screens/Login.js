import React, { useState, useEffect } from 'react';
import {
    Button,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Alert,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import CustomButton1 from '../utils/CustomButton1';
import CustomButton2 from '../utils/CustomButton2';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';





export default function Login({ navigation, props, route}) {

    //const [name, setName] = useState('');
    //const [age, setPassword] = useState('');
    const {data2} = route?.params || {};
  
   
    

    const navigatePage = () => {
        navigation.navigate('Help');
    }

    const navigatePage1 = () => {
        navigation.navigate('Topics');
    }
    const navigatePage2 = () => {
        navigation.navigate('Login Screen');
    }

    const navigatePage3 = () => {
        navigation.navigate('Login Screen');
    }
    

    return (
        <View style={styles.body} >
            {/*<Image
                style={styles.logo}
                source={require('../../assets/greenplanet.png')}
    />*/}
            <Text style={styles.textLogo}>
                Cross Platform Discussion App
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
                onPressFunction={navigatePage3}
            />


        
            
            </View>
            
        </View>
    )
}

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
            <Icon
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
})