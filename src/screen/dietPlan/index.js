//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Images from '../../assets/images';

// create a component
const DietPlanTab = () => {
    const meals = [
        {
            id: 'before-gym',
            title: 'Morning Before Gym',
            subtitle: 'Energy & Fuel',
            time: '06:30 AM',
            icon: Images.earlySun,
            color: '#FDE68A',
        },
        {
            id: 'after-gym',
            title: 'Morning After Gym',
            subtitle: 'Recovery',
            time: '08:30 AM',
            icon: Images.weightBar,
            color: '#BFDBFE',
        },
        {
            id: 'lunch',
            title: 'Lunch',
            subtitle: 'Balanced Meal',
            time: '01:00 PM',
            icon: Images.DietPlan,
            color: '#BBF7D0',
        },
        {
            id: 'snacks',
            title: 'Snacks',
            subtitle: 'Metabolism Boost',
            time: '04:30 PM',
            icon: Images.snackes,
            color: '#FED7AA',
        },
        {
            id: 'dinner',
            title: 'Dinner',
            subtitle: 'Night Repair',
            time: '08:00 PM',
            icon: Images.dinner,
            color: '#E0E7FF',
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <View style={styles.list}>
                {meals.map((meal) => (
                    <View key={meal.id} style={styles.card}>
                        <View style={[styles.iconCircle, { backgroundColor: meal.color }]}>
                            <Image source={meal.icon} style={styles.iconImage} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{meal.title}</Text>
                            <Text style={styles.cardSubtitle}>
                                {meal.subtitle} - {meal.time}
                            </Text>
                        </View>
                        <Image source={Images.rightArrow} style={styles.chevronIcon} />
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
    iconImage: {
        width: 28,
        height: 28,
        tintColor: '#111827',
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
    chevronIcon: {
        width: 16,
        height: 16,
        marginLeft: 8,
        tintColor: '#9CA3AF',
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default DietPlanTab;
