import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { getHabits, deleteHabit , markHabitComplete, unmarkHabitComplete} from '../db/db'
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

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
      <View >
        <Text>Loading habits...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHabit}>Habit: {item.habitname}</Text>
              <Text style={styles.cardDuration}>Duration: {item.duration}</Text>
              <Text style={styles.cardDuration}>Category: {item.category}</Text>
              <Text style={styles.cardDuration}>Streak:</Text>
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
              <Text style={styles.paragraph}>{item.completed? 'Completed Today' : 'Mark Done'}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={24} color="#a81714" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4d6f6' },
  card: {
    backgroundColor: '#fff', padding: 14, borderRadius: 10,
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#4A90D9',
    backgroundColor: '#cbf1d7'
  },
  cardHabit: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E' },
  cardDuration: { fontSize: 17, color: '#666' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 30, fontStyle: 'italic' },
  checkbox: {
    margin: 8,
  },
});