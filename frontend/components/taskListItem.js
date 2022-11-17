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
      navigation.navigate("Task Details", {
        task_id: task.id,
        title: task.title
      })
    }>
      <Indicator bool={marking} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.body}>{task.description}</Text>
      </View>
      <IconButton
        style={styles.button}
        icon={task.stopped_at == null ? "check-circle-outline" : "check-circle"}
        title="Info"
        color={task.stopped_at == null ? "#8E8E8E" : "#000"}
        rippleColor={task.stopped_at != null ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, .32)"}
        onPress={() =>{ 
          
          task.stopped_at == null ? (
            setMarking(true),
            axios.patch(
              "https://edu2-8cd5y.ondigitalocean.app/api/tasks/" + task.id + "/finished"
            ).then(() => setMarking(false)).catch(() => setMarking(false))
          ) : null}
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
    alignSelf: "flex-end",
  },
});

export default taskListItem;
