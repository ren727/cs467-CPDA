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
import auth from '@react-native-firebase/auth';


export default function FetchExample3 ({navigation, route, shouldRefresh, postID}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Items, setItems] = useState([]);
  const [count, setCount] = useState('');

   //const { title } = route.params;
  //const { title } = route?.params || {};
  //const { content } = route.params;
  //const { content } = route?.params || {};
  const post_id = postID;
  console.log(post_id);

   const getPosts = async () => {
     console.log(post_id);
      try {
      // const response = await fetch('https://cs467api.uw.r.appspot.com/posts?limit=30&offset=10');
      //https://cs467api.uw.r.appspot.com/users?email=john@cheese.com   example-- a call with email 
        const response = await fetch('https://cs467api.uw.r.appspot.com/posts/'+ post_id +'/comments', {method: 'GET'});

       const json = await response.json();
       console.log(json, 'fetching a post comment, testing')
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

 const deleteData = (data) => {   //delete comments
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

    const editComments =  (object) => { 
      const upvote = object.upvote + 1; //for upvote
      console.log(upvote)
      const requestOptions = {
             method: 'PATCH',
             headers: { 'Content-Type': 'application/json',
                         'Accept': 'application/json',
                        },
             body: JSON.stringify({ 
                 upvote,
             })
         }
         fetch('https://cs467api.uw.r.appspot.com/comments/' + object.id, requestOptions)
         .then((response) => response.json())              //response.json()
      
         .then((response2) => {
           if(response2 !== undefined || response2 !== null) {
               console.log('Fetch API POST', response2);
               //setContent('');   //reset the hooks 
              // setGetNewData(true);
               //setTimeout(() => setGetNewData(false), 300)
              
               return response2;
             }
         })
         .catch((error) => {
           console.log(error, 'error');
         });
        };

  const handleUpvote = (object) => {
    const user_id = auth().currentUser.uid;
    console.log(user_id);
    const comment_id = object.id;
    console.log(comment_id);

    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json',
                  'Accept': 'application/json',
                 },
      body: JSON.stringify({ 
          comment_id,
      })
    };

    fetch('https://cs467api.uw.r.appspot.com/users/' + user_id + "/upvoted", requestOptions)
         .then((response2) => {
           if(response2 !== undefined || response2 !== null) {
               console.log('Fetch API POST', response2);
               return response2;
             }
         })
         .catch((error) => {
           console.log(error, 'error');
         });
  };
  
  const handleDownvote = (object) => {
    const user_id = auth().currentUser.uid;
    console.log(user_id);
    const comment_id = object.id;
    console.log(comment_id);

    const requestOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json',
                  'Accept': 'application/json',
                 },
      body: JSON.stringify({ 
          comment_id,
      })
    };

    fetch('https://cs467api.uw.r.appspot.com/users/' + user_id + "/downvoted", requestOptions)
      
         .then((response2) => {
           if(response2 !== undefined || response2 !== null) {
               console.log('Fetch API POST', response2);
               return response2;
             }
         })
         .catch((error) => {
           console.log(error, 'error');
         });
  };
  
  
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
              <TouchableOpacity key={id} style={{width: 335, height: 88, backgroundColor: '#ffff', margin:5, 
              borderWidth: 2, borderRadius: 5, borderColor: '#878181'}} >
                   <Text  style={{fontSize: 15}}>{object.content}</Text> 
                 <View style ={styles.buttonLayout}>  
                   {/*<Button 
                      icon = 'delete'
                      mode='contained'
                      onPress = {() => deleteData(object)}
                       color = '#8ec217'    //#6ddd3d  #739f10
                       width = '10%'
                      ></Button>*/}
                    <Button 
                      icon = 'thumb-up-outline'
                      mode='text'
                       onPress = {() => 
                          //setCount(object.upvote + 1)}
                          //console.log(count)}
                          handleUpvote(object)}
                          color = '#6d8238'    //#6ddd3d  #739f10  #6d8238
                       //width = '30'    //'44%'
                       labelStyle={{fontSize: 10}}
                       style = {styles.buttonLayout1}
                      // height = '30'  //'60%'
            
                         >Upvote {object.upvotes}</Button>
                    <Button 
                      icon = 'thumb-down-outline'
                      mode='text'
                      onPress = {() => handleDownvote(object)}
                       color = '#6d8238'    //#6ddd3d  #739f10
                      // width = '48%'
                       labelStyle={{fontSize: 10}}
                       style = {styles.buttonLayout1}
                       //height = '60%'
                         >Downvote {object.downvotes}</Button>
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
        marginBottom: 2,
        height:35,
        width: 120,
        
   
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