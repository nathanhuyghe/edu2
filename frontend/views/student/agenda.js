import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Pressable,
  ToastAndroid,
} from "react-native";
import { Calendar } from "react-native-calendars";
import axios from "axios";
axios.defaults.withCredentials = true;

const AgendaView = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => <View />,
    headerRight: () => <View />,
  });

  const getTasks = async () => {
    setRefreshing(true);
    axios.get("https://edu2-8cd5y.ondigitalocean.app/api/user/" + global.user.id + "/tasks/")
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          error.response.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setRefreshing(false);
      }
    );
  };

  React.useEffect(() => {
    getTasks();
  }, []);

  const onRefresh = React.useCallback(async () => {
    getTasks();
  }, [refreshing]);

  const monthName = (m) =>
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][m - 1];

  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const date = (day, month) => day + nth(day) + " of " + monthName(month);

  const [day, setDay] = React.useState({});
  const [tasks, setTasks] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [markedDates, setMarkedDates] = React.useState({});

  React.useEffect(() => {
    let dates = {[day.dateString]: { selected: true, selectedColor: "#009882" }};
    tasks.map(task => task.deadline == day.dateString ? null : 
      dates[task.deadline] = { marked: true , dotColor: 
        task.difficulty == "easy"
      ? "#009882"
      : task.difficulty == "medium"
      ? "#999708"
      : "#99380F"
    });
    setMarkedDates(dates);
  }, [tasks, day]);

  return (
    <View style={styles.containerStyle}>
      <Calendar
        theme={{
          indicatorColor: "#009882",
          todayTextColor: "#009882",
          arrowColor: "#009882",
        }}
        onDayPress={(day_) => {
          console.log(day_);
          setDay(day_.dateString == day.dateString ? {} : day_);
        }}
        markedDates={markedDates}
      />
      <View style={{ height: "57.4%", paddingTop: 16 }}>
        {day.day != undefined ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{date(day.day, day.month)}</Text>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              refreshControl={
                <RefreshControl
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                  colors={["#7EAB92", "#AB736D", "#ABA376"]}
                />
              }
            >
              {tasks ? (
                tasks
                  .filter(
                    (task) =>
                      new Date(task.deadline) >= new Date(day.dateString) &&
                      task.stopped_at == null
                  )
                  .map((task) => (
                    <View
                      style={
                        task.difficulty == "easy"
                          ? styles.easy
                          : task.difficulty == "medium"
                          ? styles.medium
                          : styles.hard
                      }
                    >
                      <Pressable
                        android_ripple={{
                          color: "#ffffff40",
                          borderless: true,
                        }}
                        onPress={() =>
                          navigation.navigate("Task Details", {
                            task_id: task.id,
                            title: task.title
                          })
                        }
                      >
                        <Text style={styles.text}>{task.title}</Text>
                        <Text style={styles.text}>{task.description}</Text>
                      </Pressable>
                    </View>
                  ))
              ) : (
                <View />
              )}
            </ScrollView>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    width: 343,
    marginBottom: 10,
    paddingLeft: 16,
  },
  easy: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 18,
    width: "100%",
    backgroundColor: "#009882",
    borderRadius: 6,
    elevation: 0,
  },
  medium: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 18,
    width: "100%",
    backgroundColor: "#999708",
    borderRadius: 6,
    elevation: 0,
  },
  hard: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 18,
    width: "100%",
    backgroundColor: "#99380F",
    borderRadius: 6,
    elevation: 0,
  },
  text: {
    color: "#fff",
  },
});

export default AgendaView;
