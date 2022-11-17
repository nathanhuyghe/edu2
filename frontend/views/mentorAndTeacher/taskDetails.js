import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper';

import SubmitButton from '../../components/SubmitButton';
import SelectDropdown from '../../components/SelectDropdown';

const TaskDetails = ({route, navigation}) => {
  const { title, body, diff, cat } = route.params;
  navigation.setOptions({
    title: title,
    headerLeft: () => (
      <View style={{paddingLeft:5}}>
        <IconButton icon={"arrow-left"} color={'#000'} onPress={() => navigation.goBack()} rippleColor="rgba(0, 0, 0, .16)"/>
      </View>
    ),
  });

  const [category, setCategory] = React.useState('');

  return(
    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', backgroundColor: '#fff'}}>
      <Text style={{width: 343, marginTop: 10}}>{body}</Text>
      <View style={{width: 343}}>
        <IconButton icon="calendar"color="#000" rippleColor="rgba(0, 0, 0, 0)"/>
      </View>
      <View style={{width: 343}}>
        <IconButton icon="clock"color="#000" rippleColor="rgba(0, 0, 0, 0)"/>
      </View>
      <View style={{width: 343}}>
        <IconButton icon="map-marker"color="#000" rippleColor="rgba(0, 0, 0, 0)"/>
      </View>
      <View style={{width: 343}}>
        <Text style={{fontWeight: 'bold'}}>Difficulty</Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 20}}>
        <Text style={{fontWeight: 'bold'}}>Category</Text>
        <SelectDropdown onChangeValue={value => setCategory(value)}/>
      </View>
      <SubmitButton text={"Feedback aanvragen"} onPress={() => alert('Aanvraag verzonden.')}/>
    </View>
  )
}

export default TaskDetails;