import { TouchableOpacity , StyleSheet, Text} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen({navigation}) {
    return (
        <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Your Habit Tracking Bud!</Text>
            <Text style={styles.subtitle}>Ready to Build a Strong Routine?</Text>
            <Text style={styles.subtitle}>One small Habit goes a long way!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add New')} >
                <Text style={styles.buttonText}> Add New Habit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form:{
        backgroundColor: '#f4d6f6',
        flex: 1,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        color: '#4a90d9',
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom:'100',
        marginTop: '100',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: '600',
        color: '#149a6d',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 40,
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#4a90d9',
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
})