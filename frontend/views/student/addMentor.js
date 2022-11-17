import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  ToastAndroid,
} from "react-native";
import Indicator from "../../components/loadingIndicator";
import { IconButton, FAB, DefaultTheme } from "react-native-paper";
import Submitbutton from "../../components/SubmitButton";
import { InputField } from "../../components/inputField";
import QRCode from 'react-native-qrcode-svg';
import axios from "axios";
axios.defaults.withCredentials = true;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddMentor = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => (
      <View style={{ paddingLeft: 5 }}>
        <IconButton
          icon={"arrow-left"}
          color={"#000"}
          onPress={() => navigation.goBack()}
          rippleColor="rgba(0, 0, 0, .16)"
        />
      </View>
    ),
    headerRight: () => <View />,
  });
  
  const [email, setEmail] = React.useState("");
  const [sending, setSending] = React.useState(false);

  var sendMail = () => {
    setSending(true);
    axios
      .post("https://edu2-8cd5y.ondigitalocean.app/api/mails/" + global.user.id)
      .then((response) => {
        setSending(false);
        console.log(response.data);
      })
      .catch(error => {
        // console.log(JSON.stringify(error));
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setSending(false);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
    <Indicator bool={sending} />
      <View style={{ height: 10 }} />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 30,
          width: 343,
        }}
      >
        Via E-mail
      </Text>
      <InputField onChangeText={(val) => setEmail(val)} placeholder={"user@example.com"} label={"E-mail"}/>
      <View style={{height: 8}}/>
      <Submitbutton text={"Send request"} width={343} onPress={sendMail}/>
      <View style={{height: 24}}/>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 30,
        width: 343,
      }}>
        Via QR-code
      </Text>
      <View style={{height: 16}}/>
      <QRCode
        value={global.user.internship_id}
      />
    </View>
  );
};

export default AddMentor;
