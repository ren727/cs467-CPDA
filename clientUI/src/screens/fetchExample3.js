import React, { useEffect, useState } from 'react';
import { ActivityIndicator, 
         Route,
         TouchableOpacity,
         FlatList, 
         StyleSheet,
         Text, 
         View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button, Card} from 'react-native-paper';


export default function FetchExample3 ({navigation, route, shouldRefresh }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Items, setItems] = useState([]);

   //const { title } = route.params;
  //const { title } = route?.params || {};
  //const { content } = route.params;
  //const { content } = route?.params || {};

   const getPosts = async () => {
      try {
      // const response = await fetch('https://cs467api.uw.r.appspot.com/posts?limit=30&offset=10');
      //https://cs467api.uw.r.appspot.com/users?email=john@cheese.com   example-- a call with email 
        const response = await fetch('https://cs467api.uw.r.appspot.com/comments?limit=50', {method: 'GET'});

       const json = await response.json();
      // console.log(json, 'json here')
       setData(json.posts);  
     } catch (error) {
        console.error(error, 
         );
     } finally {
       setLoading(false);
     }
  }

  const postNew =  () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Accept': 'application/json',},
        body: JSON.stringify({ 
            user_id: '12249',
            title,  //not do  title: title  
           // key: value - title,
            content,
            categories: '7',
            
        })
    }
    fetch('https://cs467api.uw.r.appspot.com/comments', requestOptions)
    .then((response) => response.json())              //response.json()
    .then((json) => {
        console.log('Fetch API POST', json.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }


 const deletePost =  () => {
  const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
                  'Accept': 'application/json',
    },
  };

  fetch('https://cs467api.uw.r.appspot.com/posts/5658646574792704', requestOptions)
  .then(response => response.ok)
  .catch((error) => {
      console.error(error);
    });
 }

 const deleteData = (data) => {
  fetch('https://cs467api.uw.r.appspot.com/comments/' + data.id, {
     method: 'DELETE',
     headers: {
        'Content-Type' : 'application/json'
     }
  })
   .then(data => {
      // navigation.navigate('Post1')
     })
  }
  
  const clickedData = (data) => {
    navigation.navigate('Comment Page', {data:data})
 }
  const renderData = (item) => {
    return (
       <Card style = {styles.renderStyle}>
          <Text style = {{fontSize : 20}} onPress = {() =>
           clickedData(item)}> {item.title}</Text>
          <Text>{item.content}</Text>
       </Card>
    )
 }
  

  useEffect(() => {
    console.log('fetching')
    getPosts();
    //postNew();
   // console.log("deleting post")
     //deletePost();
    //return () => {
     //setData({}); // Do not use it unless you understand how this works. After the parent component unmounts, this runs.
     //};
  }, [shouldRefresh == true, ]);

  // console.log(data," this is data")
  //return null;
  return(
    <View>
      <ScrollView style = {styles.scrollView}> 
      {
        (data || []).map((object, id) => {   // map(object, id) view's attribute style={{ flex: 1, padding: 24 }}   below style = {{height:100}}
          // console.log(object);
          return (
            
              <TouchableOpacity  key={id} style={{width: 300, height: 88, backgroundColor: '#90ee90', margin:5}} 
                  >
                   <Text  style={{fontSize: 15, fontWeight: 'bold'}}>{object.title}</Text> 
                   <Text  style={{paddingTop:5}}>{object.content}</Text> 
                   <Button 
                      icon = 'delete'
                      mode='contained'
                      onPress = {() => deleteData(object)}
                       color = '#8ec217'    //#6ddd3d  #739f10
                         >Delete</Button>
              </TouchableOpacity>
              
            
          ) 
        })
      
      }
      </ScrollView>  
    
    </View>
        

  );
  };


const styles = StyleSheet.create({
    titleText: {
    fontSize: 15,
    //fontWeight: "bold"
  },
    scrollView: {
      flexDirection: 'column',
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
  renderStyle: {
      margin: 10, 
      padding: 10,
  }
});