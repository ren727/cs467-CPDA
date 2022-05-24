import React, { useState, useEffect } from 'react';
import {
    Button,
    TouchableOpacity,
    ScrollView,
    View,
    StyleSheet,
    Image,
    Text,
    Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import CustomButton from '../utils/CustomButton';
import CustomButton3 from '../utils/CustomButton3';
import FetchExample2 from './fetchExample2';
import DropDownPicker from 'react-native-dropdown-picker';

//https://cs467api.uw.r.appspot.com/

export default function Post1({ }) {
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [getNewData, setGetNewData]  = useState(false);
  
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
        if(response2 !== undefined || response2 !== null) {
            console.log('Fetch API POST', response2);
            setContent('');   //reset the hooks  
            setTitle('');
            setGetNewData(true);
            setTimeout(() => setGetNewData(false), 300)
           
            return response2;
          }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
    }

    return (
        <View style={styles.body} >
      
            <Text style={styles.text}>
                 Topics -- All Topics
            </Text>
      
     
    <View style = {{flex: 7}}>
       <FetchExample2 shouldRefresh={getNewData}/>
     </View>
     <ScrollView keyboardShouldPersistTaps='handled'>
    <View>
      <TextInput
          label = 'Title'
          value = {title}
          mode = 'outlined'
          onChangeText = { text => setTitle(text)}
          style = {styles.textinput1}
      />
       <TextInput style = {{ margin:10  }}
          label = "Content"
          value = {content}
           mode = 'outlined'
          // multiline
           //numberOfLines = {5}
           onChangeText = {text => setContent(text)}
           style = {styles.textinput1}
        />
       </View>
   
     
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
         ///* 1. Navigate to the Details route with params ///
          //   navigation.navigate('Fetch Example', {
          //   title: title,S
          //   content: content,
          // });
          postNew();
        // callFetchExample();
        }}>
      
         
      </Button> 
      </ScrollView> 
    {/**/}
      
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
        fontSize: 22,
        color: '#52a22f',  //#50bf9e  #6ddd3d  #518524
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 55,
        fontWeight: 'bold',
    },
    input: {
        width: 300,
        borderWidth: 3,
        borderColor: '#14758a',  //#555  #177a8f
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 5,
        marginTop:10,
    },
    input1: {
      width: 300,
      borderWidth: 3,
      borderColor: '#14758a',  //#555  #177a8f
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      //marginBottom: 10,
    
  },
    button: {
        flex: 1,
       // flexDirection: 'row',
        width: 250,
        height: 70,
        margin: 15,
        marginTop: 5
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
     textinput1: {
      flex: 1,
      // flexDirection: 'row',
       width: 270,
       height: 50,
       margin: 5,
     },
     scrollView: {
      flexDirection: 'column',
    
     },
})