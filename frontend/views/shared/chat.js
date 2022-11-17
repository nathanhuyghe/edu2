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
import ChatField from "../../components/chatField";
import Pusher from "pusher-js/react-native";
import { IconButton, FAB, DefaultTheme, RadioButton } from "react-native-paper";
import SelectDropdown from "../../components/SelectDropdown";
import Submitbutton from "../../components/SubmitButton";

Pusher.logToConsole = true;

let pusher = new Pusher("e4de229ec0b7ec3928f0", {
  cluster: "eu",
});
const mdTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: "#009882",
    accent: "#009882",
  },
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Chat = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => <View />,
  });
  const [users, setUsers] = React.useState();
  const [chatRooms, setChatRooms] = React.useState();
  const [dropDownValue, setDropdownValue] = React.useState();

  useEffect(() => {
    getUser();
    getChatRooms();
  }, []);

  const createRoom = async (id) => {
    await axios
      .post("https://edu2-8cd5y.ondigitalocean.app/chat/room", {
        user_1: global.user.id,
        user_2: id,
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    getChatRooms();
  };

  const getChatRooms = () => {
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/chat/rooms")
      .then((response) => {
        let chats = [];
        response.data.map((room) => {
          //vervangen door global user variable
          if (
            room.user_1 === global.user.id ||
            room.user_2 === global.user.id
          ) {
            chats.push(room);
          }
        });
        setChatRooms(chats);
      });
  };

  const getUser = () => {
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/api/users")
      .then((response) => {
        setUsers(response.data);
      });
  };

  const styles = StyleSheet.create({});
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      {chatRooms?.map((chatroom) => {
        return (
          <ChatField
            key={chatroom.id}
            navigation={navigation}
            chatroom={chatroom}
          />
        );
      })}

      {users ? (
        <SelectDropdown
          title="Select a new user to send a message..."
          onChangeValue={(val) => setDropdownValue(val)}
          options={users}
          initialSelected={users[0].id}
        />
      ) : null}

      <Submitbutton
        style={styles.button}
        text={"Create new chat room"}
        onPress={() => createRoom(dropDownValue)}
      />
    </View>
  );
};

export default Chat;
