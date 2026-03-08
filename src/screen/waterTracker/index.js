import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WaterTracker = () => {
    const [glasses, setGlasses] = useState(0);
    const dailyGoal = 8; // 8 glasses a day

    const addGlass = () => {
        setGlasses((prev) => prev + 1);
    };

    const removeGlass = () => {
        setGlasses((prev) => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Water Tracker</Text>
                <Text style={styles.subtitle}>Stay Hydrated!</Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.waterRing}>
                    <Text style={styles.waterText}>{glasses}</Text>
                    <Text style={styles.targetText}>/ {dailyGoal} glasses</Text>
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.buttonSecondary} onPress={removeGlass}>
                    <Text style={styles.buttonTextSecondary}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={addGlass}>
                    <Text style={styles.buttonTextPrimary}>Add Water</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0056D2',
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 5,
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    waterRing: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: (width * 0.6) / 2,
        borderWidth: 15,
        borderColor: '#4DA8DA',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F6EF',
    },
    waterText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#0056D2',
    },
    targetText: {
        fontSize: 16,
        color: '#0056D2',
        marginTop: 5,
        fontWeight: '600',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    buttonPrimary: {
        backgroundColor: '#0056D2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        flex: 1,
        marginLeft: 15,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#E8F6EF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextPrimary: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#0056D2',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default WaterTracker;
