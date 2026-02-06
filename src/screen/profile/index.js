//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import Images from '../../assets/images';

// create a component
const ProfileTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Ali Khan');
    const [height, setHeight] = useState('175 cm');
    const [weight, setWeight] = useState('72 kg');

    const onSave = () => {
        setIsEditing(false);
    };

    const onCancel = () => {
        setName('Ali Khan');
        setHeight('175 cm');
        setWeight('72 kg');
        setIsEditing(false);
    };

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
                <Image source={Images.Profile} style={styles.photo} />
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
});

//make this component available to the app
export default ProfileTab;
