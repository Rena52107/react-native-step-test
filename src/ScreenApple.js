import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  requestAuthorization,
  getDailyStepCountSamples,
  getStepCount,
  getAuthStatus,
  getDistance,
  getDailyDistanceWalkingRunningSamples,
  getActiveEnergyBurned,
  getDailyActiveEnergyBurnedSamples,
} from './AppleHealthKit';

export default function ScreenApple() {
  const [authStatus, setAuthStatus] = useState({});
  const [todayStep, setTodayStep] = useState(0);
  const [sevenDaysStep, setSevenDaysStep] = useState(0);
  const [todayDistance, setTodayDistance] = useState(0);
  const [sevenDaysDistance, setSevenDaysDistance] = useState(0);
  const [todayEnergyBarned, setTodayEnergyBarned] = useState(0);
  const [sevenDaysEnergyBarned, setSevenDaysEnergyBarned] = useState(0);

  useEffect(() => {
    requestAuthorization((error) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
        return;
      }

      getDailyStepCountSamples((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setSevenDaysStep(result);
      });

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

      getDailyDistanceWalkingRunningSamples((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setSevenDaysDistance(result);
      });

      getActiveEnergyBurned((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setTodayEnergyBarned(result);
      });

      getDailyActiveEnergyBurnedSamples((err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        setSevenDaysEnergyBarned(result);
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
        <ScrollView
          contentInsetAdjustmentBehavior='automatic'
          style={styles.scrollView}
        >
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
                Past 7 days' steps: {JSON.stringify(sevenDaysStep)}
              </Text>

              <Text style={styles.sectionDescription}>
                Today's distance: {todayDistance}
              </Text>
              <Text style={styles.sectionDescription}>
                Past 7 days' distance:
                {JSON.stringify(sevenDaysDistance)}
              </Text>

              <Text style={styles.sectionDescription}>
                Today's energy barned: {JSON.stringify(todayEnergyBarned)}
              </Text>
              <Text style={styles.sectionDescription}>
                Past 7 energy barned:
                {JSON.stringify(sevenDaysEnergyBarned)}
              </Text>
            </View>
          </View>
        </ScrollView>
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
