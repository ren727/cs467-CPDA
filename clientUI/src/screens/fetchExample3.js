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
        const response = await fetch('https://cs467api.uw.r.appspot.com/comments?limit=30', {method: 'GET'});

       const json = await response.json();
       //console.log(json, 'json here, testing')
       setData(json.comments);  
     } catch (error) {
        console.error(error, 
         );
     } finally {
       setLoading(false);
     }
  }

  const upvoteCount = () => {
    return ( data.upvote + 1)
  }

//   const postNew =  () => {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json',
//                     'Accept': 'application/json',},
//         body: JSON.stringify({ 
//             user_id: '12249',
//             title,  //not do  title: title  
//            // key: value - title,
//             content,
//             categories: '7',
            
//         })
//     }
//     fetch('https://cs467api.uw.r.appspot.com/comments', requestOptions)
//     .then((response) => response.json())              //response.json()
//     .then((json) => {
//         console.log('Fetch API POST', json.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }


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
              <TouchableOpacity  key={id} style={{width: 300, height: 110, backgroundColor: '#90ee90', margin:5}} 
                  >
                   <Text  style={{fontSize: 15}}>{object.content}</Text> 
                 <View style ={styles.buttonLayout}>  
                   {/*<Button 
                      icon = 'delete'
                      mode='contained'
                      onPress = {() => deleteData(object)}
                       color = '#8ec217'    //#6ddd3d  #739f10
                       width = '27%'
                      >Delete</Button>*/}
                    <Button 
                      icon = 'thumb-up-outline'
                      mode='contained'
                      //onPress = {() => deleteData(object)}
                       color = '#6ddd3d'    //#6ddd3d  #739f10
                       width = '44%'
                       labelStyle={{fontSize: 10}}
                       style = {styles.buttonLayout1}
                       height = '60%'
            
                         >Upvote {data.upvote}</Button>
                    <Button 
                      icon = 'thumb-down-outline'
                      mode='contained'
                      //onPress = {() => deleteData(object)}
                       color = '#8ec217'    //#6ddd3d  #739f10
                       width = '48%'
                       labelStyle={{fontSize: 12}}
                       height = '70%'
                         >Downvote</Button>
                  </View>
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

    buttonLayout:{
     flexDirection: 'row',
     marginTop: 20,
     flex: 1,
     

    },
    buttonLayout1:{
        marginRight: 5,
        
   
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