import React from 'react';
import { 
  View, 
  Text, 
  Pressable
} from 'react-native';

const Submitbutton = ({text, onPress, width = 250}) => {
  return (
    <View style={{ borderRadius: 3, elevation: 0}}>
      <Pressable 
        style={{
          width: width, 
          height: 44,
          display: 'flex',
          flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#009882',
          borderRadius: 6,
        }} 
        android_ripple={{ color: '#ffffff40', borderless: true }}
        onPress={onPress}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#fff'
          }}  
        >
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

export default Submitbutton;