//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    Alert,
    TextInput,
} from 'react-native';
import { Button, ButtonGroup, withTheme} from "@rneui/base";
import CustomButton from '../utils/CustomButton';
import GlobalStyle from '../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/FontAwesome';


export default function Help({ navigation }) {

  const [active, setActive] = React.useState('');

    const [name, setName] = useState('');
    const [age, setPassword] = useState('');
    const [expanded, setExpanded] = React.useState(true);
    const [data1, setData] = useState('');
    const navigation1 = useNavigation();
    const Tab = createBottomTabNavigator();

    const handlePress = () => setExpanded(!expanded);
    const clickedData = (data) => {
      navigation1.navigate('Topics', {data3:data}) //send data about posts to comment page.
   };
  

    return (
     
        <View style={styles.body}>
              <View style={{flexDirection:'row'}}> 
               <Icon1
                         name="comments-o"
                         size={33}
                         color="#99ef74"/>    
           <Text style={[
                //GlobalStyle.CustomFont
                styles.text
            ]}>
                Welcome to "Discussion App" !
            </Text>
               </View>
           
            <Text style={[styles.text2]}> This app allows users to express their opinions on various subjects, remaining 
                anonymous. 
            </Text>
            <Text style={[styles.text2]}>To start, click "Topics" button -- you will
            see a list of general categories of social topics.</Text>
            <Text style={[styles.text2]}> Clicking "All Topics". You will see topics of various
             categories to explore new interests. You will select a favorite category when posting your topic so that
             others having similar interests can easily find yours. 
            </Text>
            <Text style={[styles.text2]}>After selecting your favorite category on the dropdown list, please close it by clicking
            "^" sign.
             After typing in your topic, click your phone's back button to close the keyboard and then hit "Post Your
             Topic" button.</Text>

             <Text style={[styles.text2]}>When you select a specific category, then you will see only related topics.
             Post your favorite topics related to the category.</Text>
             
             <Text style={[styles.text2]}> If you find any topic that interest you, then you can
             click it to see comments related to the topic. Post your comments.  </Text>
             <Text style={[styles.text2]}></Text>
          <ScrollView>
            <Button
              title={'Home'}
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => {
        
                navigation.navigate('Home');
               
             }}
            />
             <Button
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              title="Clear Button"
              type="clear"
              titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
            />
        
    </ScrollView>
    </View>
    
     )
    }


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        margin: 10,
        color: '#52a22f',
        fontFamily: 'NanumPenScript-Regular',
        fontWeight: 'bold',
    },
    text1: {
        fontSize: 25,
        margin: 10,
        color: '#226d57',
        fontFamily: 'AbrilFatface-Regular',
    },
    text2: {
      fontSize: 15,
      margin: 10,
      color: '#226d57',
      fontFamily: 'AbrilFatface-Regular',
      textAlign: 'left',
      marginLeft: 20,
  },
    logo: {
        width: 200,
        height: 100,
        margin: 20,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 130,
        marginBottom: 10,
    }
})