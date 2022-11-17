import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import Indicator from "../../components/loadingIndicator";
import { IconButton } from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";

import SubmitButton from "../../components/SubmitButton";
import ImmutableDropdown from "../../components/immutableDropdown";
import axios from "axios";
axios.defaults.withCredentials = true;

const windowWidth = Dimensions.get("window").width;

const TaskDetails = ({ route, navigation }) => {
  const { task_id, title } = route.params;
  navigation.setOptions({
    title: title,
    headerLeft: () => (
      <View style={{ paddingLeft: 5 }}>
        <IconButton
          icon={"arrow-left"}
          color={"#000"}
          onPress={() => navigation.goBack()}
          rippleColor="rgba(0, 0, 0, .16)"
        />
      </View>
    ),
  });

  const [sliderValue, setSliderValue] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [marking, setMarking] = React.useState(false);
  const [task, setTask] = React.useState({});

  React.useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setRefreshing(true);
    axios
      .get("https://edu2-8cd5y.ondigitalocean.app/api/tasks/" + task_id)
      .then((response) => {
        console.log(response.data);
        setTask(response.data);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.showWithGravity(
          error.response.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setRefreshing(false);
      });
  };

  return (
    <View style={styles.container}>
    <Indicator bool={marking} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollChildren}
        refreshControl={
          <RefreshControl
            onRefresh={getTask}
            refreshing={refreshing}
            colors={["#7EAB92"]}
          />
        }
      >
        <Text style={{ width: 343, marginTop: 10 }}>{task.description}</Text>
        <View style={styles.iconRow}>
          <IconButton
            icon="clock-alert"
            color="#000"
            rippleColor="rgba(0, 0, 0, 0)"
          />
          <Text>{task.deadline}</Text>
        </View>
        <View style={styles.iconRow}>
          <IconButton
            icon="map-marker"
            color="#000"
            rippleColor="rgba(0, 0, 0, 0)"
          />
          <Text>{task.internship?.company.name}</Text>
        </View>
        <View style={{ width: 343 }}>
          <Text style={{ fontWeight: "bold" }}>Difficulty</Text>
          <Slider
            // debugTouchArea={true}

            minimumValue={0}
            maximumValue={2}
            animateTransitions={true}
            minimumTrackTintColor="#697D95"
            maximumTrackTintColor="#EFF2F5"
            thumbTintColor="#697D95"
            step={1}
            value={
              task.difficulty == "easy"
                ? 0
                : task.difficulty == "medium"
                ? 1
                : 2
            }
            trackMarks={[0, 1, 2]}
            onValueChange={(value) => setSliderValue(value)}
          />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Category</Text>
          <ImmutableDropdown option={task.category?.name} />
        </View>
        {task.stopped_at == null ? (
          <SubmitButton
            text={"Mark as done"}
            onPress={() => {
              setMarking(true);
              axios
                .patch(
                  "https://edu2-8cd5y.ondigitalocean.app/api/tasks/" +
                    task.id +
                    "/finished"
                )
                .then(() => setMarking(false))
                .catch(() => setMarking(false));
            }}
          />
        ) : null}
        <View style={{ height: 20 }} />
        <SubmitButton
          text={"Request feedback"}
          onPress={() =>{
            setMarking(true);
            axios.patch(
              "https://edu2-8cd5y.ondigitalocean.app/api/tasks/" +
                task.id +
                "/request-feedback"
            )
            .then(() => setMarking(false))
            .catch(() => setMarking(false));
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  scroll: {
    backgroundColor: "#fff",
    paddingTop: 10,
    margin: 0,
  },
  scrollChildren: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#fff",
  },
  iconRow: {
    width: 343,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TaskDetails;
