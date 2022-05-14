import React, { useState, useEffect } from 'react';
import {
    Button,
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
import FetchExample2 from './fetchExample2';
//https://cs467api.uw.r.appspot.com/

export default function Post1({ }) {
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    //const [password, setPassword] = useState('');


    // const [Items, setItems] = useState([
    //     { key: 1, item: 'How can we save energy?' },
    //     { key: 2, item: 'We cannot support ourselved without nuclear power?' },
    //     { key: 3, item: 'What is wrong with overfishing?' },
    //     { key: 4, item: 'How can we effectively prevent soil erosion?' },
    //     { key: 5, item: 'How severe is the global warming?' },
    //     { key: 6, item: 'We have enough water resource?' },
    //     { key: 7, item: 'The technologies used to predict earthquakes.' },
    //     { key: 8, item: 'How to measure water contamination' },
    //     { key: 9, item: 'Air quality in your area' },
    //     { key: 10, item: 'Major problems with conventional agriculture' },
    //     { key: 11, item: 'The technologies to purify Lake Michigan' },
    //   ]);

    const postNew =  () => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'Accept': 'application/json',},
          body: JSON.stringify({ 
              user_id: '12249',
              title,
              content,
              categories: '7',
              
          })
      }
      fetch('https://cs467api.uw.r.appspot.com/posts', requestOptions)
      .then((response) => response.json())              //response.json()
      .then((response2) => {
        if(response !== undefined || response !== null) {
            console.log('Fetch API POST', response2);
            setContent('');
            setTitle('');
            return response2;
          }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
    }


    return (
        <View style={styles.body} >
            {/*<Image
                style={styles.logo}
                source={require('../../assets/greenplanet.png')}
    />*/}
            <Text style={styles.text}>
                 Topics -- Environment
            </Text>
      
      {/*<ScrollView
               style={styles.bodyP}

  >*/}
      {/* {
        Items.map((object) => {
          return (
            <View  key={object.key}>   
              <TouchableOpacity style={{width: 300, height: 88, backgroundColor: '#90ee90', margin:5}} 
                  onPress={() => 
                    navigation.navigate('Comment Environment')}>
                   <Text style={styles.textP}>{object.item}</Text>     
              </TouchableOpacity>
              
            </View>
          )   //style={styles.itemP}   within <View  Alert.alert('test')
        })
      } */}
    {/*</View></ScrollView> */}
   <FetchExample2/>
    <ScrollView keyboardShouldPersistTaps='handled'>
    <TextInput
        label = "title"
        style={styles.input}
        placeholder='type in a title of your own topic.'
        onChangeText={(value) => setTitle(value)  }
        multiline
      />
    <TextInput
        label = "content"
        style={styles.input}
        placeholder='type in the content of your topic.'
        onChangeText={(value) => setContent(value)  }
        multiline
      />
      </ScrollView>
       <Button
        //onPress={setItems([...Items, {item: comment}])}
        //hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}  //increase touchble areas in view/button
        //android_ripple={{ color: '#00f' }} //blue
        //style={({ pressed }) => [
          //{ backgroundColor: pressed ? '#dddddd' : '#00ff00' }, //light gray    green
          style = {styles.buttonInput}
          title = "Post Your Topic"
         color = '#8ec217'    //#6ddd3d  #739f10
         onPress={() => {
          /* 1. Navigate to the Details route with params */
          //   navigation.navigate('Fetch Example', {
          //   title: title,
          //   content: content,
          // });
          postNew();
        }}
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
    input: {
        width: 300,
        borderWidth: 3,
        borderColor: '#14758a',  //#555  #177a8f
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
      buttonInput: {
        flex: 1,
       // flexDirection: 'row',
        width: 150,
        height: 50,
        margin: 5,
        borderRadius: 5,
        color: '#90ee90',
    },
})