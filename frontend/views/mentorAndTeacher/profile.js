import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import { 
  Avatar
} from "react-native-paper";
import { IconButton, FAB, DefaultTheme } from "react-native-paper";
import FlatButton from '../../components/SubmitButton.js';

const Profile = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => (
      <View />
    ),
    headerRight: () => (
      <View />
    ),
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 10 }}>
      <View style={styles.row}>
        <Avatar.Text
          style={{ backgroundColor: "#009882" }}
          size={90}
          label={global.user.firstname.charAt(0) + global.user.name.charAt(0)}
        />
        <View styles={styles.textBlock}>
          <Text style={styles.name}>{global.user.firstname} {global.user.name}</Text>
          <Text style={styles.email}>{global.user.email}</Text>
        </View>
      </View>
      <View style={styles.column}>
        <View style={{ height: 20 }} />
        <FlatButton text="View students" onPress={() => navigation.getParent().navigate('Studenten')} width={343} />
      </View>
      <View styles={styles.logout}>
        <Pressable onPress={() => {
          // remove session variables / cookie
          // navigate to 'login' in parent of parent navigator
          navigation.getParent().navigate("Login");
        }}>
          <Text style={{
            paddingTop: 16,
            fontWeight: 'bold',
            fontSize: 16,
            textDecorationLine: 'underline',
            color: '#F00'
          }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 90,
    height: 90,
  },
  row: {
    width: 343,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    // marginTop: 50
  },
  infobox: {
    marginTop: 20
  },
  textBlock: {
    flexDirection: "column",
    marginTop: 60
    ,
    marginLeft: 20,
    justifyContent: 'center', alignItems: 'center'
  },
  name: {
    marginTop: 50,
    marginLeft: 20,
    fontWeight: 'bold'
  },
  email: {
    marginLeft: 20
  },
  logout: {
    marginLeft: 130,
    color: '#FF0000'
  }
});
export default Profile;