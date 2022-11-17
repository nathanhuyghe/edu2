import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { IconButton, FAB, DefaultTheme, RadioButton, } from "react-native-paper";
import TaskListItem from "../../components/taskListItem";
import FilterModal from "../../components/filterModal";
import axios from "axios";
import Pusher from "pusher-js/react-native";
import { useEffect } from "react";
axios.defaults.withCredentials = true;

const mdTheme = {
  ...DefaultTheme,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: "#009882",
    accent: "#009882",
  },
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

Pusher.logToConsole = true;

let pusher = new Pusher("e4de229ec0b7ec3928f0", {
  cluster: "eu",
});

const Tasks = ({ route, navigation }) => {
  useEffect(() => {
    feedback();
    console.log(global.user.id);
  }, []);

  const feedback = () => {
    let channel = pusher.subscribe("feedback.1");
    channel.bind("App\\Events\\feedback", function (data) {
      alert(JSON.stringify(data));
    });
  };
  navigation.setOptions({
    headerLeft: () => <View />,
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconButton
          icon={"filter-variant"}
          onPress={() => {
            setShowFilter(true);
            console.log(showFilter);
          }}
          title="Info"
          color="#000"
          rippleColor="rgba(0, 0, 0, .16)"
        />
        <IconButton
          icon={"refresh"}
          onPress={getTasks}
          title="Info"
          color="#000"
          rippleColor="rgba(0, 0, 0, .16)"
        />
      </View>
    ),
  });

  const [showFilter, setShowFilter] = React.useState(false);
  const [filter, setFilter] = React.useState('Date');
  const [refreshing, setRefreshing] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  const getTasks = async () => {
    setRefreshing(true);
      axios.get("https://edu2-8cd5y.ondigitalocean.app/api/user/" + global.user.id + "/tasks/")
        .then(response => {
          console.log(response.data);
          setTasks(response.data.reverse());
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

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <FilterModal 
        options={['Alphabetical', 'Date', 'Reverse alphabetical']} 
        initialSelected={1}
        onChangeValue={val => setFilter(val)}
        showFilter={showFilter}
        onRequestClose={() => setShowFilter(false)}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getTasks}
            refreshing={refreshing}
            colors={["#7EAB92"]}
          />
        }
      >
        {
          tasks
          ?.sort((x, y) => {
            if(filter == 'Alphabetical')
              return x.title.localeCompare(y.title)
            else if (filter == 'Reverse alphabetical')
              return -(x.title.localeCompare(y.title))
            else if(filter == 'Date')
              return new Date(x.deadline) > new Date(y.deadline) ? -1 : new Date(x.deadline) < new Date(y.deadline) ? 1 : 0
          })
          .map((task) => 
            <TaskListItem
              task={task}
              navigation={navigation}
            />
          )
        }
      </ScrollView>

      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          height: windowHeight - 50,
          width: windowWidth,
          bottom: 20,
          right: 20,
          position: "absolute",
        }}
      >
        <FAB
          icon="plus"
          onPress={() =>
            navigation.navigate("Add Task")
          }
          color="#F0FFF6"
          theme={mdTheme}
        />
      </View>
    </View>
  );
};

export default Tasks;
