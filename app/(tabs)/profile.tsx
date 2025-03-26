import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
     
      
      {/* Profile Header with Background */}
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color="#2E7D32" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
      </View>

      {/* Profile Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome5 name="calendar-check" size={20} color="#2E7D32" />
          </View>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name="star" size={20} color="#2E7D32" />
          </View>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <FontAwesome5 name="coins" size={20} color="#2E7D32" />
          </View>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Points</Text>
        </View>
      </View>

      {/* Profile Menu Items */}
      <View style={styles.menuContainer}>
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="person-outline" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <FontAwesome5 name="credit-card" size={20} color="#2E7D32" />
              </View>
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="notifications-outline" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="lock-closed-outline" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.menuItemText}>Privacy & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="help-circle-outline" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
              </View>
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    backgroundColor: '#4CAF50',
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
  },
  menuSection: {
    marginBottom: 25,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
  },
  logoutText: {
    color: '#FF3B30',
  },
});
