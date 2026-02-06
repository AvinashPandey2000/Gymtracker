//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/images';

// create a component
const WorkOutTab = () => {
    const navigation = useNavigation();
    const todayLabel = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const muscleGroups = [
        { id: 'chest', title: 'Chest', subtitle: 'Pectorals', icon: Images.chest },
        { id: 'shoulder', title: 'Shoulder', subtitle: 'Deltoids', icon: Images.shoulder },
        { id: 'back', title: 'Back', subtitle: 'Lats & Traps', icon: Images.back },
        { id: 'biceps', title: 'Biceps', subtitle: 'Arm Flexors', icon: Images.biceps },
        { id: 'triceps', title: 'Triceps', subtitle: 'Arm Extensors', icon: Images.triceps },
        { id: 'leg', title: 'Leg', subtitle: 'Quads & Glutes', icon: Images.leg },
        { id: 'core', title: 'Core', subtitle: 'Abs & Obliques', icon: Images.abs },
        { id: 'rest', title: 'Rest', subtitle: 'Total Strength', icon: Images.rest },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.dateText}>{todayLabel}</Text>

            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <Image
                        source={Images.weightBar}
                        style={styles.headerIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Select Muscle Group</Text>

                </View>
            </View>

            <View style={styles.grid}>
                {muscleGroups.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('MuscleGroup', { title: item.title, id: item.id })}
                    >
                        <View style={styles.iconContainer}>
                            <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
                        </View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.retrainButton} activeOpacity={0.85}>
                <Text style={styles.retrainButtonText}>Save In History</Text>
            </TouchableOpacity>
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
        paddingTop: 16,
        paddingBottom: 24,
    },
    dateText: {
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 12,
        fontWeight: '600',
    },
    header: {
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 0,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#111827',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
        alignItems: 'center'
    },
    iconContainer: {
        width: 40,
        height: 40,
        marginBottom: 12,
    },
    iconImage: {
        width: '100%',
        height: '100%',
        tintColor: '#111827',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    retrainButton: {
        marginTop: 8,
        backgroundColor: '#111827',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#111827',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    retrainButtonText: {
        color: '#F9FAFB',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

//make this component available to the app
export default WorkOutTab;
