//import libraries
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
const Images = require('../../assets/images');

const HISTORY_LOGS = {
    Chest: [
        { id: '1', name: 'Incline Bench Press', weight: '72 kg', reps: '8' },
        { id: '2', name: 'Cable Flyes', weight: '22 kg', reps: '12' },
    ],
    Shoulder: [
        { id: '3', name: 'Dumbbell Press', weight: '26 kg', reps: '10' },
        { id: '4', name: 'Lateral Raise', weight: '10 kg', reps: '15' },
    ],
    Back: [
        { id: '5', name: 'Lat Pulldown', weight: '60 kg', reps: '10' },
        { id: '6', name: 'Seated Row', weight: '55 kg', reps: '12' },
    ],
    Biceps: [
        { id: '7', name: 'Barbell Curl', weight: '30 kg', reps: '10' },
        { id: '8', name: 'Hammer Curl', weight: '16 kg', reps: '12' },
    ],
    Triceps: [
        { id: '9', name: 'Triceps Pushdown', weight: '28 kg', reps: '12' },
        { id: '10', name: 'Overhead Extension', weight: '22 kg', reps: '10' },
    ],
    Leg: [
        { id: '11', name: 'Barbell Squat', weight: '90 kg', reps: '8' },
        { id: '12', name: 'Leg Press', weight: '140 kg', reps: '10' },
    ],
    Core: [
        { id: '13', name: 'Plank', weight: 'Body', reps: '60s' },
        { id: '14', name: 'Hanging Leg Raise', weight: 'Body', reps: '12' },
    ],
    default: [
        { id: '15', name: 'Kettlebell Swing', weight: '24 kg', reps: '15' },
        { id: '16', name: 'Push-up', weight: 'Body', reps: '20' },
    ],
};

const HistoryDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const groupTitle = route?.params?.title ?? 'History';
    const entries = HISTORY_LOGS[groupTitle] ?? HISTORY_LOGS.default;
    const selectedIcon = route?.params?.icon ?? Images.History;

    useLayoutEffect(() => {
        navigation.setOptions({ title: groupTitle });
    }, [navigation, groupTitle]);

    const [selectedSet, setSelectedSet] = useState(1);
    const setOptions = [1, 2, 3, 4, 5, 6, 7];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.iconRow}>
                <Image source={selectedIcon} style={styles.pageIcon} />

                <View style={styles.setSelector}>
                    {setOptions.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.setCircle,
                                selectedSet === option && styles.setCircleActive,
                            ]}
                            onPress={() => setSelectedSet(option)}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={[
                                    styles.setNumber,
                                    selectedSet === option && styles.setNumberActive,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, styles.colName]}>Name</Text>
                    <Text style={[styles.tableHeaderText, styles.colWeight]}>Weight</Text>
                    <Text style={[styles.tableHeaderText, styles.colRep]}>Reps</Text>
                </View>
                {entries.map((entry) => (
                    <View key={entry.id} style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.colName]}>{entry.name}</Text>
                        <Text style={[styles.tableCell, styles.colWeight]}>{entry.weight}</Text>
                        <Text style={[styles.tableCell, styles.colRep]}>{entry.reps}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        paddingHorizontal: 15,
        paddingTop: 10
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    pageIcon: {
        width: 40,
        height: 40,
        marginRight: 6,
        tintColor: 'black',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    setSelector: {
        flexDirection: 'row',
    },
    setCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    setCircleActive: {
        backgroundColor: '#3B82F6',
    },
    setNumber: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: 'bold',
    },
    setNumberActive: {
        color: '#FFFFFF',
    },
    table: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#111827',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    tableHeader: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    tableHeaderText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    tableCell: {
        fontSize: 14,
        color: '#111827',
    },
    colName: {
        flex: 2,
        textAlign: 'left',
    },
    colWeight: {
        flex: 1,
        textAlign: 'center',
    },
    colRep: {
        flex: 0.5,
        textAlign: 'right',
    },
});

export default HistoryDetail;
