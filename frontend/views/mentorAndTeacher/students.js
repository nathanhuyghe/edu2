import React from "react";
import { 
  View,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import StudentListItem from "../../components/studentListItem";
import { IconButton } from "react-native-paper";
import axios from "axios";
axios.defaults.withCredentials = true;

const Students = ({route, navigation}) => {
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
          icon={"account-plus"}
          onPress={() => navigation.navigate("Add Student")}
          title="Info"
          color="#000"
          rippleColor="rgba(0, 0, 0, .16)"
        />
        <IconButton
          icon={"refresh"}
          onPress={getStudents}
          title="Info"
          color="#000"
          rippleColor="rgba(0, 0, 0, .16)"
        />
      </View>
    ),
  });

  const [refreshing, setRefreshing] = React.useState(false);
  const [students, setStudents] = React.useState([]);
  
  const getStudents = async () => {
    setRefreshing(true);
      axios.get("https://edu2-8cd5y.ondigitalocean.app/api/mentor/" + global.user.id + "/students")
        .then(response => {
          console.log(response.data);
          setStudents(response.data);
          setRefreshing(false);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
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
    getStudents();
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={getStudents}
            refreshing={refreshing}
            colors={["#7EAB92"]}
          />
        }
      >
        {
          students
           ?.map((student) => 
              <StudentListItem
                student={student}
                navigation={navigation}
              />
           )
        }
      </ScrollView>
    </View>
  )
}
export default Students;