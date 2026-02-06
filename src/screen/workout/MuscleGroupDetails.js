//import liraries
import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
    ScrollView,
    Alert,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

// create a component
const MuscleGroupDetails = ({ route }) => {
    const title = route?.params?.title ?? 'Workout';
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [exerciseTitle, setExerciseTitle] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [infoDetails, setInfoDetails] = useState({
        title: '',
        description: '',
        images: [],
    });

    useLayoutEffect(() => {
        navigation.setOptions({ title });
    }, [navigation, title]);

    const requestGalleryPermission = async () => {
        if (Platform.OS !== 'android') {
            return true;
        }

        const permission =
            Platform.Version >= 33
                ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    const handleSelectImages = async () => {
        if (!(await requestGalleryPermission())) {
            Alert.alert(
                'Permission required',
                'GymTracker needs access to your photos to add new exercises.'
            );
            return;
        }

        try {
            const options = {
                mediaType: 'photo',
                selectionLimit: 0,
            };
            const result = await launchImageLibrary(options);

            if (result.didCancel) {
                return;
            }

            if (result.errorCode) {
                Alert.alert('Unable to open gallery', result.errorMessage ?? 'Try again.');
                return;
            }

            if (result.assets?.length) {
                setSelectedImages((prev) => [...prev, ...result.assets]);
            }
        } catch (error) {
            console.warn('launchImageLibrary failed', error);
            Alert.alert('Unable to open gallery', 'Something went wrong. Try again.');
        }
    };

    const [exerciseCards, setExerciseCards] = useState([
        { id: 'incline', title: 'Incline Bench Press', weight: '', reps: '' },
        { id: 'lat', title: 'Lat Pulldown', weight: '', reps: '' },
        { id: 'squat', title: 'Barbell Squat', weight: '', reps: '' },
        { id: 'deadlift', title: 'Romanian Deadlift', weight: '', reps: '' },
    ]);

    const exerciseDetails = {
        incline: {
            description:
                'Targets the upper chest and anterior deltoids with a controlled eccentric phase.',
            images: [
                'https://images.unsplash.com/photo-1594737625785-5c3a7f47b2d7?auto=format&fit=crop&w=400&q=60',
                'https://images.unsplash.com/photo-1594737625647-56e3f0b558c6?auto=format&fit=crop&w=400&q=60',
            ],
        },
        lat: {
            description:
                'Focus on scapular retraction while keeping the torso upright; drive the elbows down.',
            images: [
                'https://images.unsplash.com/photo-1594737625794-d3b34b0d600f?auto=format&fit=crop&w=400&q=60',
            ],
        },
        squat: {
            description:
                'Barbell squat activates the quads, glutes, and core—keep chest lifted and knees tracking toes.',
            images: [
                'https://images.unsplash.com/photo-1594737625810-b6b8c5d4a890?auto=format&fit=crop&w=400&q=60',
                'https://images.unsplash.com/photo-1594737625823-88f1f72c13b3?auto=format&fit=crop&w=400&q=60',
            ],
        },
        deadlift: {
            description:
                'Romanian deadlift emphasizes the hamstrings; hinge from the hips and keep a neutral spine.',
            images: [
                'https://images.unsplash.com/photo-1594737625855-065787af8eb1?auto=format&fit=crop&w=400&q=60',
            ],
        },
    };

    const openInfoModal = (exercise) => {
        const detail = exerciseDetails[exercise.id] ?? {
            description: 'Select the exercise to see a quick tip and visuals.',
            images: [],
        };
        setInfoDetails({
            title: exercise.title,
            description: detail.description,
            images: detail.images,
        });
        setInfoModalVisible(true);
    };

    const handleStatChange = (id, field, value) => {
        setExerciseCards((prev) =>
            prev.map((exercise) =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise
            )
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {exerciseCards.map((exercise) => (
                    <View key={exercise.id} style={styles.exerciseCard}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{exercise.title}</Text>
                            <TouchableOpacity
                                style={styles.infoCircle}
                                onPress={() => openInfoModal(exercise)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.infoText}>i</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.cardRow}>
                            <View style={styles.cardStat}>
                                <Text style={styles.cardStatLabel}>WEIGHT (KG)</Text>
                                <View style={styles.cardStatValueContainer}>
                                    <TextInput
                                        style={styles.cardStatInput}
                                        value={exercise.weight}
                                        onChangeText={(value) =>
                                            handleStatChange(exercise.id, 'weight', value)
                                        }
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                            </View>
                            <View style={[styles.cardStat, styles.cardStatLast]}>
                                <Text style={styles.cardStatLabel}>REPS (COUNT)</Text>
                                <View style={styles.cardStatValueContainer}>
                                    <TextInput
                                        style={styles.cardStatInput}
                                        value={exercise.reps}
                                        onChangeText={(value) =>
                                            handleStatChange(exercise.id, 'reps', value)
                                        }
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => setModalVisible(true)}
                >
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Exercise</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter exercise title"
                                value={exerciseTitle}
                                onChangeText={setExerciseTitle}
                            />

                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Enter description"
                                value={exerciseDescription}
                                onChangeText={setExerciseDescription}
                                multiline
                            />

                            <Text style={styles.label}>Photos</Text>
                            <ScrollView horizontal style={styles.photoList} showsHorizontalScrollIndicator={false}>
                                {selectedImages.map((img, index) => (
                                    <Image key={index} source={{ uri: img.uri }} style={styles.photoThumbnail} />
                                ))}
                                <TouchableOpacity style={styles.addPhotoButton} onPress={handleSelectImages}>
                                    <Text style={styles.addPhotoText}>+</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </ScrollView>

                        <TouchableOpacity style={[styles.primaryButton, styles.saveButton]}>
                            <Text style={[styles.buttonText, styles.primaryButtonText]}>Save Exercise</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent
                visible={infoModalVisible}
                onRequestClose={() => setInfoModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.infoModalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.infoModalTitle}>{infoDetails.title}</Text>
                            <TouchableOpacity onPress={() => setInfoModalVisible(false)}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.infoModalBody} showsVerticalScrollIndicator={false}>
                            <Text style={styles.infoModalLabel}>Description</Text>
                            <Text style={styles.infoModalDescription}>{infoDetails.description}</Text>

                            <Text style={[styles.infoModalLabel, styles.infoModalSection]}>
                                Sample imagery
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.infoImageList}>
                                {infoDetails.images.map((uri) => (
                                    <Image
                                        key={uri}
                                        source={{ uri }}
                                        style={styles.infoImage}
                                        accessibilityLabel={`${infoDetails.title} preview`}
                                    />
                                ))}
                                {infoDetails.images.length === 0 && (
                                    <Text style={styles.placeholderText}>No images yet.</Text>
                                )}
                            </ScrollView>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    scrollContent: {
        paddingBottom: 120,
    },
    exerciseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,

        marginBottom: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    infoCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#EFF3FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
    },
    cardRow: {
        flexDirection: 'row',
    },
    cardStat: {
        flex: 1,
        marginRight: 12,
    },
    cardStatLast: {
        marginRight: 0,
    },
    cardStatLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    cardStatValueContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
    },
    cardStatValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    cardStatInput: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        width: '100%',
        textAlign: 'center',
        padding: 0,
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
        height: 48,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    closeButton: {
        fontSize: 18,
        color: '#6B7280',
        fontWeight: 'bold',
        padding: 5,
    },
    formContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 14,
        color: '#111827',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    photoList: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    photoThumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 8,
    },
    addPhotoButton: {
        width: 80,
        height: 80,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
    },
    addPhotoText: {
        fontSize: 32,
        color: '#9CA3AF',
        fontWeight: '300',
    },
    saveButton: {
        marginTop: 10,
        marginBottom: 20,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoModalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '70%',
    },
    infoModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    infoModalBody: {
        flex: 1,
    },
    infoModalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },
    infoModalSection: {
        marginTop: 16,
    },
    infoModalDescription: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
    },
    infoImageList: {
        flexDirection: 'row',
    },
    infoImage: {
        width: 140,
        height: 120,
        borderRadius: 12,
        marginRight: 8,
    },
    placeholderText: {
        color: '#9CA3AF',
        fontSize: 12,
        textAlign: 'center',
        paddingVertical: 32,
    },
});

//make this component available to the app
export default MuscleGroupDetails;
