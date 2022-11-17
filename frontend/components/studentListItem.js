import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import FlatButton from '../components/SubmitButton.js';
import { 
  Avatar
} from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StudentListItem = ({ student, navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    console.log(student);
  }, []);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000077'
        }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <Pressable style={styles.modalView}>
              <View style={styles.row}>
                <Avatar.Text 
                  style={{backgroundColor: "#009882"}}
                  size={55} 
                  label={student.student.firstname.charAt(0) + student.student.name.charAt(0)}
                />
                <View styles={styles.textBlock}>
                  <Text style={styles.name}>{student.student.firstname} {student.student.name}</Text>
                  <Text style={styles.email}>{student.student.email}</Text>
                  <Text style={styles.email}>{student.company.name}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={{ height: 10 }} />
                <FlatButton text="View statistics" onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Statistics", {
                    id: student.id
                  });
                }} />
                <View style={{ height: 10 }} />
                <FlatButton text="Completed tasks" onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Completed Tasks", {
                    id: student.id
                  });
                }} />
                <View style={{ height: 10 }} />
                <FlatButton text="Add task" onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Add Task", {
                    id: student.id
                  });
                }} />
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <View>
        <Pressable
        style = {{
          width: windowWidth,
          paddingLeft: 15,
          paddingTop: 10
        }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{
            flexDirection: "row",
          }}>
            <Avatar.Text 
              style={{backgroundColor: "#009882"}}
              size={55} 
              label={student.student.firstname.charAt(0) + student.student.name.charAt(0)}
            />
            <View styles={styles.textBlock}>
              <Text style={styles.name}>{student.student.firstname} {student.student.name}</Text>
              <Text style={styles.email}>{student.student.email}</Text>
              <Text style={styles.email}>{student.company.name}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 6,
    margin: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "white",
    borderRadius: 0,
    width: 343,
    height: 70,
    marginTop: 20
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 13,
    elevation: 2,
    width: 90,
    height: 50,
    marginTop: 15
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  row: {
    width: 250,
    flexDirection: "row",
  },
  textBlock: {
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 0,
    justifyContent: 'center', alignItems: 'center'
  },
  name: {
    marginLeft: 20,
    fontWeight: 'bold'
  },
  email: {
    marginLeft: 20
  },
});


export default StudentListItem;