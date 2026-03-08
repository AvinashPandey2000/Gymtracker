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

    const categoryId = route?.params?.id ?? 'default';

    const EXERCISE_DATA = {
        chest: {
            cards: [
                { id: 'machine_fly', title: 'Machine Chest Fly', weight: '', reps: '' },
                { id: 'lever_press', title: 'Lever Chest Press', weight: '', reps: '' },
                { id: 'flat_bench', title: 'Flat Bench Press', weight: '', reps: '' },
                { id: 'cable_cross', title: 'Cable Crossover', weight: '', reps: '' },
                { id: 'chest_press', title: 'Dumbbell Chest Press', weight: '', reps: '' },
                { id: 'chest_dips', title: 'Chest Dips', weight: '', reps: '' },
                { id: 'incline_bench', title: 'Incline Bench Press', weight: '', reps: '' },
                { id: 'dumbbell_pullover', title: 'Dumbbell Pullover', weight: '', reps: '' },
            ],
            details: {
                machine_fly: {
                    description: 'Isolates the pectoral muscles, focusing on the inner chest. Keep a slight bend in your elbows and squeeze at the center.',
                    images: [require('../../assets/ChestPng/How To Machine Chest Fly To Build Bigger Pecs.gif')],
                },
                lever_press: {
                    description: 'Lever chest press targets the entire pectoral region with a focus on stability and safe loading. Push outward smoothly.',
                    images: [require('../../assets/ChestPng/How To_ Lever Chest Press _ Muscles Worked And Benefits.gif')],
                },
                flat_bench: {
                    description: 'A classic compound movement for chest development. Lower the bar to the mid-chest and press up explosively.',
                    images: [require('../../assets/ChestPng/chest.gif')],
                },
                cable_cross: {
                    description: 'Great for isolating the chest with constant tension. Pull the tension down and together to target lower and outer pecs.',
                    images: [require('../../assets/ChestPng/chestg.gif')],
                },
                chest_press: {
                    description: 'A great movement for building overall chest mass and strength using dumbbells.',
                    images: [require('../../assets/ChestPng/16 Melhores Exercícios Para Peito [Segundo a Ciência].jpeg')],
                },
                chest_dips: {
                    description: 'Excellent bodyweight exercise that heavily targets the lower chest and triceps.',
                    images: [require('../../assets/ChestPng/Triceps Workout_ 11 Best Triceps Workout -Tikkay Khan.jpeg')],
                },
                incline_bench: {
                    description: 'Targets the upper pectorals to build a fuller, well-rounded chest.',
                    images: [require('../../assets/ChestPng/Videoportefølje av Makatserchyk _ Shutterstock-bidragsyter.jpeg')],
                },
                dumbbell_pullover: {
                    description: 'Expands the rib cage and stretches the chest muscles, a classic bodybuilding move.',
                    images: [require('../../assets/ChestPng/chest.jpeg')],
                },
            }
        },
        shoulder: {
            cards: [
                { id: 'dumbbell_press', title: 'Dumbbell Shoulder Press', weight: '', reps: '' },
                { id: 'front_raise', title: 'Front Raise', weight: '', reps: '' },
                { id: 'rear_delt', title: 'Cable Rear Delt Pull', weight: '', reps: '' },
                { id: 'upright_row', title: 'Upright Row', weight: '', reps: '' },
                { id: 'lateral_raise', title: 'Lateral Raise', weight: '', reps: '' },
            ],
            details: {
                dumbbell_press: {
                    description: 'Push the dumbbells up until they touch at the top. Great for overall shoulder mass.',
                    images: [require('../../assets/Shoulderpng/Dumbbell shoulder press • uitvoering en uitleg • Men\'sPower.gif')],
                },
                front_raise: {
                    description: 'Isolates the anterior (front) deltoids by keeping a slight bend in the elbow.',
                    images: [require('../../assets/Shoulderpng/Exercising_ Ups of Hands Forward with One Dumbbell Stock Illustration - Illustration of clavicular, exercising_ 43667084.jpeg')],
                },
                rear_delt: {
                    description: 'Excellent isolation for the rear delts to combat posture issues and balance growth.',
                    images: [require('../../assets/Shoulderpng/Rear Delt Cable Pull_ How To Do and Muscles Worked.gif')],
                },
                upright_row: {
                    description: 'Pulls the elbows high to target the traps and lateral deltoids.',
                    images: [require('../../assets/Shoulderpng/upright row.jpeg')],
                },
                lateral_raise: {
                    description: 'Targets the lateral head of the shoulders. Keep a slight bend in your arms and lift out to the sides.',
                    images: [require('../../assets/Shoulderpng/shoulder.gif')],
                },
            }
        },
        back: {
            cards: [
                { id: 'pullup', title: 'Pull-up', weight: '', reps: '' },
                { id: 'wide_pulldown', title: 'Wide Cable Pulldown', weight: '', reps: '' },
                { id: 'close_grip', title: 'Close Grip Pulldown', weight: '', reps: '' },
                { id: 'unilateral_row', title: 'Unilateral Row', weight: '', reps: '' },
                { id: 'shrugs', title: 'Dumbbell Shrugs', weight: '', reps: '' },
                { id: 'back_extension', title: 'Back Extension', weight: '', reps: '' },
                { id: 'seated_row', title: 'Seated Cable Row', weight: '', reps: '' },
            ],
            details: {
                pullup: {
                    description: 'Classic back width builder pulling the body up focusing on the lats.',
                    images: [require('../../assets/Backpng/6 Best Pull-up Alternatives for Big Gains (With Pictures) - Inspire US.jpeg')],
                },
                wide_pulldown: {
                    description: 'Build back width mimicking a pull-up with adjustable cable weight.',
                    images: [require('../../assets/Backpng/Cable Wide Pulldown.jpeg')],
                },
                close_grip: {
                    description: 'Focuses on the middle back and lats with a narrower grip and larger stretch.',
                    images: [require('../../assets/Backpng/Close Grip Lat Pulldown workout for v shaped back.jpeg')],
                },
                unilateral_row: {
                    description: 'Single-arm movement to ensure balanced strength and development across both lats.',
                    images: [require('../../assets/Backpng/Tirage unilatéral.jpeg')],
                },
                shrugs: {
                    description: 'Targets the upper trapezius muscles to build neck thickness and shoulder stability.',
                    images: [require('../../assets/Backpng/Kapuzenmuskel trainieren_ Top 5 Übungen (inkl_ Bilder + Videos).jpeg')],
                },
                back_extension: {
                    description: 'Strengthens the lower back erector spinae muscles safely.',
                    images: [require('../../assets/Backpng/_ (1).jpeg')],
                },
                seated_row: {
                    description: 'Builds middle back thickness using a cable machine with a neutral grip.',
                    images: [require('../../assets/Backpng/_.jpeg')],
                },
            }
        },
        biceps: {
            cards: [
                { id: 'dumbbell_curl', title: 'Dumbbell Bicep Curl', weight: '', reps: '' },
                { id: 'machine_curl', title: 'Machine Preacher Curl', weight: '', reps: '' },
                { id: 'barbell_curl', title: 'Barbell Curl', weight: '', reps: '' },
                { id: 'hammer_curl', title: 'Hammer Curl', weight: '', reps: '' },
                { id: 'concentration_curl', title: 'Concentration Curl', weight: '', reps: '' },
            ],
            details: {
                dumbbell_curl: {
                    description: 'Traditional exercise for building arm size with supination targeting the peak.',
                    images: [require('../../assets/Bicepspng/Les 7 Meilleurs Exercices pour Biceps avec Haltère(s).gif')],
                },
                machine_curl: {
                    description: 'Stabilizes elbows so the bicep takes 100% of the load without momentum.',
                    images: [require('../../assets/Bicepspng/Machine Bicep Curl Standards for Men and Women (kg) - Strength Level.jpeg')],
                },
                barbell_curl: {
                    description: 'Stand tall with shoulders retracted; flex elbows fully without swinging.',
                    images: [require('../../assets/Bicepspng/_.gif')],
                },
                hammer_curl: {
                    description: 'Targets the brachialis and brachioradialis for thicker-looking arms by using a neutral grip.',
                    images: [require('../../assets/Bicepspng/_.jpeg')],
                },
                concentration_curl: {
                    description: 'Isolates the bicep peak by resting the elbow on the inner thigh to prevent momentum.',
                    images: [require('../../assets/Bicepspng/_ (1).jpeg')],
                }
            }
        },
        triceps: {
            cards: [
                { id: 'triangle_pushup', title: 'Triangle Push-Up', weight: '', reps: '' },
                { id: 'triceps_pulley', title: 'Triceps Pulldown', weight: '', reps: '' },
                { id: 'dumbbell_triceps', title: 'Dumbbell Triceps Extension', weight: '', reps: '' },
                { id: 'overhead_extension', title: 'Overhead Triceps Extension', weight: '', reps: '' },
                { id: 'skull_crusher', title: 'Skull Crushers', weight: '', reps: '' },
            ],
            details: {
                triangle_pushup: {
                    description: 'Diamond shape with your hands emphasizes horizontal adduction to hit triceps.',
                    images: [require('../../assets/TricepsPng/Triangle Push-Up.jpeg')],
                },
                triceps_pulley: {
                    description: 'Focus on extending straight downwards with tension at full lockout.',
                    images: [require('../../assets/TricepsPng/Tríceps Pulley.gif')],
                },
                dumbbell_triceps: {
                    description: 'Isolate the triceps muscle allowing deep stretch of the long head.',
                    images: [require('../../assets/TricepsPng/Les 4 Meilleurs Exercices Triceps aux Haltères - Boxlife.gif')],
                },
                overhead_extension: {
                    description: 'Stretches the long head of the triceps for maximum growth and strength.',
                    images: [require('../../assets/TricepsPng/Arms workout.jpeg')],
                },
                skull_crusher: {
                    description: 'Lying triceps extension to heavily target the overall triceps muscle mass.',
                    images: [require('../../assets/TricepsPng/_.jpeg')],
                },
            }
        },
        leg: {
            cards: [
                { id: 'hack_squat', title: 'Hack Squat', weight: '', reps: '' },
                { id: 'leg_press', title: 'Leg Press', weight: '', reps: '' },
                { id: 'leg_curl', title: 'Lying Leg Curl', weight: '', reps: '' },
                { id: 'glute_focus', title: 'Glute Focused Movements', weight: '', reps: '' },
                { id: 'lunges', title: 'Dumbbell Lunges', weight: '', reps: '' },
                { id: 'calf_raise', title: 'Calf Raises', weight: '', reps: '' },
            ],
            details: {
                hack_squat: {
                    description: 'Unlocking heavy quad focus with supported lower back stability.',
                    images: [require('../../assets/LegPng/Unlocking the Power of the Hack Squat _ The Complete Guide.gif')],
                },
                leg_press: {
                    description: 'Load leg press adjusting foot placement for quad or glute focus.',
                    images: [require('../../assets/LegPng/Leg Press Foot Placement for Glutes_ Stance Orientation Broken Down.jpeg')],
                },
                leg_curl: {
                    description: 'Isolating hamstrings effectively without incorporating synergists.',
                    images: [require('../../assets/LegPng/Lying leg curl • uitvoering en uitleg • Men\'sPower.gif')],
                },
                glute_focus: {
                    description: 'Targeted extensions optimizing mechanics for glute building.',
                    images: [require('../../assets/LegPng/9 Best Leg and Glute Exercises for Beginners.gif')],
                },
                lunges: {
                    description: 'Unilateral leg exercise for quads and glutes, enhancing balance and coordination.',
                    images: [require('../../assets/LegPng/Trainingsplan Muskelaufbau zuhause mit Hanteln (inkl_ Bilder + Videos).gif')],
                },
                calf_raise: {
                    description: 'Isolates and develops the gastrocnemius muscles in the calves.',
                    images: [require('../../assets/LegPng/Photo & Image Portfolio by Makatserchyk _ Shutterstock Contributor.jpeg')],
                }
            }
        },
        core: {
            cards: [
                { id: 'fat_burning', title: 'Fat Burning Core Routine', weight: '', reps: '' },
                { id: 'decline_crunch', title: 'Decline Crunch', weight: '', reps: '' },
                { id: 'treadmill_jog', title: 'Treadmill Jog', weight: '', reps: '' },
                { id: 'hanging_raises', title: 'Hanging Knee Raises', weight: '', reps: '' },
                { id: 'program_flat', title: 'Flat Belly Program', weight: '', reps: '' },
                { id: 'strongman_core', title: 'Strongman Core', weight: '', reps: '' },
                { id: 'home_ab', title: 'Home Ab Workout', weight: '', reps: '' },
                { id: 'core_hold_1', title: 'Core Hold Variation 1', weight: '', reps: '' },
                { id: 'core_hold_2', title: 'Core Hold Variation 2', weight: '', reps: '' },
            ],
            details: {
                fat_burning: {
                    description: 'An intense fast-paced routine designed to engage your core deeply and burn fat quickly.',
                    images: [require('../../assets/CorePng/7-Day Intense Fat Burning Workout Routine For Fast Results.gif')],
                },
                decline_crunch: {
                    description: 'Enhances standard crunches by leveraging a decline bench for a greater range of motion.',
                    images: [require('../../assets/CorePng/Decline Crunch - Guide, Benefits, and Form.jpeg')],
                },
                treadmill_jog: {
                    description: 'A cardio exercise that inherently requires strong core stabilization as you move.',
                    images: [require('../../assets/CorePng/Exercise Database (Cardio1) - Treadmill Jog — Jase Stuart - The Better Body Coach.jpeg')],
                },
                hanging_raises: {
                    description: 'Focuses strictly on the lower core by raising your knees to your chest while hanging.',
                    images: [require('../../assets/CorePng/Hanging-Knee-Raises_gif 360×360 pixels.gif')],
                },
                program_flat: {
                    description: 'Core exercises targeted at developing a strong and flat abdominal region.',
                    images: [require('../../assets/CorePng/Programme ventre plat pdf _ exercices, conseils et astuces.jpeg')],
                },
                strongman_core: {
                    description: 'Heavily loads the core to promote overall trunk stability suitable for strongman loads.',
                    images: [require('../../assets/CorePng/The Best Strongman Workout Plan.jpeg')],
                },
                home_ab: {
                    description: 'Versatile bodyweight movements designed specifically for an effective at-home ab routine.',
                    images: [require('../../assets/CorePng/The Complete Guide to Ab Workout at Home.jpeg')],
                },
                core_hold_1: {
                    description: 'Hold a strong core foundation through extended isometric tension to build endurance.',
                    images: [require('../../assets/CorePng/_ (1).jpeg')],
                },
                core_hold_2: {
                    description: 'A supplementary core stability exercise targeting the deep abdominal muscles.',
                    images: [require('../../assets/CorePng/_.jpeg')],
                }
            }
        },
        default: {
            cards: [
                { id: 'incline', title: 'Incline Bench Press', weight: '', reps: '' },
                { id: 'lat', title: 'Lat Pulldown', weight: '', reps: '' },
                { id: 'squat', title: 'Barbell Squat', weight: '', reps: '' },
                { id: 'deadlift', title: 'Romanian Deadlift', weight: '', reps: '' },
            ],
            details: {
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
            }
        }
    };

    const groupData = EXERCISE_DATA[categoryId] || EXERCISE_DATA.default;
    const [exerciseCards, setExerciseCards] = useState(groupData.cards);
    const exerciseDetails = groupData.details;

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
                                {infoDetails.images.map((imgSource, index) => {
                                    const source = typeof imgSource === 'string' ? { uri: imgSource } : imgSource;
                                    return (
                                        <Image
                                            key={index}
                                            source={source}
                                            style={styles.infoImage}
                                            resizeMode="contain"
                                            accessibilityLabel={`${infoDetails.title} preview`}
                                        />
                                    );
                                })}
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
        width: 380,
        height: 380,
        borderRadius: 12,
        marginRight: 16,
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
