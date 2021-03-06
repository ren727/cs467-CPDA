import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
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
import fetchExample from './fetchExample';

import SQLite from 'react-native-sqlite-storage';
import { FlatList } from 'react-native-gesture-handler';
import FetchExample from './fetchExample';
import { Button, ButtonGroup, withTheme} from "@rneui/base";
import { NavigationContainerRefContext } from '@react-navigation/native';
import { Divider } from "react-native-elements";



export default function Topics({ navigation, route }) {
   
     //const {data3} = route?.params || {};

    const navigatePage = () => {
        navigation.navigate('Posts');
    }
    const navigatePage1 = () => {
        navigation.navigate('Home', {data2:data3});
    }

    const [data4, setData] = useState([]);
    const [data5, setDataSecond] = useState(''); 
    const [isLoading, setLoading] = useState(true);
    const [user1, setUser] = useState([]);

    const getCategories = async () => {
        try {
        // const response = await fetch('https://cs467api.uw.r.appspot.com/posts?limit=30&offset=10');
        //https://cs467api.uw.r.appspot.com/users?email=john@cheese.com   example-- a call with email 
          const response = await fetch('https://cs467api.uw.r.appspot.com/categories', {method: 'GET'});
  
         const json = await response.json();
         console.log(json, 'json here, testing')
         //const parsedData = JSON.parse(json); 
         setDataSecond(json.categories);  
       } catch (error) {
          console.error(error, 
           );
       } finally {
         setLoading(false);
       }
    }

    const getUsers = async () => {
        try {
        // const response = await fetch('https://cs467api.uw.r.appspot.com/posts?limit=30&offset=10');
        //https://cs467api.uw.r.appspot.com/users?email=john@cheese.com   example-- a call with email 
          const response = await fetch('https://cs467api.uw.r.appspot.com/users/6306989604864000', {method: 'GET'});
  
         const json = await response.json();
         console.log(json, 'json here, testing')
         //const parsedData = JSON.parse(json); 
         setDataSecond(json.output);  
       } catch (error) {
          console.error(error, 
           );
       } finally {
         setLoading(false);
       }
    }

    const postUser =  () => {    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept': 'application/json',},
            body: JSON.stringify({ 
                email: 'abc@gmail.com',
                
            })
        }
        fetch('https://cs467api.uw.r.appspot.com/users', requestOptions)
        .then((response) => response.json())              //response.json()
        .then((response2) => {
          if(response2 !== undefined || response2 !== null) {
              console.log('Fetch API POST', response2);
              //setContent('');   //reset the hooks  
              //setTitle('');
              //setGetNewData(true);
              //setTimeout(() => setGetNewData(false), 300)
             
              return response2;
            }
        })
        .catch((error) => {
          console.log(error, 'error');
        });
      }

      useEffect(() => {
        console.log('fetching')
       
      }, [ ]);
  

    return(
  
    <View style={styles.body}>
           
            <Text style={styles.text}>
                 Topic Categories 
            </Text>
            <Divider
                style={{ width: "80%", margin: 20, marginTop: 5,  }}
                color="green"
                insetType="left"
                subHeader="Click one of the categories. You can scroll down the list."
                subHeaderStyle={{color: 'green', fontSize: 15}}
                width={1}
                orientation="horizontal"
            />
    <ScrollView   style={styles.viewbody}>
       <Button 
                title="All Topics"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                   // alignLeft: 20,
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
        
           navigation.navigate('Posts');
          //setTimeout(() => console.log(data5, 'to be sent'), 400);
           //console.log(data5);
        // callFetchExample();
        }}>
      </Button> 
   
    
           <Button 
                title="Video Games"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                   // alignLeft: 20,
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
        
           navigation.navigate('Posts for Selected Category', {name:'Video Games', id:4854984910831616 });
        
        }}>
      </Button> 

      <Button 
                title="Sports"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'Sports', id:5136459887542272 });
        
          //postNew();
        
        }}>
      </Button> 
      <Button 
                title="Music"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
      
            navigation.navigate('Posts for Selected Category', {name:'Music', id:5150736895705088 });
       
        }}>
      </Button> 

      <Button 
                title="Movies & TV"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
           
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'Movies & TV', id:5678927947235328 });
        
        }}>
      </Button> 
      <Button 
                title="Politics & News"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'Politics & News', id:5699409840963584 });
        
        }}>
      </Button> 
      <Button 
                title="Science & Technology"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'Science & Technology', id:5713686849126400 });
        
        }}>
      </Button> 
      <Button 
                title="General Discussion"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'General Discussion', id:5980884817674240 });
        
        }}>
      </Button> 
      <Button 
                title="Health & Fitness"
                icon={{
                    name: 'comment-alt',
                    type: 'font-awesome-5',
                   size: 15,
                   color: 'white',
                   marginRight: 5,
                    
                   }}
                 buttonStyle={{
                 backgroundColor: 'rgba(78, 116, 289, 1)',
                 borderRadius: 3,
              }}
              containerStyle={{
                width: 330,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              raised
          
       
           onPress={() => {
            navigation.navigate('Posts for Selected Category', {name:'Health & Fitness', id:6262359794384896 });
        
        }}>
      </Button> 
      </ScrollView>
      <Button
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 15,
                color: 'rgba(78, 116, 289, 1)',
              }}
              title="HOME"
              type="clear"
              titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              onPress={() => {
        
                navigation.navigate('Home');
               
             }}
            />
            
        </View>
        
    );
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
        fontSize: 17,
        fontWeight: 'bold',
        color: '#52a22f',
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 14,
        marginTop: 22,
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

    viewbody: {
        flexDirection: 'column',
    }
})