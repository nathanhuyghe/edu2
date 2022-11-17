import React from 'react';
import { 
  View, 
  ActivityIndicator,
  Modal,
} from 'react-native';

const Indicator = ({bool}) => {
  const [modalActive, setModalActive] = React.useState(bool);
  
  React.useEffect(() => {
    setModalActive(bool);
  }, [bool]);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalActive}
        statusBarTranslucent={true}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#00000077",
          }}
        >
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            height:50,
            width:50,
            borderRadius:100,
            backgroundColor:'#fff'
          }}>
            <ActivityIndicator size="large" color="#009882" />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Indicator;