import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { statsData, iconComponents, menuSections } from "@/data";
export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header with Background */}
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
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
        {statsData.map((item, index) => {
          const IconComponent = iconComponents[item.iconLib];

          return (
            <View key={index} style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <IconComponent name={item.iconName} size={20} color="#2E7D32" />
              </View>
              <Text style={styles.statNumber}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Profile Menu Items */}
      <View style={styles.menuContainer}>
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>

            {section.items.map((item, itemIndex) => {
              const Icon = iconComponents[item.iconLib];

              return (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.menuItem,
                    item.isLogout && styles.logoutButton,
                  ]}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIconContainer}>
                      <Icon
                        name={item.iconName}
                        size={24}
                        color={item.iconColor}
                      />
                    </View>
                    <Text
                      style={[
                        styles.menuItemText,
                        item.isLogout && styles.logoutText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                  {!item.isLogout && (
                    <Ionicons name="chevron-forward" size={24} color="#666" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerBackground: {
    backgroundColor: "#4CAF50",
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "#2E7D32",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginTop: -30,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
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
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  menuContainer: {
    padding: 20,
  },
  menuSection: {
    marginBottom: 25,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 15,
    marginLeft: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 10,
  },
  logoutText: {
    color: "#FF3B30",
  },
});
