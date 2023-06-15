import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getStepCount, getDistance, getCalories } from './GoogleFit';

export default function Screen() {
  const [authStatus, setAuthStatus] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    async function test() {
      try {
        const stepResult = await getStepCount();
        setSteps(stepResult);
        const distanceResult = await getDistance();
        setDistance(distanceResult);
        const caloriesResult = await getCalories();
        setCalories(caloriesResult);
      } catch (error) {
        console.log('Error :', error.message);
      }
    }
    test();
  }, []);

  return (
    <View style={styles.container}>
      <Text>step: {steps.value}</Text>
      <Text>distance: {distance.distance}</Text>
      <Text>calories: {calories.calorie}</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
