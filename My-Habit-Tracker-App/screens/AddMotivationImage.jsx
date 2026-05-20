import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const HERO_URI = 'https://images.unsplash.com/photo-1615976909545-a2d402c7dac3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGluayUyMHdpdGh8ZW58MHx8MHx8fDA%3D'

// Add Photos for Daily Motivation Through Camera

export default function AddMotivationImage() {
    const [photos, setPhotos] = useState([]);

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const takePhoto = async () => {
        if (!status?.granted) {
            const { status } = await requestPermission()
            if (!status.granted) {
                return
            }
        }

        const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
        if (!result.canceled) {

            // Add new photo to array
            setPhotos(prevPhotos => [
                ...prevPhotos,
                result.assets[0],
            ]);
        }

    };

    return (
        <ImageBackground
            source={{ uri: HERO_URI }}
            style={styles.hero}
            imageStyle={{ resizeMode: 'cover' }}
        >
            <SafeAreaView style={styles.container}>


                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Take Photos for Daily Motivation</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.gallery}>

                    {photos.map((photo, index) => (
                        <Image
                            key={index}
                            source={{ uri: photo.uri }}
                            style={styles.image}
                        />
                    ))}

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0b4078',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    image: {
        width: '45%',
        height: 200,
        borderRadius: 12,
        marginBottom: 16,
        marginRight: '4%',
    },
    gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 40,
        width: '100%',
    },
    hero: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
