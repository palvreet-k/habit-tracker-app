import { StyleSheet, FlatList, View} from 'react-native';
import db from '../db/db.js'

const habits =  db.getAllSync('SELECT * FROM habits');
export default function HabitDetailsScreen(){
    return(
        <FlatList
        data={habits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardSubject}>{item.habitname}</Text>
            <Text style={styles.cardDuration}>{item.duration}</Text>
            <Text style={styles.cardDuration}>{item.category}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No habitslogged yet</Text>
        }
      />
    )
}
const styles = StyleSheet.create({
card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#4A90D9' },
  cardSubject: { fontSize: 15, fontWeight: 'bold', color: '#1A1A2E' },
  cardDuration: { fontSize: 13, color: '#666' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 30, fontStyle: 'italic' },
  });