import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatField = ({ navigation, chatroom }) => {
  const [user, setUser] = React.useState();
  const [userName, setUserName] = React.useState();
  useEffect(() => {
    getOtherUser(chatroom.user_1, chatroom.user_2);
  }, []);

  useEffect(() => {
    getUser(user);
  }, [user]);

  const getUser = (id) => {
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/api/users/" + id)
      .then((response) => {
        setUserName(response.data.firstname + " " + response.data.name);
      });
  };

  const getOtherUser = (id1, id2) => {
    if (id1 === global.user.id) {
      setUser(id2);
    } else {
      setUser(id1);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ChatPerson", {
            chatPersonId: chatroom.user_1,
            chatRoom: chatroom,
          })
        }
      >
        {userName ? <Text style={styles.txt}>{userName}</Text> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chatfield: {
    marginBottom: 25,
  },
  txt: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    marginLeft: 15,
  },
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 3,
    width: "100%",
  },
});

export default ChatField;
