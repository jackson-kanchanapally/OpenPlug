import { colors } from "@/src/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { forwardRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

type Props = {
  user: any;
  onConnect: () => void;
  onClose: () => void;
};

const ProfileActionSheet = forwardRef<ActionSheetRef, Props>(
  ({ user, onConnect, onClose }, ref) => {
    return (
      <ActionSheet ref={ref} containerStyle={styles.sheet}>
        <View style={styles.header}>
          <View style={styles.avatar}></View>
          <Text style={styles.title}>{user?.ownerName}</Text>
          <View style={styles.rating}>
            <AntDesign name="star" size={16} color={colors.darkGold} />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
        <Text style={styles.info}>Name: {user?.ownerName}</Text>
        <Text style={styles.info}>Charger Type: {user?.chargerType}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={onClose}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                backgroundColor: colors.emeraldGreen,
              },
              styles.connectBtn,
            ]}
            onPress={onConnect}
          >
            <Text
              style={[
                {
                  color: colors.white,
                },
                styles.connectText,
              ]}
            >
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    );
  }
);

export default ProfileActionSheet;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#ccc",
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    paddingLeft: 2,
  },
  rating: {
    flexDirection: "row",
    width: "30%",
    alignItems: "center",
  },
  sheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    width: "70%",
    paddingRight: 10,
  },
  connectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  backText: {
    color: "#333",
    fontWeight: "600",
  },
  backBtn: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  connectText: {
    fontWeight: "600",
  },
});
