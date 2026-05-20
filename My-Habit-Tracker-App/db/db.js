import * as SQLite from 'expo-sqlite';

let db;

// Create / get DB instance (lazy init)
async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('allhabits.db');
  }
  return db;
}

// Setup tables
export async function setupDatabase() {
  const db = await getDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habitname TEXT NOT NULL,
      duration INTEGER NOT NULL,
      category TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habitId INTEGER NOT NULL,
      date TEXT NOT NULL
    );
  `);
}

// Get all habits
export async function getHabits() {
  const db = await getDB();

  const today = new Date().toISOString().split('T')[0];

  const habits = await db.getAllAsync(`
    SELECT 
      habits.*,
      EXISTS(
        SELECT 1
        FROM completions
        WHERE completions.habitId = habits.id
        AND completions.date = '${today}'
      ) AS completed
    FROM habits
  `);

  for (let habit of habits) {
    habit.totalCompleted = await getCompletionCount(habit.id);
  }

  return habits;
}

// Insert habit example (optional but useful)
export async function addHabit(habitname, duration, category) {
  const db = await getDB();

  return await db.runAsync(
    'INSERT INTO habits (habitname, duration, category) VALUES (?, ?, ?)',
    [habitname, duration, category]
  );
}

export async function markHabitComplete(habitId) {
  const db = await getDB();

  const today = new Date().toISOString().split('T')[0];

  await db.runAsync(
    'INSERT INTO completions (habitId, date) VALUES (?, ?)',
    [habitId, today]
  );
}

export async function unmarkHabitComplete(habitId) {
  const db = await getDB();

  const today = new Date().toISOString().split('T')[0];

  await db.runAsync(
    'DELETE FROM completions WHERE habitId = ? AND date = ?',
    [habitId, today]
  );
}

export async function deleteHabit(habitId) {
  const db = await getDB();

  await db.runAsync(
    'DELETE FROM completions WHERE habitId = ?',
    [habitId]
  );

  await db.runAsync(
    'DELETE FROM habits WHERE id = ?',
    [habitId]
  );
}

export async function getCompletionCount(habitId) {
  const db = await getDB();

  const result = await db.getFirstAsync(
    `SELECT COUNT(*) as count
     FROM completions
     WHERE habitId = ?`,
    [habitId]
  );

  return result.count;
}