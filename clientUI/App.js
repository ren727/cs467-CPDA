import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Help from './screens/Help';
import Topics from './screens/Topics';
import Post1 from './screens/posts1';
import Comment1 from './screens/comments1';
import Login_Screen from './screens/LoginScreen';
import LoginScreen from './screens/LoginScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = <FontAwesome5 name={'comments'} />;

const Stack = createStackNavigator();

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
            fontSize: 25,
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;