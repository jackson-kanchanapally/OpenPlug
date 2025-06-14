import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "12:00 PM", available: true },
    { id: "5", time: "01:00 PM", available: true },
    { id: "6", time: "02:00 PM", available: false },
    { id: "7", time: "03:00 PM", available: true },
    { id: "8", time: "04:00 PM", available: true },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };

  const handleSchedule = () => {
    if (selectedTimeSlot) {
      // Handle scheduling logic here
      console.log("Scheduled for:", selectedDate, selectedTimeSlot);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" backgroundColor="#4CAF50" />

      <View style={styles.header}>
        <Text style={styles.title}>Schedule Charging</Text>
        <Text style={styles.subtitle}>Select your preferred time slot</Text>
      </View>

      <View style={styles.calendarSection}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.calendarContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const date = new Date();
            date.setDate(date.getDate() + day);
            const isSelected =
              selectedDate.toDateString() === date.toDateString();

            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dateButton,
                  isSelected && styles.dateButtonActive,
                ]}
                onPress={() => handleDateSelect(date)}
              >
                <Text
                  style={[styles.dateText, isSelected && styles.dateTextActive]}
                >
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    isSelected && styles.dateNumberActive,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.timeSection}>
        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                !slot.available && styles.timeSlotUnavailable,
                selectedTimeSlot === slot.id && styles.timeSlotSelected,
              ]}
              onPress={() => slot.available && handleTimeSlotSelect(slot.id)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  !slot.available && styles.timeSlotTextUnavailable,
                  selectedTimeSlot === slot.id && styles.timeSlotTextSelected,
                ]}
              >
                {slot.time}
              </Text>
              {!slot.available && (
                <Text style={styles.unavailableText}>Booked</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.scheduleButton,
          !selectedTimeSlot && styles.scheduleButtonDisabled,
        ]}
        onPress={handleSchedule}
        disabled={!selectedTimeSlot}
      >
        <Text style={styles.scheduleButtonText}>Schedule Charging</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  calendarSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dateButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    width: 45,
  },
  dateButtonActive: {
    backgroundColor: "#C8E6C9",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateTextActive: {
    color: "#4CAF50",
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  dateNumberActive: {
    color: "#4CAF50",
  },
  timeSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
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
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  timeSlot: {
    width: "47%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  timeSlotUnavailable: {
    backgroundColor: "#f5f5f5",
    opacity: 0.5,
  },
  timeSlotSelected: {
    backgroundColor: "#C8E6C9",
  },
  timeSlotText: {
    fontSize: 16,
    color: "#333",
  },
  timeSlotTextUnavailable: {
    color: "#999",
  },
  timeSlotTextSelected: {
    color: "#4CAF50",
  },
  unavailableText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  scheduleButton: {
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  scheduleButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  scheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
