//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import Images from '../../assets/images';

// create a component
const ProfileTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Avinash Pandey');
    const [height, setHeight] = useState('180 cm');
    const [weight, setWeight] = useState('78 kg');

    const onSave = () => {
        setIsEditing(false);
    };


    const onCancel = () => {
        setName('Avinash Pandey');
        setHeight('180 cm');
        setWeight('78 kg');
        setIsEditing(false);
    };

    const weeklyPlan = [

        { day: 'Monday', activity: 'Rest' },
        { day: 'Tuesday', activity: 'Rest' },
        { day: 'Wednesday', activity: 'Cardio + Abs' },
        { day: 'Thursday', activity: 'Biceps + Triceps' },
        { day: 'Friday', activity: 'Chest + Shoulder' },
        { day: 'Saturday', activity: 'Back' },
        { day: 'Sunday', activity: 'Legs' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Profile</Text>
                {!isEditing && (
                    <Pressable style={styles.editBtn} onPress={() => setIsEditing(true)}>
                        <Text style={styles.editText}>Edit</Text>
                    </Pressable>
                )}
            </View>
            <View style={styles.card}>
                <View style={styles.photo}>
                    <Image source={Images.Profile} style={styles.photo1} />

                </View>
                <View style={styles.info}>
                    {isEditing ? (
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.inputName}
                            placeholder="Name"
                        />
                    ) : (
                        <Text style={styles.name}>{name}</Text>
                    )}
                    <View style={styles.row}>
                        <Text style={styles.label}>Height</Text>
                        {isEditing ? (
                            <TextInput
                                value={height}
                                onChangeText={setHeight}
                                style={styles.inputValue}
                                placeholder="e.g. 175 cm"
                            />
                        ) : (
                            <Text style={styles.value}>{height}</Text>
                        )}
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Weight</Text>
                        {isEditing ? (
                            <TextInput
                                value={weight}
                                onChangeText={setWeight}
                                style={styles.inputValue}
                                placeholder="e.g. 72 kg"
                            />
                        ) : (
                            <Text style={styles.value}>{weight}</Text>
                        )}
                    </View>
                    {isEditing && (
                        <View style={styles.actionRow}>
                            <Pressable style={styles.saveBtn} onPress={onSave}>
                                <Text style={styles.saveText}>Save</Text>
                            </Pressable>
                            <Pressable style={styles.cancelBtn} onPress={onCancel}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.planWrapper}>
                <Text style={styles.sectionTitle}>Weekly plan</Text>
                <View style={styles.planCard}>
                    {weeklyPlan.map(({ day, activity }, index) => (
                        <View
                            key={day}
                            style={[
                                styles.planRow,
                                index === weeklyPlan.length - 1 && styles.planRowLast,
                            ]}
                        >
                            <Text style={styles.planDay}>{day}</Text>
                            <Text style={styles.planActivity}>{activity}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f6f7fb',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1f2a37',
    },
    editBtn: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: '#111827',
        borderRadius: 10,
    },
    editText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    photo: {
        width: 96,
        height: 96,
        borderRadius: 48,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo1: {
        width: 70,
        height: 70,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 10,
    },
    inputName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 10,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#f9fafb',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#eef1f4',
    },
    label: {
        fontSize: 14,
        color: '#6b7280',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    inputValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#f9fafb',
        minWidth: 100,
        textAlign: 'right',
    },
    actionRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    saveBtn: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#111827',
        borderRadius: 10,
        marginRight: 8,
        alignItems: 'center',
    },
    saveText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '700',
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#e5e7eb',
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#111827',
        fontSize: 13,
        fontWeight: '700',
    },
    planWrapper: {
        marginTop: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    planCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    planRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eef1f4',
    },
    planRowLast: {
        borderBottomWidth: 0,
    },
    planDay: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    planActivity: {
        fontSize: 16,
        color: '#6b7280',
    },
});

//make this component available to the app
export default ProfileTab;
