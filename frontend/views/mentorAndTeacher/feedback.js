import React from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { IconButton } from "react-native-paper";
import FeedbackListItem from "../../components/feedbackListItem";
import FilterModal from "../../components/filterModal";
import axios from "axios";
axios.defaults.withCredentials = true;

const Feedback= ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => (
      <View/>
    ),
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
          .filter((task) =>
              task.requested_feedback == 1 && task.feedback == null
          )
          .map((task) => 
            <FeedbackListItem
              task={task}
              navigation={navigation}
            />
          )
        }
      </ScrollView>
    </View>
  );
};

export default Feedback;