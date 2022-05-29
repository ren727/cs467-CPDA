import React, { useState, useEffect } from 'react';
import {
    Button,
    Pressable,
    TouchableOpacity,
    ScrollView,
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


export default function Comment1({ navigation }) {
    const [comment, setComment] = useState('');
   // const [age, setPassword] = useState('');
   

    const [Items, setItems] = useState([
        { key: 1, item: 'I guess we can cut back on utitlity use.' },
        { key: 2, item: 'We can use solar energy' },
        { key: 3, item: 'solar power?' },
        { key: 4, item: 'Hydropower plants' },
        { key: 5, item: 'Stores can close earlier.' },
        { key: 6, item: 'Set your devices to a saving mode.' },
        { key: 7, item: 'unplug your devices when not in use.' },
        { key: 8, item: 'what else?' },
       
      ]);

      var initialArray = ["I guess we can cut back on utitlity use.", "We can use solar energy", "solar power?"];

      const[InputData, setInputData] = useState('');

      const addItems2 = () => {
          initialArray.push(InputData.toString());
          //console.log(initialArray);
      }
     
      
      const addItems = () => {
        //const arr = [...Items];
        //arr.push(comment);
        const adding_key = Items.length + 1;
    
        setItems([...Items, { key: adding_key, item: 'hello'}]);
        //const arr = [...Items];
        //arr.push({item:comment});
        //setItems(arr);
        //displayItems;
        //console.log(adding_key);
        //console.log(comment);
        //console.log(Items);
      };

    // const displayItems = () => {
        
    //         Alert.alert("You entered the value"),
        
    // };

    return (
        <View style={styles.body} >
            <Image
                style={styles.logo}
                source={require('../../assets/greenplanet.png')}
            />
            <Text style={styles.text}>
                 Comments -- Environment
            </Text>
            <ScrollView
               style={styles.bodyP}

    >
      {
        Items.map((object) => {
          return (
            <View  key= {object.key} >   
              <TouchableOpacity style={{width: 300, height: 88, backgroundColor: '#c6f8fd', margin:5} } 
                 // onPress={() => 
                   // navigation.navigate('Home')}    #fcecb4
             >
                   <Text style={styles.textP}>{object.item}</Text>     
              </TouchableOpacity>
              
            </View>
          )   //style={styles.itemP}   within <View  Alert.alert('test')
        })
      }
    </ScrollView>
    <TextInput
        style={styles.input}
        placeholder='Type in your comment.'
        onChangeText={(value) => setInputData(value)}
        multiline
      />
       <Button
        //onPress={setItems([...Items, {item: comment}])}
        //hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}  //increase touchble areas in view/button
        //android_ripple={{ color: '#00f' }} //blue
        //style={({ pressed }) => [
          //{ backgroundColor: pressed ? '#dddddd' : '#00ff00' }, //light gray    green
          style = {styles.buttonInput}
          title = "Post Comment"
          color = '#9dff2f'
          onPress={addItems2}
      >
         
      </Button> 
      
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
        fontSize: 40,
        color: '#50bf9e',
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 55,
    },
    text1: {
        fontSize: 22,
        color: '#004d4d',
        //fontFamily: 'AbrilFatface-Regular',
        marginBottom: 20,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
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
        width: 250,
        height: 70,
        margin: 15.
    },
    buttonInput: {
        flex: 1,
       // flexDirection: 'row',
        width: 150,
        height: 50,
        margin: 5,
        borderRadius: 5,
    },

    viewbody: {
        flexDirection: 'column',
    },
    bodyP: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      },
    itemP: {
        margin: 10,
        backgroundColor: '#90ee90',   //#4ae1fa  #90ee90  #9dff2f
        justifyContent: 'center',
        alignItems: 'center',
      },
      textP: {
        color: '#004d4d',  //#50bf9e   #008b8b
        fontSize: 20,
       // fontStyle: 'regular',
        margin: 10,
      },
})