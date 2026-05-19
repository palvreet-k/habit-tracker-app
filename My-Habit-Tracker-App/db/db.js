import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('allhabits.db');

export const setupDatabase = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habitname TEXT NOT NULL,
      duration INTEGER NOT NULL,
      category TEXT NOT NULL
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS completions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habitId INTEGER NOT NULL,
      date TEXT NOT NULL
    );
  `);

};

export default db;


