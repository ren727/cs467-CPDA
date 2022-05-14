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


export default FetchExample2 = ({navigation, route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Items, setItems] = useState([]);

   //const { title } = route.params;
  //const { title } = route?.params || {};
  //const { content } = route.params;
  //const { content } = route?.params || {};

  const getPosts = async () => {
     try {
      const response = await fetch('https://cs467api.uw.r.appspot.com/posts');
      const json = await response.json();
      //console.log(json, 'json here')
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
    fetch('https://cs467api.uw.r.appspot.com/posts', requestOptions)
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

  fetch('https://cs467api.uw.r.appspot.com/posts/5083538508480512', requestOptions)
  .then(response => response.ok)
  .catch((error) => {
      console.error(error);
    });
 }

  useEffect(() => {
    getPosts();
    //postNew();
   //deletePost();
    return () => {
    setData({}); // This worked for me
   };
  }, []);

 return(
    <View style={{ flex: 1, padding: 24 }}>
      <ScrollView> 
      { 
       data.map((object1, id) => {   // view's attribute style={{ flex: 1, padding: 24 }}
          return (
            <View  key={id}> 
            
              <TouchableOpacity key={id} style={{width: 300, height: 88, backgroundColor: '#90ee90', margin:5}} 
                  >
                   <Text style={{fontSize: 15, fontWeight: 'bold'}}>{object1.title}</Text> 
                   <Text style={{paddingTop:5}}>{object1.content}</Text>     
              </TouchableOpacity>
              
            </View> 
          ) 
        })
     }
    
     </ScrollView> 
     
      
     {/*<FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.titleText}>{item.title}</Text>
            
          )}
          />*/}
        
      </View>
    

  );
  };


const styles = StyleSheet.create({
    titleText: {
    fontSize: 15,
    //fontWeight: "bold"
  },
});