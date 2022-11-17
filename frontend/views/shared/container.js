import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  Button,
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

const Container = ({ route, navigation }) => {
  const [chatRooms, setChatRooms] = React.useState();
  const [room, setRoom] = React.useState();
  const [messages, setMessages] = React.useState();
  const [currentRoom, setCurrentRoom] = React.useState();
  const [send, setSend] = React.useState();
  //const userid = route.params.userId;
  useEffect(async () => {
    getRooms();
    connect();
    feedback();
  }, []);

  useEffect(() => {
    if (currentRoom) {
      connect();
    }
  }, [currentRoom]);

  useEffect(() => {
    if (send) {
      connect();
    }
  }, [send]);

  const getRooms = () => {
    axios.get("http://localhost:8080/chat/rooms").then((response) => {
      setChatRooms(response.data);
      setCurrentRoom(response.data[0]);
      getMessages(response.data[0].id);
    });
  };

  const feedback = () => {
    let channel = pusher.subscribe("feedback.");
    channel.bind("App\\Events\\feedback", function (data) {
      alert(JSON.stringify(data));
    });
  };

  const connect = () => {
    if (currentRoom) {
      let channel = pusher.subscribe("chat." + currentRoom.id);
      channel.bind("App\\Events\\NewChatMessage", function (data) {
        getMessages(currentRoom.id);
      });
    }
  };

  const disconnect = (newRoom, oldRoom) => {
    setCurrentRoom(newRoom);
    pusher.unsubscribe("chat." + oldRoom.id);
  };

  const getMessages = (id) => {
    axios
      .get("http://localhost:8080/chat/room/" + id + "/messages")
      .then((response) => {
        setMessages(response.data);
      });
  };

  return (
    <View>
      {chatRooms?.map((chatroom) => {
        return (
          <Button
            key={chatroom.id}
            title={chatroom.name}
            onPress={() => disconnect(chatroom, currentRoom)}
          />
        );
      })}

      {messages ? <MessageContainer mess={messages} /> : null}

      {currentRoom ? (
        <InputMessage id={currentRoom.id} setSend={setSend} userId={1} />
      ) : null}
    </View>
  );
};

export default Container;
