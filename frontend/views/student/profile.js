import React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Alert, 
  Pressable ,
  Modal,
} from "react-native";
import { 
  IconButton,
  Avatar
} from "react-native-paper";
import FlatButton from "../../components/SubmitButton.js";
import axios from "axios";
import Badges from '../../assets/badges';
axios.defaults.withCredentials = true;

const Profile = ({ route, navigation }) => {
  navigation.setOptions({
    headerLeft: () => <View />,
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconButton
          icon={"account-plus"}
          onPress={() => navigation.navigate("Add Mentor")}
          title="Info"
          color="#000"
          rippleColor="rgba(0, 0, 0, .16)"
        />
      </View>
    ),
  });
  
  const [badges, setBadges] = React.useState([]);
  const [showBadges, setShowBadges] = React.useState(false);
  
  React.useEffect(() => {
    axios.get("https://edu2-8cd5y.ondigitalocean.app/api/user/" + global.user.id + "/badges/")
      .then(response => {
        console.log(response.data);
        console.log(global.user);
        setBadges(response.data);
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
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 10,
      }}
    >
      <Modal animationType="fade" transparent={true} visible={showBadges} statusBarTranslucent={true} onRequestClose={() => setShowBadges(false)}>
        <Pressable 
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000077',
          }}
          onPress={() => setShowBadges(false)}
        >
          <Pressable
            style={{
              backgroundColor: '#fff',
              borderRadius: 6,
              padding: 9,
              paddingRight: 12, 
              paddingLeft: 12,
            }}
          >
            <Text style={{
              fontWeight: "bold",
              fontSize: 20,
              width: 343,
              marginBottom: 10,
            }}>
              Badges:
            </Text>
            {
              Object.entries(badges)?.filter(([_, level]) => level != 0)
                .map(([badge, level], index) =>  
                <View
                  key={index}
                  style={{
                    padding: 10,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                > 
                  <Image
                    style={{
                      height: 75,
                      width: 75,
                      marginLeft: 5,
                      marginTop: 5,
                    }}
                    source={Badges[badge + level]}
                  />
                  <Text style={{fontWeight: 'bold', fontSize:15}}>{badge}</Text>
                  <Text style={{fontStyle: 'italic'}}>{badge}</Text>
                </View>
              )
            }
          </Pressable>
        </Pressable>
      </Modal>
      <View style={styles.row}>
        <View style={styles.column}>
          <Avatar.Text 
            style={{backgroundColor: "#009882"}}
            size={90} 
            label={global.user.firstname.charAt(0) + global.user.name.charAt(0)}
          />
          <View style={styles.badgeContainer}>
            {
              Object.entries(badges)?.filter(([_, level]) => level != 0)
                .map(([badge, level], index) =>   
                <Image
                  key={index}
                  style={{
                    height: 25,
                    width: 25,
                    marginLeft: 5,
                    marginTop: 5,
                  }}
                  source={Badges[badge + level]}
                />
              )
            }
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.name}>{global.user.firstname} {global.user.name}</Text>
          <Text style={styles.email}>{global.user.email}</Text>
        </View>
      </View>
      <View style={styles.infobox}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={{ fontWeight: "bold", marginRight: 10, width: 100 }}>
              School
            </Text>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>Mentor</Text>
            <Text style={{ fontWeight: "bold", marginRight: 10 }}>
              Leerkracht
            </Text>
          </View>
          <View style={styles.column}>
            <Text>{global.user.company?.name}</Text>
            <Text>{global.user.internship?.mentor?.name}</Text>
            <Text>{global.user.internship?.teacher?.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.column}>
        <View style={{ height: 10 }} />
        <FlatButton
          text="View statistics"
          onPress={() => navigation.navigate("Statistics", {id: global.user.id})}
          width={343}
        />
        <View style={{ height: 10 }} />
        <FlatButton
          text="Completed tasks"
          onPress={() => navigation.navigate("Completed Tasks")}
          width={343}
        />
        <View style={{ height: 10 }} />
        <FlatButton 
          text="Show badges"
          onPress={() => setShowBadges(true)}
          width={343}
        />
      </View>
      <Pressable
        onPress={() => {
          // remove session variables / cookie
          global.user = {};
          // navigate to 'login' in parent of parent navigator
          navigation.getParent().getParent().navigate("Login");
        }}
      >
        <Text
          style={{
            paddingTop: 16,
            fontWeight: "bold",
            fontSize: 16,
            textDecorationLine: "underline",
            color: "#F00",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 60,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  container: {
    paddingTop: 50,
    paddingLeft: 40,
    flex: 1,
    backgroundColor: "#fff",
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
  infobox: {
    marginTop: 20,
  },
  textBlock: {
    flexDirection: "column",
    marginTop: 60,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: 50,
    marginLeft: 20,
    fontWeight: "bold",
  },
  email: {
    marginLeft: 20,
  },
  logout: {
    marginLeft: 130,
    marginTop: 20,
    color: "#FF0000",
  },
});
export default Profile;
