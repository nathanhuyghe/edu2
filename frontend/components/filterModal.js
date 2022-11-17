import React from 'react';
import { 
  Text,
  View,
  Pressable,
  Modal,
} from 'react-native';
import { DefaultTheme, RadioButton, } from "react-native-paper";

const mdTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: "#009882",
    accent: "#009882",
  },
};

const Filter = ({options = ['First', 'Second', 'Third'], initialSelected = 0, onChangeValue, showFilter, onRequestClose}) => {
  const [modalActive, setModalActive] = React.useState(showFilter);
  const [selected, setSelected] = React.useState(options[initialSelected]);
  
  React.useEffect(() => {
    onChangeValue(selected);
  }, [selected]);

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={showFilter} statusBarTranslucent={true} onRequestClose={onRequestClose}>
        <Pressable 
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000077',
          }}
          onPress={onRequestClose}
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
              Sort by:
            </Text>
            {
              options.map((option, index) => (
                <Pressable 
                  key={index}
                  style={{
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                  }}
                  onPress={() => setSelected(option)}
                >
                  <RadioButton 
                    value={option}
                    status={ selected === option ? 'checked' : 'unchecked' }
                    theme={mdTheme}
                    onPress={() => setSelected(option)}
                  />
                  <Text style={{paddingRight: 15}}>{option}</Text>
                </Pressable>
              ))
            }
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}

export default Filter;