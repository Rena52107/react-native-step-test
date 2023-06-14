import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  getStepCount,
} from './GoogleFit';

export default function Screen() {
  const [authStatus, setAuthStatus] = useState(false);
  const [todayStep, setTodayStep] = useState(0);
  const [sevenDaysStep, setSevenDaysStep] = useState(0);
  const [todayDistance, setTodayDistance] = useState(0);

  useEffect(() => {
    async function test() {
      try {
        const steps = await getStepCount();
        setTodayStep(steps);
        const distance = await getStepCount();
        setTodayStep(steps);
        const calories = await getStepCount();
        setTodayStep(steps);

      } catch (error) {
        console.log('Error :', error.message);
      }
    }
    test();
    // ...
  }, []);

  return (
    <View style={styles.container}>
      <Text>stepData: {todayStep}</Text>
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
