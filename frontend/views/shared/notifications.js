import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  RefreshControl, 
  Dimensions,
} from 'react-native';
import NotificationListItem from '../../components/notificationListItem';

const windowWidth  = Dimensions.get('window').width;
const windowHeight  = Dimensions.get('window').height;

const Notifications = ({route, navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(async () => { 
    setRefreshing(true);
  }, [refreshing]);

  return(
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={["#7EAB92", "#d9aaaa"]}/>
      }>
          <NotificationListItem title={"Alert!"} body={"Sunt velit in cupidatat incididunt tempor ex."}/>
          <NotificationListItem title={"Cupidatat nostrud"} body={"Anim quis laboris ea sunt ea occaecat consectetur deserunt."}/>
          <NotificationListItem title={"Officia"} body={"Esse aliquip cupidatat ipsum Lorem id consequat veniam aliquip dolor aute incididunt."}/>
      </ScrollView>
    </View>
  )
}

export default Notifications;