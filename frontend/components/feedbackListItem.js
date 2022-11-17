import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
} from "react-native";
import { IconButton } from "react-native-paper";
import Indicator from "./loadingIndicator";
import axios from "axios";

const taskListItem = ({
  task,
  navigation,
}) => {

  const [marking, setMarking] = React.useState(false);

  return (
    <Pressable style={styles.container} 
    onPress={() =>
      navigation.navigate("Add Feedback", {
        task: task
      })
    }>
      <Indicator bool={marking} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.body}>{task.description}</Text>
      </View>
      <IconButton
        style={styles.button}
        icon={task.feedback == null ? "clipboard-text-outline" : "clipboard-text"}
        title="Info"
        color={task.feedback == null ? "#8E8E8E" : "#000"}
        rippleColor={"rgba(0, 0, 0, 0)"}
        onPress={() => navigation.navigate("Add feedback", {
            task_id: task.id,
            title: task.title
          })
        }
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    fontWeight: "100",
  },
  button: {
    paddingTop: 10,
    alignSelf: "flex-end",
  },
});

export default taskListItem;
