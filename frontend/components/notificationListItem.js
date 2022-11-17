import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  RefreshControl, 
  Dimensions,
} from 'react-native';

const notificationListItem = ({title, body}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    width:'100%',
  },
  textContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    fontWeight: "100",
  },
});


export default notificationListItem;