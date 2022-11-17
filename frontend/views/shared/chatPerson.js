import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import MessageContainer from "./messageContainer";
import InputMessage from "../../components/inputMessage";
import axios from "axios";
import Pusher from "pusher-js/react-native";

Pusher.logToConsole = true;

let pusher = new Pusher("e4de229ec0b7ec3928f0", {
  cluster: "eu",
});

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatPerson = ({ route }) => {
  const [user, setUser] = React.useState();
  const [messages, setMessages] = React.useState();

  useEffect(() => {
    getUser();
    getMessages();
  }, []);

  useEffect(() => {
    connect();
  }, [user]);

  const getMessages = () => {
    axios
      .get(
        "https://edu2-8cd5y.ondigitalocean.app/chat/room/" +
          route.params.chatRoom.id +
          "/messages"
      )
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const connect = () => {
    if (user?.id) {
      getMessages();
      let channel = pusher.subscribe("chat" + route.params.chatRoom.id);
      channel.bind("App\\Events\\NewChatMessages", function (data) {
        console.log("hierzo");
        getMessages();
      });
    }
  };

  const getUser = () => {
    axios
      .get(
        "https://edu2-8cd5y.ondigitalocean.app/api/users/" +
          route.params.chatPersonId
      )
      .then((response) => {
        setUser(response.data);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{user?.firstname + " " + user?.name}</Text>
      {messages ? <MessageContainer mess={messages} /> : null}
      {user ? (
        <InputMessage
          userId={user?.id}
          chatRoom={route.params.chatRoom}
          chatRoomName={"chat." + route.params.chatRoom.id}
        />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "3%",
    marginTop: "3%",
  },
});

export default ChatPerson;
