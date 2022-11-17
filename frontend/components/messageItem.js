import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MessageItem = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Message Item</Text>
    </View>
  );
};

export default MessageItem;
