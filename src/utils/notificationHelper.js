import notifee, { TriggerType, TimeUnit, AndroidImportance } from '@notifee/react-native';

export async function requestNotificationPermissions() {
    await notifee.requestPermission();
}

export async function scheduleWaterReminders() {
    await requestNotificationPermissions();

    // We should make sure we're set up for Android
    const channelId = await notifee.createChannel({
        id: 'water-reminder-bubble',
        name: 'Water Reminder Channel',
        importance: AndroidImportance.HIGH,
        sound: 'bubblesound',
    });

    // Cancel any existing daily triggers so we don't spam if this runs multiple times
    await notifee.cancelAllNotifications();

    // Create a repeating notification every 15 minutes (Minimum allowed by OS)
    const trigger = {
        type: TriggerType.INTERVAL,
        interval: 15,
        timeUnit: TimeUnit.MINUTES,
    };

    await notifee.createTriggerNotification(
        {
            id: 'water-reminder-interval-15m',
            title: 'Time to Hydrate! 💧',
            body: "It's time to drink a glass of water. Keep up the good work!",
            android: {
                channelId,
                smallIcon: 'ic_launcher',
            },
            ios: {
                sound: 'bubblesound.mp3',
            },
        },
        trigger,
    );
}
