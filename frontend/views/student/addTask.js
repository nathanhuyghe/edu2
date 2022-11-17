import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  ToastAndroid,
} from "react-native";
import SelectDropdown from "../../components/SelectDropdown";
import Submitbutton5 from "../../components/SubmitButton";
import Indicator from "../../components/loadingIndicator";
import React from "react";
import { InputField } from "../../components/inputField";
import { Slider } from "@miblanchard/react-native-slider";
import { IconButton } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
axios.defaults.withCredentials = true;

const windowWidth = Dimensions.get("window").width;

const AddTask = ({ navigation }) => {
  navigation.setOptions({
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
  
  const postTask = async () => {
    if(
      title != "" &&
      description != ""
    ) {
      setCreatingTask(true);
      axios
        .post("https://edu2-8cd5y.ondigitalocean.app/api/tasks/", {
          category_id: dropdownValue,
          internship_id: global.user.internship.id,
          difficulty:
            sliderValue == 0
              ? "easy"
              : sliderValue == 1
              ? "medium"
              : "hard",
          title: title,
          description: description,
          deadline: day.dateString,
        }, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          setCreatingTask(false);
          console.log(response.data)
          setDropdownValue(0);
          setSliderValue(0);
          setTitle("");
          setDescription("");
          setDay({});
        })
        .catch(error => {
          // console.log(JSON.stringify(error));
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setCreatingTask(false);
        });
    } else {
      ToastAndroid.showWithGravity(
        "Please fill in all required fields.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  const [fetchingCategories, setFetchingCategories] = React.useState(false);
  const [creatingTask, setCreatingTask] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dropdownValue, setDropdownValue] = React.useState(0);
  const [sliderValue, setSliderValue] = React.useState(0);
  const [categories, setCategories] = React.useState([
    "Voorbereiding",
    "Te doen",
    "Gedaan",
  ]);
  const [day, setDay] = React.useState({});

  // do once
  React.useEffect(() => {
    (async () => {
      setFetchingCategories(true);
      axios
        .get(
          "https://edu2-8cd5y.ondigitalocean.app/api/users/" +
            global.user.id +
            "/categories"
        )
        .then((response) => {
          console.log(response.data.field_of_study.category);
          setCategories(response.data.field_of_study.category);
          setFetchingCategories(false);
        })
        .catch((error) => {
          setFetchingCategories(false);
          console.log(JSON.stringify(error));
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl
            onRefresh={null}
            refreshing={fetchingCategories}
            colors={["#7EAB92"]}
          />
        }
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Indicator bool={creatingTask} />
        <InputField
          onChangeText={(val) => setTitle(val)}
          placeholder={"Task title"}
          label={"Title"}
        />
        <InputField
          onChangeText={(val) => setDescription(val)}
          placeholder={"Task description"}
          label={"Description"}
        />

        <View style={styles.slider}>
          <Text style={styles.title}>Deadline</Text>
          <Calendar
            style={{
              paddingLeft: 0,
              marginLeft: 0,
              width: "100%",
              backgroundColor: "#EFF2F5",
              borderRadius: 6,
            }}
            theme={{
              borderRadius: 6,
              calendarBackground: "#EFF2F5",
              indicatorColor: "#009882",
              todayTextColor: "#009882",
              arrowColor: "#009882",
            }}
            onDayPress={(day_) => {
              console.log(day_);
              setDay(day_.dateString == day.dateString ? {} : day_);
            }}
            markedDates={{
              [day.dateString]: { selected: true, selectedColor: "#009882" },
            }}
          />
        </View>

        <View style={styles.slider}>
          <Text style={styles.title}>Difficulty</Text>
          <Slider
            // debugTouchArea={true}

            minimumValue={0}
            maximumValue={2}
            animateTransitions={true}
            minimumTrackTintColor="#697D95"
            maximumTrackTintColor="#EFF2F5"
            thumbTintColor="#697D95"
            step={1}
            value={sliderValue}
            trackMarks={[0, 1, 2]}
            onValueChange={(value) => setSliderValue(value)}
          />
        </View>

        <View style={styles.dropDown}>
          <Text style={styles.title}>Category</Text>
          <SelectDropdown
            onChangeValue={(val) => setDropdownValue(val)}
            options={categories}
            initialSelected={categories[0].id}
          ></SelectDropdown>
        </View>

        <View style={styles.btn}>
          <Submitbutton5
            text={"Add task"}
            onPress={postTask}
          />
        </View>
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
  title: {
    fontWeight: "bold",
    paddingBottom: 6,
  },
  slider: {
    paddingTop: 10,
    width: 343,
  },
  dropDown: {
    paddingTop: 10,
  },
  btn: {
    paddingTop: 30,
    alignSelf: "center",
    paddingBottom: 30,
  },
});
export default AddTask;
