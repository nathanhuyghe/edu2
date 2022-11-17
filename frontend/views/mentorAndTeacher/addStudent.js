import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Submitbutton from "../../components/SubmitButton";
import { InputField, PasswordField } from "../../components/inputField";
import Indicator from "../../components/loadingIndicator";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

import axios from "axios";
axios.defaults.withCredentials = true;

const AddStudent = ({route, navigation}) => {
  navigation.setOptions({
    headerLeft: () => (
      <View style={{paddingLeft:5}}>
        <IconButton icon={"arrow-left"} color={'#000'} onPress={() => navigation.goBack()} rippleColor="rgba(0, 0, 0, .16)"/>
      </View>
    ),
  });

  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    axios
      .patch("https://edu2-8cd5y.ondigitalocean.app/api/internships/" + data, 
      global.user.role_id == 3 ?
      {
        "mentor_id" : global.user.id,
        "company_id" : global.user.company_id,
    
      } : {
        "teacher_id" : global.user.id,
      }, {
        "Content-Type": "application/json",
      })
      .then((response) => {
        setScanned(false);
        console.log(response.data);
      })
      .catch(error => {
        // console.log(JSON.stringify(error));
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setScanned(false);
      });
  };
  
  if (hasPermission === null) {
    return(
      <View style={{flex: 1, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
        <Text style={{
        fontWeight: 'bold',
        fontSize: 40,
        width: 343,
      }}>
          Requesting camera permission.
        </Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return(
      <View style={{flex: 1, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
        <Text style={{
        fontWeight: 'bold',
        fontSize: 40,
        width: 343,
      }}>
          No access to camera.
        </Text>
      </View>
    );
  }

  return(
    <View style={{flex: 1, backgroundColor: '#000', alignItems:'center', justifyContent:'center'}}>
    <Indicator bool={scanned} />
    <BarCodeScanner
      ratio='16:9'
      barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFill}
    />
      <Text style={{
        fontWeight: 'bold',
        fontSize: 40,
        width: 343,
        backgroundColor: '#fff',
        borderRadius: 6,
        padding: 8,
        paddingLeft: 24,
        paddingRight: 24,
      }}>Scan a QR-code to assign a student to you.
      </Text>
      <View style={{
        height: Dimensions.get('screen').width
      }}/>
    </View>
  )
}

export default AddStudent;