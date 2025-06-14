import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export const statsData = [
  {
    iconLib: "FontAwesome5",
    iconName: "calendar-check",
    value: "12",
    label: "Bookings",
  },
  {
    iconLib: "Ionicons",
    iconName: "star",
    value: "4.8",
    label: "Rating",
  },
  {
    iconLib: "FontAwesome5",
    iconName: "coins",
    value: "150",
    label: "Wallet",
  },
];
export const iconComponents = {
  FontAwesome5,
  Ionicons,
};
export const menuSections = [
  {
    title: "Account",
    items: [
      {
        label: "Edit Profile",
        iconLib: "Ionicons",
        iconName: "person-outline",
        iconColor: "#2E7D32",
      },
      {
        label: "Payment Methods",
        iconLib: "FontAwesome5",
        iconName: "credit-card",
        iconColor: "#2E7D32",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        label: "Notifications",
        iconLib: "Ionicons",
        iconName: "notifications-outline",
        iconColor: "#2E7D32",
      },
      {
        label: "Privacy & Security",
        iconLib: "Ionicons",
        iconName: "lock-closed-outline",
        iconColor: "#2E7D32",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        label: "Help & Support",
        iconLib: "Ionicons",
        iconName: "help-circle-outline",
        iconColor: "#2E7D32",
      },
      {
        label: "Logout",
        iconLib: "Ionicons",
        iconName: "log-out-outline",
        iconColor: "#FF3B30",
        isLogout: true,
      },
    ],
  },
];
