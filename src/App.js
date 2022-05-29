import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Help from './screens/Help';
import Topics from './screens/Topics';
import Post1 from './screens/posts1';
import Comment1 from './screens/comments1';
import LoginScreen from './screens/LoginScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FetchExample2 from './screens/fetchExample2'
import Comments2 from './screens/comments2';
import FetchExample3 from './screens/fetchExample3';
import PostSpecifics from './screens/postSpecific';
import FetchExample4 from './screens/fetchExample4';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabs from './screens/BottomTab';

import { BottomNavigation, Text } from 'react-native-paper';
import MyComponent from './screens/BottomTab';

const icon = <FontAwesome5 name={'comments'} />;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#6ddd3d'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="Home"
          component={Login}
          options={{
            headerShown: true,
            headerTintColor: '#ffffff',  
          }}
        />
        <Stack.Screen
          name="Home2"
          component={Home}
        />
        <Stack.Screen
          name="Help"
          component={Help}
        />
        <Stack.Screen
          name="Topics"
          component={Topics}
        />
         <Stack.Screen
          name="Login Screen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Posts"
          component={Post1}
        />
        <Stack.Screen
          name="Comment Environment"
          component={Comment1}
        />
        <Stack.Screen
          name="Fetch Example"
          component={FetchExample2}
        />
      
        <Stack.Screen
          name="Comments Page"
          component={Comments2}
        />
         <Stack.Screen
          name="Fetch Example2"
          component={FetchExample3}
        />
        <Stack.Screen
          name="Posts for Selected Category"
          component={PostSpecifics}
        />
        <Stack.Screen
          name="FetchExample4"
          component={FetchExample4}
        />
        <Stack.Screen
          name="Tab Example"
          component={MyComponent}
        />
        
      </Stack.Navigator>
     
    </NavigationContainer>
    
   
  
    
  )
}

export default App;