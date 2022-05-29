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
import FetchExample3 from './fetchExample3';



//https://cs467api.uw.r.appspot.com/

export default function Comments2({props, route }) {
    const [post, setPost] = useState('');
    const [content, setContent] = useState('');
    const [getNewData, setGetNewData]  = useState(false);
    const {data1} = route?.params || {};
    const post_id = data1.id;
    
  
    const postNew =  () => {    
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
          'Accept': 'application/json',},  //    'Accept': 'application/json',

          body: JSON.stringify({ 
              user_id: '5704568633556992',
              post_id,
              content,
              upvote: 2,
              
          })
      }
      fetch('https://cs467api.uw.r.appspot.com/posts/'+ post_id +'/comments', requestOptions)
     
     //.then((response) => console.log(response))
      .then((response) => response.json())              //response.json()
      
      .then((response2) => {
        if(response2 !== undefined || response2 !== null) {
            console.log('Fetch API POST', response2);
            setContent('');   //reset the hooks 
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
                 {data1.title}
            </Text>
      
     
    <View style = {{flex: 7}}>
       <FetchExample3 shouldRefresh={getNewData} dataComment={post_id}/>
     </View>
     <ScrollView keyboardShouldPersistTaps='handled'>
    <View>
      <TextInput
          label = 'Comments'
          value = {content}
          mode = 'flat'
          placeholder='Enter your comment'
          onChangeText = { text => setContent(text)}
          style = {styles.textinput1}
          //multiline
      />
       </View>
   
     
       <Button
        //onPress={setItems([...Items, {item: comment}])}
        //hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}  //increase touchble areas in view/button
        //android_ripple={{ color: '#00f' }} //blue
        //style={({ pressed }) => [
          //{ backgroundColor: pressed ? '#dddddd' : '#00ff00' }, //light gray    green
         
         mode='contained'
         style = {styles.buttonInput}
          title = "Post Your Comment"
         color = 'rgba(78, 116, 289, 1)'    //#6ddd3d  #739f10  #8ec217

     



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
        fontSize: 18,
        color: '#52a22f',
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 22,
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
       // flex: 1,
       // flexDirection: 'row',
        width: 110,
        height: 50,
        margin: 5,
        borderRadius: 5,
    },
     textinput1: {
      flex: 1,
      // flexDirection: 'row',
       width: 300,
       height: 50,
       margin: 5,
     },
     scrollView: {
      flexDirection: 'column',
    
     },
})