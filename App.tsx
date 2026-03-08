import * as React from 'react';
import { useEffect } from 'react';

import RootStackNavigation from './src/navigation/RootStack';
import { scheduleWaterReminders } from './src/utils/notificationHelper';

export default function App() {
  useEffect(() => {
    scheduleWaterReminders().catch(console.error);
  }, []);

  return <RootStackNavigation />;
}
