import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Pressable, ToastAndroid,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Submitbutton from "../../components/SubmitButton";
import { InputField, PasswordField } from "../../components/inputField";
import Indicator from "../../components/loadingIndicator";
import SelectDropdown from "../../components/SelectDropdown";
import axios from "axios";

const windowWidth  = Dimensions.get('window').width;
const windowHeight  = Dimensions.get('window').height;

const Register = ({route, navigation}) => {
    const [name, setName] = React.useState("");
    const [firstName, setFirstname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [passwd, setPasswd] = React.useState("");
    const [confPasswd, setConfPasswd] = React.useState("");
    const [dropdownValue, setDropdownValue] = React.useState("");
    const [roles, setRoles] = React.useState([
        {id:2, name:"Student"},
        {id:3, name:"Mentor"},
        {id:4, name:"Teacher"},
    ]);
    const [fosDropdownValue, setFosDropdownValue] = React.useState("");
    const [fos, setFos] = React.useState([
        {id:1, name:"fos1"},
        {id:2, name:"fos2"},
        {id:3, name:"fos3"},
        {id:4, name:"fos4"},
    ]);
    const [companyName, setCompanyName] = React.useState("");

    React.useEffect(() => {
        (async () => {
            axios.get("https://edu2-8cd5y.ondigitalocean.app/api/field-of-studies")
                .then(response => {
                    console.log(response.data);
                    // setFos(response.data);
                })
                .catch(error => {
                        console.log(JSON.stringify(error));
                        ToastAndroid.showWithGravity(
                            error.message,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                );
        })();
    }, []);

  navigation.setOptions({
    headerLeft: () => (
      <View style={{paddingLeft:5}}>
        <IconButton icon={"arrow-left"} color={'#000'} onPress={() => navigation.goBack()} rippleColor="rgba(0, 0, 0, .16)"/>
      </View>
    ),
  });
  const doRegister =async () => {
      console.log('hallo');
      axios
          .post("https://edu2-8cd5y.ondigitalocean.app/api/user/register/", {
              name: name,
              firstname: firstName,
              email: email,
              role_id: dropdownValue,
              field_of_study_id: fosDropdownValue,
              company_name: companyName,
          }, {
              "Content-Type": "application/json",
          })
          .then((response) => {
              console.log(response.data)
          })
          .catch(error => {
              // console.log(JSON.stringify(error));
              ToastAndroid.showWithGravity(
                  error.message,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
              );

          });
  }
  return(
    <View style={{flex: 1, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 40,
        width: 343,
      }}>
        Register
      </Text>
        <InputField onChangeText={(val) => setName(val)} placeholder={"name"} label={"Name"}/>
        <InputField onChangeText={(val) => setFirstname(val)} placeholder={"First name"} label={"First name"}/>
      <InputField onChangeText={(val) => setEmail(val)} placeholder={"user@example.com"} label={"E-mail"}/>
      <PasswordField onChangeText={(val) => setPasswd(val)} label={"Password"}/>
      <PasswordField onChangeText={(val) => setConfPasswd(val)} label={"Confirm password"}/>
        <View style={styles.dropDown}>
            <Text style={styles.title}>Role</Text>
            <SelectDropdown
                onChangeValue={(val) => setDropdownValue(val)}
                options={roles}
                initialSelected={roles[0].id}
            ></SelectDropdown>
        </View>
        {dropdownValue != 3 ? <View style={styles.dropDown}>
            <Text style={styles.title}>Field of Study {fosDropdownValue}</Text>
            <SelectDropdown
                onChangeValue={(val) => setFosDropdownValue(val)}
                options={fos}
                initialSelected={fos[0].id}
            ></SelectDropdown>
        </View> : null}
        {dropdownValue == 3 ? <InputField onChangeText={(val) => setCompanyName(val)} placeholder={"webatvantage"} label={"Company name"}/> : null}
      <View style={{height: 16}}/>
      <Submitbutton text={"Sign up"} width={343}
        onPress={doRegister}
      />
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{
          paddingTop: 16,
          fontWeight: 'bold',
          fontSize: 14,
          textDecorationLine: 'underline',
          color: '#007F6D'
        }}>
          Already have an account?
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        paddingBottom: 6,
        textAlign: "left",
    },
    dropDown: {
        paddingTop: 10,
    },
});
export default Register;
