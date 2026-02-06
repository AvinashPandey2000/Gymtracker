//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// create a component
const DietPlanTab = () => {
    const meals = [
        {
            id: 'before-gym',
            title: 'Morning Before Gym',
            subtitle: 'Energy & Fuel',
            time: '06:30 AM',
            icon: 'M',
            color: '#FDE68A',
            iconText: '#B45309',
        },
        {
            id: 'after-gym',
            title: 'Morning After Gym',
            subtitle: 'Recovery',
            time: '08:30 AM',
            icon: 'A',
            color: '#BFDBFE',
            iconText: '#1D4ED8',
        },
        {
            id: 'lunch',
            title: 'Lunch',
            subtitle: 'Balanced Meal',
            time: '01:00 PM',
            icon: 'L',
            color: '#BBF7D0',
            iconText: '#047857',
        },
        {
            id: 'snacks',
            title: 'Snacks',
            subtitle: 'Metabolism Boost',
            time: '04:30 PM',
            icon: 'S',
            color: '#FED7AA',
            iconText: '#C2410C',
        },
        {
            id: 'dinner',
            title: 'Dinner',
            subtitle: 'Night Repair',
            time: '08:00 PM',
            icon: 'D',
            color: '#E0E7FF',
            iconText: '#3730A3',
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Daily Overview</Text>
            <Text style={styles.subtitle}>
                Follow your personalized nutrition schedule for peak performance.
            </Text>

            <View style={styles.list}>
                {meals.map((meal) => (
                    <View key={meal.id} style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: meal.color }]}>
                            <Text style={[styles.iconText, { color: meal.iconText }]}>
                                {meal.icon}
                            </Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{meal.title}</Text>
                            <Text style={styles.cardSubtitle}>
                                {meal.subtitle} - {meal.time}
                            </Text>
                        </View>
                        <Text style={styles.chevron}>{'>'}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 20,
    },
    list: {
        paddingBottom: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        shadowColor: '#111827',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    iconText: {
        fontSize: 16,
        fontWeight: '700',
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    chevron: {
        fontSize: 18,
        color: '#9CA3AF',
        marginLeft: 8,
    },
});

//make this component available to the app
export default DietPlanTab;
