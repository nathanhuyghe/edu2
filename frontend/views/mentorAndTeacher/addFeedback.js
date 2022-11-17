import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
  ToastAndroid,
  TextInput,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";

import SubmitButton from "../../components/SubmitButton";
import ImmutableDropdown from "../../components/immutableDropdown";
import Indicator from "../../components/loadingIndicator";
import axios from "axios";
axios.defaults.withCredentials = true;

const windowWidth = Dimensions.get("window").width;

const AddFeedback = ({ route, navigation }) => {
  const { task } = route.params;
  navigation.setOptions({
    title: task.title,
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
  const submitFeedback = async () => {
    if(feedback != "") {
      setSubmittingFeedback(true);
      axios.patch(
        "https://edu2-8cd5y.ondigitalocean.app/api/tasks/" + task.id, {
          feedback: feedback,
        }, {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        setSubmittingFeedback(false);
        console.log(response.data);
        setFeedback("");
      })
      .catch(error => {
        // console.log(JSON.stringify(error));
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setSubmittingFeedback(true);
      });
    } else {
      ToastAndroid.showWithGravity(
        "Please fill in all required fields.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  const [submittingFeedback, setSubmittingFeedback] = React.useState(false);
  const [feedback, setFeedback] = React.useState({});

  return (
    <View style={styles.container}>
      <Indicator bool={submittingFeedback} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollChildren}
      >
        <Text style={{ width: 343, marginTop: 10 }}>{task.description}</Text>
        <View style={inputStyles.container}>
          <Text style={inputStyles.title}>Feedback</Text>
          <TextInput 
            style={inputStyles.input}
            placeholder={"Feedback..."}
            onChangeText={val => setFeedback(val)}
            selectTextOnFocus={true}
            multiline={true}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <SubmitButton
          text={"Submit feedback"}
          onPress={submitFeedback}
        />
      </ScrollView>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  input: {
    textAlignVertical: "top",
    borderRadius: 6,
    color: '#697D95',
    width: 343,
    padding: 6,
    backgroundColor: '#EFF2F5',
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 6,
  },
})

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

export default AddFeedback;
