import React from 'react';
import { 
  View, 
  Text, 
  Pressable,
} from 'react-native';
import { IconButton } from 'react-native-paper';

const Submitbutton = (option) => {
  return (
    <View style={{ borderRadius: 3, elevation: 0}}>
      <Pressable 
        style={{
          width: 343, 
          height: 44,
          display: 'flex',
          flexDirection: 'row', 
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#EFF2F5',
          borderRadius: 3,
        }} 
        android_ripple={{ color: '#00000020', borderless: true }}
        onPress={() => null}
      >
        <Text
          style={{
            fontSize: 14,
            marginLeft: 12,
            color: '#697D95'
          }}  
        >
          {option.option}
        </Text>
        <IconButton icon={"chevron-down"} color={'#697D95'} rippleColor="rgba(0, 0, 0, 0)"/>
      </Pressable>
    </View>
  )
}

export default Submitbutton;