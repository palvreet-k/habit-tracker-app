# My Habit Tracker App

A simple React Native app to help users build and track daily habits. Users can add new habits, set durations, categorize them, mark completed, and add motivational photos for each day.

## Features
- Add, view, and delete habits
- Set daily duration and category for each habit
- Mark habits as completed
- Add motivational photos
- Beautiful background images

## Setup Instructions

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/palvreet-k/habit-tracker-app
   cd My-Habit-Tracker-App
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npx expo start
   ```
4. **Run on your device:**
   - Use the Expo Go app on your phone to scan the QR code

## Project Structure
- `App.js` — Main entry point
- `screens/` — All app screens (Home, Add Habit, Habit Details, Add Motivation Image)
- `db/` — Local database logic

## Customization
- Update background images by changing the `HERO_URI` constants in each screen file.
- Modify styles in each screen's StyleSheet for a personalized look.
