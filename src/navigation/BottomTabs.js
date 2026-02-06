import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import WorkOutTab from '../screen/workout';
import DietPlanTab from '../screen/dietPlan';
import HistoryTab from '../screen/history';
import ProfileTab from '../screen/profile';
import Images from '../assets/images';

const TAB_ICONS = {
  Workout: Images.Workout,
  DietPlan: Images.DietPlan,
  History: Images.History,
  Profile: Images.Profile,
};

const Tabs = createBottomTabNavigator({
  screens: {
    Workout: WorkOutTab,
    DietPlan: DietPlanTab,
    History: HistoryTab,
    Profile: ProfileTab,
  },
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ color, size }) => (
      <Image
        source={TAB_ICONS[route.name]}
        style={{ width: size, height: size, tintColor: color }}
        resizeMode="contain"
      />
    ),
  }),
});

const Navigation = createStaticNavigation(Tabs);

export default function BottomTabs() {
  return <Navigation />;
}
