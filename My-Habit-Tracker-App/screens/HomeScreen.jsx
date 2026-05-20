import { TouchableOpacity, StyleSheet, Text, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'

const HERO_URI = 'https://images.unsplash.com/photo-1669299033175-09d02a0031f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHQlMjBiYWNrZ3JvdW5kJTIwcGluayUyMHdpdGglMjBib29rc3xlbnwwfHwwfHx8MA%3D%3D'

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: HERO_URI }}
            style={styles.hero}
            imageStyle={{ resizeMode: 'cover' }}
        >
            <StatusBar style="light" />
            <Text style={styles.title}>Your Habit Tracking Bud!</Text>
            <Text style={styles.subtitle}>Ready to Build a Strong Routine?</Text>
            <Text style={styles.subtitle}>One small Habit goes a long way!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add New')} >
                <Text style={styles.buttonText}> Add New Habit</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: '#0d2c4e',
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: '100',
        marginTop: '100',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: '600',
        color: '#0e4705',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 40,
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#0d2c4e',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    },
    hero: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})