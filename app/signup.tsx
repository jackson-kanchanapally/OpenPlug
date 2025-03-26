import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

type UserType = 'consumer' | 'provider' | 'both';

export default function SignupScreen() {
  const [userType, setUserType] = useState<UserType>('consumer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    // Provider specific fields
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    chargerType: '',
    availableHours: '',
    pricePerHour: '',
    // Additional fields for both
    vehicleType: '',
    licensePlate: '',
  });

  const handleSignup = () => {
    // Handle signup logic here
    console.log('Signup data:', { userType, ...formData });
  };

  const renderUserTypeSelector = () => (
    <View style={styles.userTypeContainer}>
      <Text style={styles.sectionTitle}>I want to:</Text>
      <View style={styles.userTypeButtons}>
        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'consumer' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('consumer')}
        >
          <View style={[
            styles.iconContainer,
            userType === 'consumer' && styles.iconContainerActive
          ]}>
            <Ionicons
              name="car-outline"
              size={24}
              color={userType === 'consumer' ? '#2E7D32' : '#2E7D32'}
            />
          </View>
          <Text style={[
            styles.userTypeButtonText,
            userType === 'consumer' && styles.userTypeButtonTextActive,
          ]}>
            Use Chargers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'provider' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('provider')}
        >
          <View style={[
            styles.iconContainer,
            userType === 'provider' && styles.iconContainerActive
          ]}>
            <Ionicons
              name="flash"
              size={24}
              color={userType === 'provider' ? '#2E7D32' : '#2E7D32'}
            />
          </View>
          <Text style={[
            styles.userTypeButtonText,
            userType === 'provider' && styles.userTypeButtonTextActive,
          ]}>
            Share Charger
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.userTypeButton,
            userType === 'both' && styles.userTypeButtonActive,
          ]}
          onPress={() => setUserType('both')}
        >
          <View style={[
            styles.iconContainer,
            userType === 'both' && styles.iconContainerActive
          ]}>
            <Ionicons
              name="swap-horizontal"
              size={24}
              color={userType === 'both' ? '#2E7D32' : '#2E7D32'}
            />
          </View>
          <Text style={[
            styles.userTypeButtonText,
            userType === 'both' && styles.userTypeButtonTextActive,
          ]}>
            Both
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConsumerFields = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Vehicle Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Vehicle Type"
        value={formData.vehicleType}
        onChangeText={(text) => setFormData({ ...formData, vehicleType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Vechile Number "
        value={formData.licensePlate}
        onChangeText={(text) => setFormData({ ...formData, licensePlate: text })}
      />
    </View>
  );

  const renderProviderFields = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Charger Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Charger Type (e.g., Level 1, Level 2)"
        value={formData.chargerType}
        onChangeText={(text) => setFormData({ ...formData, chargerType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Available Hours (e.g., 9 AM - 5 PM)"
        value={formData.availableHours}
        onChangeText={(text) => setFormData({ ...formData, availableHours: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price per Hour ($)"
        value={formData.pricePerHour}
        onChangeText={(text) => setFormData({ ...formData, pricePerHour: text })}
        keyboardType="numeric"
      />
      <Text style={styles.infoText}>
        By listing your home charger, you agree to share your charging facility with other EV owners in the community.
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      
      <View style={styles.header}>
        <Image
          source={require('../assets/images/react-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our charging network</Text>
      </View>

      {renderUserTypeSelector()}

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
        />
      </View>

      {(userType === 'consumer' || userType === 'both') && renderConsumerFields()}
      {(userType === 'provider' || userType === 'both') && renderProviderFields()}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    marginTop: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userTypeContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -30,
    marginHorizontal: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  userTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  userTypeButtonActive: {
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainerActive: {
    backgroundColor: '#FFFFFF',
  },
  userTypeButtonText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
    textAlign: 'center',
  },
  userTypeButtonTextActive: {
    color: '#2E7D32',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
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
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#2E7D32',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#666',
    fontSize: 16,
  },
  loginLink: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 20,
  },
}); 