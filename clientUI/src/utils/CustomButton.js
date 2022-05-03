import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Octicons';

const CustomButton = (props) => {
    return (
        <Pressable
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#00000050' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#ddddee' : props.color }, //#dddddd #9999cc
                styles.button,
                { ...props.style }
            ]}
        >
            <Text style={styles.text}>
                {props.title}
            </Text>
            <Icon
                         name="questioncircleo"
                         size={40}
                         color="green"/>
                    
            
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
      
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
    },
})

export default CustomButton;