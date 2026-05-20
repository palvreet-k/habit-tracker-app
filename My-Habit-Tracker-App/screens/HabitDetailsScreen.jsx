import { StyleSheet, FlatList, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { getHabits, deleteHabit, markHabitComplete, unmarkHabitComplete, getCompletionCount } from '../db/db'
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const HERO_URI = 'https://images.unsplash.com/photo-1669299033175-09d02a0031f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlnaHQlMjBiYWNrZ3JvdW5kJTIwcGluayUyMHdpdGglMjBib29rc3xlbnwwfHwwfHx8MA%3D%3D'

//Display Saved Habits, Mark Habit as Completed, Delete Habit

export default function HabitDetailsScreen() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    setLoading(true);
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (e) {
      console.error('Failed to load habits:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: HERO_URI }}
        style={styles.hero}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <Text>Loading habits...</Text>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      source={{ uri: HERO_URI }}
      style={styles.hero}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.container}>
        <Text style={styles.checkbox}>Pull down to Refresh List</Text>
        <FlatList
          data={habits}
          keyExtractor={(item) => item.id.toString()}
          refreshing={loading}
          onRefresh={loadHabits} //Pull down to Refresh
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.cardHabit}>Habit: {item.habitname}</Text>
                <Text style={styles.cardDuration}>Duration: {item.duration} minutes</Text>
                <Text style={styles.cardDuration}>Category: {item.category}</Text>
                <Text style={styles.cardDuration}>Completed: {item.totalCompleted || 0} days</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={!!item.completed}
                  onValueChange={async (value) => {
                    try {
                      if (value) {
                        await markHabitComplete(item.id);
                      } else {
                        await unmarkHabitComplete(item.id);
                      }
                      await loadHabits();
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  color={item.completed ? '#09691c' : undefined}
                />
                <Text style={styles.paragraph}>{item.completed ? 'Completed Today' : 'Mark Done'}</Text>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await deleteHabit(item.id);
                    await loadHabits();
                  } catch (e) {
                    console.error('Delete failed:', e);
                  }
                }}
              >
                <Ionicons name="trash-outline" size={24} color="#a81714" />
              </TouchableOpacity>
            </View>

          )}
          ListEmptyComponent={
            <View>
              <Text style={styles.empty}>
                No habits yet. Add your first habit! 🌱
              </Text>
            </View>
          }
        />
      </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    backgroundColor: '#9cd6e4',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#11457c',
    width: '100%'
  },
  cardHabit: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E' },
  cardDuration: { fontSize: 17, color: '#666' },
  empty: { textAlign: 'center', color: '#0c3765', marginTop: 30, fontStyle: 'italic', fontSize: 25 },
  checkbox: {
    margin: 8,
  },
  hero: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});