import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Login from '../components/Login';
import HomeScreen from '../components/HomeScreen';
import { View, Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 85,
          paddingBottom: 15,
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          ...Platform.select({
            ios: {
              shadowColor: 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
            },
            android: {
              elevation: 0,
            },
          }),
        },
        tabBarBackground: () => (
          <View 
            style={{ 
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }} 
          />
        ),
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={28} color={color} />
          ),
        }}
      />
      {/* Add more tab screens here as needed */}
    </Tab.Navigator>
  );
} 