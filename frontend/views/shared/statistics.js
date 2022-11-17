import React from 'react';
import { useEffect } from "react";
import axios from "axios";
import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';

import {
  LineChart,
} from "react-native-chart-kit";
import { Slider } from "@miblanchard/react-native-slider";

const Statistics = ({ route, navigation }) => {
  
    const { id } = route.params;

  const [stats, setStats] = React.useState([
    Math.random() * 1,
    Math.random() * 1,
    Math.random() * 1,
    Math.random() * 1,
    Math.random() * 1,
    Math.random() * 1,
    Math.random() * 1]);

  const getStats = () => {
    axios.get("https://edu2-8cd5y.ondigitalocean.app/api/user/" + id + "/stats/" + (28 - sliderValue)).then((response) => {
        setStats(response.data)
      })
  };

  const [sliderValue, setSliderValue] = React.useState(28);

  var data1 = {
    labels: [Object.keys(stats)[0], Object.keys(stats)[2], Object.keys(stats)[4], Object.keys(stats)[6]],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [
        Object.values(stats)[0],
        Object.values(stats)[1],
        Object.values(stats)[2],
        Object.values(stats)[3],
        Object.values(stats)[4],
        Object.values(stats)[5],
        Object.values(stats)[6]]
    }]
  };

  useEffect(() => {
    getStats()
  }, [])

  return(
<View>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <Text></Text>
  <LineChart
    data={data1}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    fromZero={true}
    xAxisLabel=""
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={2} // optional, defaults to 1
    chartConfig={{
      data: data1,
      backgroundColor: "#007F6D",
      backgroundGradientFrom: "#007F6D",
      backgroundGradientTo: "#007F6D",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#007F6D"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <Text></Text>
  <Text>    4                   3                     2                     1                    0</Text>
  <Slider
            // debugTouchArea={true}

            minimumValue={0}
            maximumValue={28}
            animateTransitions={true}
            minimumTrackTintColor="#697D95"
            maximumTrackTintColor="#EFF2F5"
            thumbTintColor="#007F6D"
            step={7}
            value={sliderValue}
            trackMarks={[0, 1, 2]}
            onValueChange={(value) => setSliderValue(value) & getStats()}
          />
          
  <Text> weeks ago</Text>
</View>
  )
}

export default Statistics;
