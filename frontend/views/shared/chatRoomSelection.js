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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatRoomSelection = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <View>
      <Button
        onPress={props.roomchanged(props.currentRoom.id)}
        title={room.name}
        color="#841584"
      />
    </View>
  );
};

export default ChatRoomSelection;
