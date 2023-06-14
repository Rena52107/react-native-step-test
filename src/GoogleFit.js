import GoogleFit, { Scopes } from 'react-native-google-fit';

/* Permission options */
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    // Scopes.FITNESS_BODY_READ,
    // Scopes.FITNESS_BODY_WRITE,
  ],
};

// initialize permissions
export async function authorizeFit() {
  try {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    const authResult = await GoogleFit.authorize(options);
    if (authResult.success) {
      return authResult;
    } else {
      throw new Error(authResult.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

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
export const getStepCount = async () => {
  const opt = {
    startDate: today.toISOString(),
    endDate: new Date().toISOString(),
    bucketInterval: 1,
  };

  try {
    const authResult = await authorizeFit(); // authorizeFit 関数を呼び出す
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    console.log(res);
    return res[1].steps[0].value;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getDistance = async () => {
  const opt = {
    startDate: today.toISOString(),
    endDate: new Date().toISOString(),
    bucketInterval: 1,
  };

  try {
    const authResult = await authorizeFit(); // authorizeFit 関数を呼び出す
    const res = await GoogleFit.getDailyDistanceSamples(opt);
    console.log(res);
    return res[1].steps[0].value;
  } catch (error) {
    throw new Error(error.message);
  }
};

// // Daily step count for the past 7 days
// export const getDailyStepCountSamples = (callback) => {
//   // Past 7 days to today
//   let options = {
//     startDate: sevenDaysAgo.toISOString(),
//     endDate: today.toISOString(),
//   };

//   AppleHealthKit.getDailyStepCountSamples(options, function (err, results) {
//     if (err) {
//       console.error('Error in getDailyStepCountSamples: ', err);
//       callback(err, null);
//       return;
//     }
//     const data = results;
//     const dailySteps = {};

//     // calculate step count on each day
//     data.forEach((entry) => {
//       const startDate = entry.startDate.split('T')[0];
//       const value = entry.value;

//       if (dailySteps[startDate]) {
//         dailySteps[startDate] += value; // update step count
//       } else {
//         dailySteps[startDate] = value; // add new step count
//       }
//     });

//     // console.log('getDailyStepCountSamples: ', dailySteps);
//     callback(null, dailySteps);
//   });
// };

// // Today's current distance
// export const getDistance = (callback) => {
//   let options = {
//     includeManuallyAdded: true, // for iOS simulator, inlude data manually added
//   };

//   AppleHealthKit.getDistanceWalkingRunning(options, function (err, result) {
//     if (err) {
//       console.error('Error in getStepCount:', err);
//       callback(err, null);
//       return;
//     }

//     callback(null, result.value);
//     // console.log('getDistance: ', result.value);
//   });
// };

// // Distance for the past 7 days
// export const getDailyDistanceWalkingRunningSamples = (callback) => {
//   // Past 7 days to today
//   let options = {
//     startDate: sevenDaysAgo.toISOString(),
//     endDate: today.toISOString(),
//   };

//   AppleHealthKit.getDailyDistanceWalkingRunningSamples(
//     options,
//     function (err, results) {
//       if (err) {
//         console.error('Error in getDailyDistanceWalkingRunningSamples: ', err);
//         callback(err, null);
//         return;
//       }
//       const data = results;
//       const dailyDistances = {};

//       // calculate distance on each day
//       data.forEach((entry) => {
//         const startDate = entry.startDate.split('T')[0];
//         const value = entry.value;

//         if (dailyDistances[startDate]) {
//           dailyDistances[startDate] += value;
//         } else {
//           dailyDistances[startDate] = value;
//         }
//       });

//       //   console.log('getDailyDistanceWalkingRunningSamples: ', dailyDistances);
//       callback(null, dailyDistances);
//     }
//   );
// };

// // Today's current Active Energy Burned
// export const getActiveEnergyBurned = (callback) => {
//   let options = {
//     startDate: today.toISOString(),
//   };

//   AppleHealthKit.getActiveEnergyBurned(options, function (err, results) {
//     if (err) {
//       console.error('Error in getDailyActiveEnergyBurnedSamples: ', err);
//       callback(err, null);
//       return;
//     }
//     const data = results;
//     const dailyEnergyBarned = {};

//     // calculate distance on each day
//     data.forEach((entry) => {
//       const startDate = entry.startDate.split('T')[0];
//       const value = entry.value;

//       if (dailyEnergyBarned[startDate]) {
//         dailyEnergyBarned[startDate] += value;
//       } else {
//         dailyEnergyBarned[startDate] = value;
//       }
//     });

//     // console.log('getActiveEnergyBurned: ', dailyEnergyBarned);
//     callback(null, dailyEnergyBarned);
//   });
// };

// // Active Energy Burned for the past 7 days
// export const getDailyActiveEnergyBurnedSamples = (callback) => {
//   // Past 7 days to today
//   let options = {
//     startDate: sevenDaysAgo.toISOString(),
//     endDate: today.toISOString(),
//   };

//   AppleHealthKit.getActiveEnergyBurned(options, function (err, results) {
//     if (err) {
//       console.error('Error in getDailyActiveEnergyBurnedSamples: ', err);
//       callback(err, null);
//       return;
//     }
//     const data = results;
//     const dailyEnergyBarned = {};

//     // calculate distance on each day
//     data.forEach((entry) => {
//       const startDate = entry.startDate.split('T')[0];
//       const value = entry.value;

//       if (dailyEnergyBarned[startDate]) {
//         dailyEnergyBarned[startDate] += value;
//       } else {
//         dailyEnergyBarned[startDate] = value;
//       }
//     });

//     // console.log('getDailyActiveEnergyBurnedSamples: ', dailyEnergyBarned);
//     callback(null, dailyEnergyBarned);
//   });
// };
