import AppleHealthKit from 'react-native-health';

/* Permission options */
const params = AppleHealthKit.Constants.Permissions;
const permissions = {
  permissions: {
    read: [
      params.Steps,
      params.ActiveEnergyBurned,
      params.DistanceWalkingRunning,
    ],
    write: [],
  },
};

// initialize permissions
export const requestAuthorization = (callback) => {
  AppleHealthKit.initHealthKit(permissions, (error) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null);
  });
};

export const getAuthStatus = (callback) => {
  AppleHealthKit.getAuthStatus(permissions, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};

// GET health info
// date constant
const today = new Date();
const sevenDaysAgo = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);
today.setHours(0, 0, 0, 0);

// Today's current step count
export const getStepCount = (callback) => {
  let options = {
    includeManuallyAdded: true, // for iOS simulator, inlude data manually added
  };

  AppleHealthKit.getStepCount(options, function (err, result) {
    if (err) {
      console.error('Error in getStepCount:', err);
      callback(err, null);
      return;
    }

    // console.log('Current daily step(getStepCount):', result.value);
    callback(null, result.value);
  });
};

// Daily step count for the past 7 days
export const getDailyStepCountSamples = (callback) => {
  // Past 7 days to today
  let options = {
    startDate: sevenDaysAgo.toISOString(),
    endDate: today.toISOString(),
  };

  AppleHealthKit.getDailyStepCountSamples(options, function (err, results) {
    if (err) {
      console.error('Error in getDailyStepCountSamples: ', err);
      callback(err, null);
      return;
    }
    const data = results;
    const dailySteps = {};

    // calculate step count on each day
    data.forEach((entry) => {
      const startDate = entry.startDate.split('T')[0];
      const value = entry.value;

      if (dailySteps[startDate]) {
        dailySteps[startDate] += value; // update step count
      } else {
        dailySteps[startDate] = value; // add new step count
      }
    });

    // console.log('getDailyStepCountSamples: ', dailySteps);
    callback(null, dailySteps);
  });
};

// Today's current distance
export const getDistance = (callback) => {
  let options = {
    includeManuallyAdded: true, // for iOS simulator, inlude data manually added
  };

  AppleHealthKit.getDistanceWalkingRunning(options, function (err, result) {
    if (err) {
      console.error('Error in getStepCount:', err);
      callback(err, null);
      return;
    }

    callback(null, result.value);
    // console.log('getDistance: ', result.value);
  });
};

// Distance for the past 7 days
export const getDailyDistanceWalkingRunningSamples = (callback) => {
  // Past 7 days to today
  let options = {
    startDate: sevenDaysAgo.toISOString(),
    endDate: today.toISOString(),
  };

  AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    options,
    function (err, results) {
      if (err) {
        console.error('Error in getDailyDistanceWalkingRunningSamples: ', err);
        callback(err, null);
        return;
      }
      const data = results;
      const dailyDistances = {};

      // calculate distance on each day
      data.forEach((entry) => {
        const startDate = entry.startDate.split('T')[0];
        const value = entry.value;

        if (dailyDistances[startDate]) {
          dailyDistances[startDate] += value;
        } else {
          dailyDistances[startDate] = value;
        }
      });

      //   console.log('getDailyDistanceWalkingRunningSamples: ', dailyDistances);
      callback(null, dailyDistances);
    }
  );
};

// Today's current Active Energy Burned
export const getActiveEnergyBurned = (callback) => {
  let options = {
    startDate: today.toISOString(), 
  };

  AppleHealthKit.getActiveEnergyBurned(options, function (err, results) {
    if (err) {
        console.error('Error in getDailyActiveEnergyBurnedSamples: ', err);
        callback(err, null);
        return;
      }
      const data = results;
      const dailyEnergyBarned = {};
  
      // calculate distance on each day
      data.forEach((entry) => {
        const startDate = entry.startDate.split('T')[0];
        const value = entry.value;
  
        if (dailyEnergyBarned[startDate]) {
          dailyEnergyBarned[startDate] += value;
        } else {
          dailyEnergyBarned[startDate] = value;
        }
      });
  
      // console.log('getActiveEnergyBurned: ', dailyEnergyBarned);
      callback(null, dailyEnergyBarned);
    });
};

// Active Energy Burned for the past 7 days
export const getDailyActiveEnergyBurnedSamples = (callback) => {
  // Past 7 days to today
  let options = {
    startDate: sevenDaysAgo.toISOString(),
    endDate: today.toISOString(),
  };

  AppleHealthKit.getActiveEnergyBurned(options, function (err, results) {
    if (err) {
      console.error('Error in getDailyActiveEnergyBurnedSamples: ', err);
      callback(err, null);
      return;
    }
    const data = results;
    const dailyEnergyBarned = {};

    // calculate distance on each day
    data.forEach((entry) => {
      const startDate = entry.startDate.split('T')[0];
      const value = entry.value;

      if (dailyEnergyBarned[startDate]) {
        dailyEnergyBarned[startDate] += value;
      } else {
        dailyEnergyBarned[startDate] = value;
      }
    });

    // console.log('getDailyActiveEnergyBurnedSamples: ', dailyEnergyBarned);
    callback(null, dailyEnergyBarned);
  });
};



