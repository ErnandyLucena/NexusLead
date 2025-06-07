import React from 'react';
import { Text, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import LogScreen from '../../screens/LogScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Log':
              iconName = 'document-text';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            default:
              iconName = 'ellipse';
              break;
          }

          
          const scale = focused ? 1.2 : 1;

          return (
            <Animated.View
              style={{
                marginTop: 5,
                transform: [{ scale }],
                shadowColor: focused ? '#00843D' : 'transparent',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: focused ? 0.6 : 0,
                shadowRadius: 4,
               
              }}
            >
              <Ionicons name={iconName as any} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: '#00843D',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabel: ({ focused, color }) =>
          focused ? (
            <Text style={{ color, fontWeight: 'bold', fontSize: 12 }}>
              {route.name}
            </Text>
          ) : null,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}
