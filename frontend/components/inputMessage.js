import axios from "axios";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InputMessage = (props) => {
  const [message, setMessage] = React.useState();

  useEffect(() => {
    console.log(global.user.id);
  }, []);

  const sendMessage = async () => {
    if (message === "") {
      return;
    } else {
      setMessage("");
      await axios
        .post(
          "https://edu2-8cd5y.ondigitalocean.app/chat/room/" +
            props.chatRoom.id +
            "/message/" +
            global.user.id,
          {
            withCredentials: true,
            message: message,
          }
        )
        .catch((error) => {
          console.log(error.response.data);
        });
    }
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Write a message..."
          underlineColorAndroid="transparent"
          value={message}
          onChangeText={(message) => setMessage(message)}
        />
        <TouchableOpacity style={styles.btnSend} onPress={sendMessage}>
          <Image
            source={{
              uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>

      {/* <TextInput
        style={styles.textinput}
        onChangeText={(text) => setMessage(text)}
        placeholder="Text"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
  },
  btnSend: {
    backgroundColor: "#009882",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InputMessage;
