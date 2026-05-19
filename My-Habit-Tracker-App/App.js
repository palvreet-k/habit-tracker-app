import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import {setupDatabase} from './db/db.js'

import HomeScreen from './screens/HomeScreen.jsx';
import AddHabitScreen from './screens/AddHabitScreen.jsx';
import HabitDetails from './screens/HabitDetailsScreen.jsx';
import Gallery from './screens/AddMotivationImage.jsx';

const Tabs = createBottomTabNavigator();
export default function App() {

  // Set up SQLiteDB for 2 tables
  useEffect(() => {
  setupDatabase();
}, []);

  return (
      <NavigationContainer>
        <Tabs.Navigator screenOptions={{
       tabBarStyle: {
      backgroundColor: '#070219',
    },
    headerStyle: {
      backgroundColor: '#070900',
    },
    headerTintColor: 'white',
  }}>
          <Tabs.Screen name ="Home" component={HomeScreen}
          options={{tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}}>
          </Tabs.Screen>
           <Tabs.Screen name ="Add New" component={AddHabitScreen}
          options={{tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />}}>
          </Tabs.Screen>
            <Tabs.Screen name ="Saved Habits" component={HabitDetails}
          options={{tabBarIcon: ({ color, size }) => <Ionicons name="walk-outline" size={size} color={color} />, tabBarBadge:4}}>
          </Tabs.Screen> 
          {/* <Tabs.Screen name ="Gallery" component={Gallery}
          options={{tabBarIcon: ({ color, size }) => <Ionicons name="images-outline" size={size} color={color} />, tabBarBadge:4}}> */}
           {/* </Tabs.Screen>   */} 
        </Tabs.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b6f7ce',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
