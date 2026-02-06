import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTabs';
import MuscleGroupDetails from '../screen/workout/MuscleGroupDetails';
import HistoryDetail from '../screen/history/HistoryDetail';

const RootStack = createNativeStackNavigator({
  screens: {
    Tabs: {
      screen: BottomTabs,
      options: {
        headerShown: false,
      },
    },
    MuscleGroup: {
      screen: MuscleGroupDetails,
      options: {
        title: 'Workout',
      },
    },
    HistoryDetail: {
      screen: HistoryDetail,
      options: ({ route }) => ({
        title: route?.params?.title ?? 'History',
      }),
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function RootStackNavigation() {
  return <Navigation />;
}
