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

import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';




export default function Help({ navigation }) {

    const [name, setName] = useState('');
    const [age, setPassword] = useState('');
    const [expanded, setExpanded] = React.useState(true);
    const [data1, setData] = useState('');
    const navigation1 = useNavigation();

    const handlePress = () => setExpanded(!expanded);
    const clickedData = (data) => {
      navigation1.navigate('Topics', {data3:data}) //send data about posts to comment page.
   };
   
  
  
    
   

    return (
        <View style={styles.body}>
           
            <Text style={[
                //GlobalStyle.CustomFont
                styles.text
            ]}>
                Welcome to "Discussion App" !
            </Text>
          <ScrollView>
            <Button
              title={'React Native Elements'}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
            
             <Button
              title="Raised Button"
              buttonStyle={{
                borderColor: 'rgba(78, 116, 289, 1)',
              }}
              type="outline"
              raised
              titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
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
             <Button
              title="HOME"
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
          
             <Button
              title="Outline Button"
              buttonStyle={{
                borderColor: 'rgba(78, 116, 289, 1)',
              }}
              type="outline"
              titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
            <Button
              title="Light"
              buttonStyle={{
                backgroundColor: 'rgba(244, 244, 244, 1)',
                borderRadius: 3,
              }}
              containerStyle={{
                height: 40,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ marginHorizontal: 20, color: 'black' }}
            />
        <List.Section title="Accordions">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item"/>
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Choose A Category"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="Music" onPress={() => { }}/>
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
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