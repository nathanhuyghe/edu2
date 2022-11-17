import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ToastAndroid,
} from "react-native";
import Submitbutton from "../../components/SubmitButton";
import Indicator from "../../components/loadingIndicator";
import { InputField, PasswordField } from "../../components/inputField";
import axios from "axios";
axios.defaults.withCredentials = true;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ route, navigation }) => {
  const [email, setEmail] = React.useState("student2@mail.com");
  const [passwd, setPasswd] = React.useState("Azerty123");
  const [loggingIn, setLoggingIn] = React.useState(false);

  const btnlogin = async () => {
    // global.user = {
    //   firstname: "J",
    //   name: "Meme",
    //   email: "j@meme",
    //   id: 1,
    //   internship_id: 1,
    // };
    // navigation.navigate("Mentor");
    setLoggingIn(true);
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/sanctum/csrf-cookie/")
      .then(() => {
        axios
          .post(
            "https://edu2-8cd5y.ondigitalocean.app/sanctum/login/",
            {
              // withCredentials: true,
              email: email,
              password: passwd,
            },
            {
              "Content-Type": "application/json",
            }
          )
          .then((response) => {
            setLoggingIn(false);
            console.log(response.data); // admin: 1, student: 2, mentor: 3, teacher: 4
            global.user = response.data;
            switch (response.data.role_id) {
              case 2:
                navigation.navigate("Student");
                break;
              case 3:
                navigation.navigate("Mentor");
                break;
              case 4:
                navigation.navigate("Teacher");
                break;
            }
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
            console.log(error.response.data.message);
            ToastAndroid.showWithGravity(
              error.response.data.message,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            setLoggingIn(false);
          });
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          width: 343,
        }}
      >
        Sign in
      </Text>
      <InputField
        onChangeText={(val) => setEmail(val)}
        placeholder={"user@example.com"}
        label={"E-mail"}
      />
      <PasswordField
        onChangeText={(val) => setPasswd(val)}
        label={"Password"}
      />
      <View style={{ marginTop: 16 }} />
      {/* <Submitbutton
        text={"Sign in"}
        width={343}
        onPress={() => {
          // placeholder for routing
          email == "student" && passwd == "Azerty123"
            ? navigation.navigate("Student")
            : email == "mentor" && passwd == "Azerty123"
            ? navigation.navigate("Mentor")
            : email == "teacher" && passwd == "Azerty123"
            ? navigation.navigate("Teacher")
            : alert("Credentials don't match database.");
        }}
      /> */}

      <Submitbutton text={"Sign in"} width={343} onPress={() => btnlogin()} />

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text
          style={{
            paddingTop: 16,
            fontWeight: "bold",
            fontSize: 14,
            textDecorationLine: "underline",
            color: "#007F6D",
          }}
        >
          Don't have an account?
        </Text>
      </Pressable>
      <Indicator bool={loggingIn} />
    </View>
  );
};

export default Login;
