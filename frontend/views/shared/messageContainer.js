import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MessageContainer = (props) => {
  const getUser = (id) => {
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/api/users/" + id)
      .then((response) => {
        return response.data.firstname;
      });
  };
  return (
    <ScrollView style={styles.container}>
      {props.mess?.map((m) => {
        return (
          <Text key={m.id} style={styles.txt}>
            {m.user_id}: {m.message}
          </Text>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    flex: 1,
    backgroundColor: "#fff",
  },
  txt: {
    fontSize: 24,
    marginTop: 8,
  },
});

export default MessageContainer;
