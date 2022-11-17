import React from 'react';
import { 
  View, 
  Text, 
  Pressable,
  Modal,
} from 'react-native';
import { IconButton, RadioButton, DefaultTheme, } from 'react-native-paper';

const RadioTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: '#009882',
    accent: '#009882',
  },
};

const Submitbutton = ({
  title = "Select an option:",
    options = [
      {id:1, name: 'First'}, 
      {id:2, name:'Second'}, 
      {id:3, name:'Third'}
    ], 
    initialSelected = 1, 
    onChangeValue,
  }) => {
  const [modalActive, setModalActive] = React.useState(false);
  const [selected, setSelected] = React.useState(initialSelected);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  React.useEffect(() => {
    onChangeValue(selected);
  }, [selected]);

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalActive} statusBarTranslucent={true} onRequestClose={() => { setModalActive(!modalActive); }}>
        <Pressable 
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000077',
          }}
          onPress={() => setModalActive(!modalActive)}
        >
          <Pressable
            style={{
              backgroundColor: '#fff',
              borderRadius: 6,
              padding: 9,
              paddingRight: 12, 
              paddingLeft: 12,
            }}
          >
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              width: 343,
              marginBottom: 10,
            }}>
              {title}
            </Text>
            {
              options.map((option, index) => (
                <Pressable 
                  key={option.id}
                  style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setSelected(option.id);
                    setSelectedIndex(index);
                  }}
                >
                  <RadioButton 
                    value={option.id}
                    status={ selected === option.id ? 'checked' : 'unchecked' }
                    theme={RadioTheme}
                    onPress={() => {
                      setSelected(option.id);
                      setSelectedIndex(index);
                    }}
                  />
                  <Text style={{paddingRight: 15}}>{option.name}</Text>
                </Pressable>
              ))
            }
          </Pressable>
        </Pressable>
      </Modal>
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
          onPress={() => setModalActive(true)}
        >
          <Text
            style={{
              fontSize: 14,
              marginLeft: 12,
              color: '#697D95'
            }}  
          >
            {options[selectedIndex].name}
          </Text>
          <IconButton icon={"chevron-down"} color={'#697D95'} rippleColor="rgba(0, 0, 0, 0)"/>
        </Pressable>
      </View>
    </View>
  )
}

export default Submitbutton;