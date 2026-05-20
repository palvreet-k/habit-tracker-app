import { SafeAreaView } from "react-native-safe-area-context"
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, View, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { addHabit } from '../db/db.js';

const HERO_URI = 'https://images.unsplash.com/photo-1594022688886-dc29f495cf65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGlnaHQlMjB5ZWxsb3clMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww'

// Add New Habit Form
export default function AddHabitScreen({ navigation }) {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        habitname: '',
        duration: '',
        category: ''
    })

    function handleChange(field, value) {
        setForm({ ...form, [field]: value })
    }

    // Handle Submit on "Add Habit" button
    const handleSubmit = () => {
        if (!form.habitname.trim()) {
            Alert.alert('Name Error', 'Name cannot be empty!');
            return;
        }

        if (!form.duration.trim() || form.duration === '0') {
            Alert.alert('Duration Error', 'Enter a valid duration!');
            return;
        }

        if (!form.category.trim()) {
            Alert.alert('Category Error', 'Please select a catgory!');
            return;
        }

        try {
            addHabit(
                form.habitname,
                Number(form.duration),
                form.category
            );

            Keyboard.dismiss();
            setSubmitted(true);
            setForm({
                habitname: '',
                duration: '',
                category: ''
            });

            Alert.alert('Success', 'Habit added!');

        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'Failed to add habit');
        }
    };

    const handleReset = () => {
        setForm({
            habitname: '',
            duration: '',
            category: ''
        });
        setSubmitted(false);
    };

    return (
        <ImageBackground
            source={{ uri: HERO_URI }}
            style={styles.hero}
            imageStyle={{ resizeMode: 'cover' }}
        >
            <SafeAreaView style={styles.form}>
                <Text style={styles.subtitle}>Add a new Habit Below</Text>
                <TextInput
                    style={styles.input}
                    value={form.habitname}
                    placeholder="Enter a habit name"
                    onChangeText={(val) => handleChange('habitname', val)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={form.duration}
                    onChangeText={(val) => handleChange('duration', val)}
                    placeholder="Duration in minutes per day"
                />
                <View style={styles.pickerBox} onTouchStart={() => Keyboard.dismiss()}>
                    <Picker
                        selectedValue={form.category}
                        onValueChange={(itemValue) =>
                            handleChange('category', itemValue)
                        }
                        selectionColor={'red'}
                    >
                        <Picker.Item label="Select a category" value="" />
                        <Picker.Item label="Health" value="health" />
                        <Picker.Item label="Learning" value="learning" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Habit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReset} style={styles.button}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Saved Habits')} >
                    <Text style={styles.buttonText}> See Saved Habits</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#0f0303',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        width: '85%',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: '600',
        color: '#0b3665',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#093769',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 30,
        marginBottom: 16,
        width: '85%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerBox: {
        margin: 12,
        borderWidth: 1,
        borderColor: '#0f0303',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '85%',
        minHeight: 48,
        justifyContent: 'center',
    },
    hero: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
