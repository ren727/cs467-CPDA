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

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//     },
//     () => { },
//     error => { console.log(error) }
// );

export default function Topics({ navigation }) {
    const data3 = '52222222';


    const navigatePage = () => {
        navigation.navigate('Posts');
    }
    const navigatePage1 = () => {
        navigation.navigate('Home', {data2:data3});
    }

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

  

    return(
  
    <View style={styles.body}>
           
            <Text style={styles.text}>
                 Topic Categories
            </Text>
           <ScrollView   style={styles.viewbody}>
            <CustomButton3 
                style={styles.button}
                title='All Topics'
                color='#6ddd3d'
                onPressFunction={navigatePage}
               // onPress={() => navigation.navigate('Home')}
            />
            <CustomButton3
                style={styles.button}
                title='Civil Rights'
                color='#6ddd3d'
                onPressFunction={navigatePage1}
            />
            <CustomButton3
                style={styles.button}
                title='Poverty'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            <CustomButton3
                style={styles.button}
                title='Immigration and Migration'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            <CustomButton3
                style={styles.button}
                title='Gender Inequality'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            <CustomButton3
                style={styles.button}
                title='Health Care'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
             <CustomButton3
                style={styles.button}
                title='Child Protection'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
             <CustomButton3
                style={styles.button}
                title='OverPopulation'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
             <CustomButton3
                style={styles.button}
                title='Animal Protection'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            <CustomButton3
                style={styles.button}
                title='Water Resources'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            <CustomButton3
                style={styles.button}
                title='Warfare and Conflicts'
                color='#6ddd3d'
                onPressFunction={navigatePage}
            />
            </ScrollView>
            
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
        fontSize: 22,
        fontWeight: 'bold',
        color: '#52a22f',
        fontFamily: 'NanumPenScript-Regular',
        marginBottom: 55,
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