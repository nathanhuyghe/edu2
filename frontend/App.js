import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";

//shared
import Login from "./views/shared/login";
import Statistics from "./views/shared/statistics";
import Register from "./views/shared/register";
import notifications from "./views/shared/notifications";
import ChatRoomSelection from "./views/shared/chatRoomSelection";
import Container from "./views/shared/container";
import MessageContainer from "./views/shared/messageContainer";
import Chat from "./views/shared/chat";
import ChatPerson from "./views/shared/chatPerson";

// student
import agenda from "./views/student/agenda";
import profile from "./views/student/profile";
import tasks from "./views/student/tasks";
import completedTasks from "./views/student/completedTasks";
import taskDetails from "./views/student/taskDetails";
import addTask from "./views/student/addTask";
import addMentor from "./views/student/addMentor";

//mentorteacher
import profilet from "./views/mentorAndTeacher/profile";
import AddStudent from "./views/mentorAndTeacher/addStudent";
import AddTaskToStudent from "./views/mentorAndTeacher/addTask";
import completedTasksT from "./views/mentorAndTeacher/completedtasks";
import Feedback from "./views/mentorAndTeacher/feedback";
import AddFeedback from "./views/mentorAndTeacher/addFeedback";
import Students from "./views/mentorAndTeacher/students";
import Pusher from "pusher-js/react-native";

Pusher.logToConsole = true;

let pusher = new Pusher("e4de229ec0b7ec3928f0", {
  cluster: "eu",
});

let channel = pusher.subscribe("my-event");

channel.bind("my-event", function (data) {
  alert(JSON.stringify(data));
});

let screenOptions = {
  tabBarActiveTintColor: "#009882",
  tabBarStyle: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 5,
  },
  tabBarLabelPosition: "below-icon",
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerStyle: {
    elevation: 1,
    shadowOpacity: 1,
    borderBottomWidth: 0.5,
  },
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let TaskNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Tasks" component={tasks} />
      <Stack.Screen name="Task Details" component={taskDetails} />
      <Stack.Screen name="Add Task" component={addTask} />
    </Stack.Navigator>
  );
};

let AgendaNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Agenda" component={agenda} />
      <Stack.Screen name="Task Details" component={taskDetails} />
    </Stack.Navigator>
  );
};

let StudentProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Profile" component={profile} />
      <Stack.Screen name="Add Mentor" component={addMentor} />
      <Stack.Screen name="Completed Tasks" component={completedTasks} />
      <Stack.Screen name="Task Details" component={taskDetails} />
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
};

function StudentNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="TaskNavigator"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="AgendaNavigator"
        component={AgendaNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Agenda",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskNavigator"
        component={TaskNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Task",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={StudentProfileNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

let MentorStudentsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Students" component={Students} />
      <Stack.Screen name="Add Student" component={AddStudent} />
      <Stack.Screen name="Add Task" component={AddTaskToStudent} />
      <Stack.Screen name="Completed Tasks" component={completedTasksT} />
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
};

let FeedbackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Add Feedback" component={AddFeedback} />
    </Stack.Navigator>
  );
};

let ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
          shadowOpacity: 1,
          borderBottomWidth: 0.5,
        },
      }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatPerson" component={ChatPerson} />
    </Stack.Navigator>
  );
};

let MentorNavigation = () => {
  return (
    <Tab.Navigator
      // initialRouteName=""
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Studenten"
        component={MentorStudentsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Students",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="forum" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FeedbackNavigator"
        component={FeedbackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Feedback",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profilet}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

let TeacherNavigation = () => {
  return (
    <Tab.Navigator
      // initialRouteName=""
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00000000" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Student" component={StudentNavigation} />
        <Stack.Screen name="Mentor" component={MentorNavigation} />
        <Stack.Screen name="Teacher" component={MentorNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
