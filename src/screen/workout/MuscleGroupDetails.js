//import liraries
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// create a component
const MuscleGroupDetails = ({ route }) => {
    const title = route?.params?.title ?? 'Workout';
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ title });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>Choose exercises for {title}.</Text>
            </View>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                        Add exercies
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.primaryButton]}>
                    <Text style={[styles.buttonText, styles.primaryButtonText]}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9FAFB',
        paddingBottom: 96,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '600',
    },
    bottomBar: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#111827',
    },
    secondaryButton: {
        backgroundColor: '#E5E7EB',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
    },
    primaryButtonText: {
        color: '#FFFFFF',
    },
    secondaryButtonText: {
        color: '#111827',
    },
});

//make this component available to the app
export default MuscleGroupDetails;
