import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  requestAuthorization,
  getStepCount,
  getAuthStatus,
  getDistance,
  getActiveEnergyBurned,
} from './AppleHealthKit';

export default function Screen() {
  const [authStatus, setAuthStatus] = useState({});
  const [todayStep, setTodayStep] = useState(0);
  const [todayDistance, setTodayDistance] = useState(0);
  const [todayEnergyBarned, setTodayEnergyBarned] = useState(0);

  useEffect(() => {
    requestAuthorization((error) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
        return;
      }
      getStepCount((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setTodayStep(result);
      });

      getDistance((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setTodayDistance(result);
      });

      getActiveEnergyBurned((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setTodayEnergyBarned(result);
      });
    });
  }, [authStatus]);

  const handlePressGetAuthStatus = () => {
    getAuthStatus((err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      setAuthStatus(result);
    });
  };

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <View>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>React Native Test app</Text>
            <Text>This is iOS</Text>
            <Text onPress={handlePressGetAuthStatus}>
              Press me to get Auth Status
            </Text>
            <Text style={styles.sectionDescription}>
              {JSON.stringify(authStatus, null, 2)}
            </Text>

            <Text style={styles.sectionDescription}>
              Today's steps: {todayStep}
            </Text>

            <Text style={styles.sectionDescription}>
              Today's distance: {todayDistance}
            </Text>

            <Text style={styles.sectionDescription}>
              Today's energy barned: {JSON.stringify(todayEnergyBarned)}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    paddingVertical: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
