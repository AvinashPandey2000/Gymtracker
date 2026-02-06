//import liraries
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Images = require('../../assets/images');

// create a component
const HistoryTab = () => {
    const navigation = useNavigation();
    const sessions = [
        { id: 'chest', title: 'Chest', subtitle: 'Pectorals', icon: Images.chest },
        { id: 'shoulder', title: 'Shoulder', subtitle: 'Deltoids', icon: Images.shoulder },
        { id: 'back', title: 'Back', subtitle: 'Lats & Traps', icon: Images.back },
        { id: 'biceps', title: 'Biceps', subtitle: 'Arm Flexors', icon: Images.biceps },
        { id: 'triceps', title: 'Triceps', subtitle: 'Arm Extensors', icon: Images.triceps },
        { id: 'leg', title: 'Leg', subtitle: 'Quads & Glutes', icon: Images.leg },
        { id: 'core', title: 'Core', subtitle: 'Abs & Obliques', icon: Images.abs },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <View style={styles.list}>
                {sessions.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() =>
                            navigation.navigate('HistoryDetail', {
                                title: item.title,
                                icon: item.icon,
                            })
                        }
                    >
                        <View style={styles.iconCircle}>
                            <Image source={item.icon} style={styles.iconImage} />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        </View>
                        <View style={styles.showButton}>
                            <Text style={styles.showButtonText}>Show</Text>
                        </View>
                    </TouchableOpacity>
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
        width: 32,
        height: 32,
        resizeMode: 'contain',
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
    showButton: {
        backgroundColor: '#EEF2FF',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    showButtonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4F46E5',
    },
});

//make this component available to the app
export default HistoryTab;
