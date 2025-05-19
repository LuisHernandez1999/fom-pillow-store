// screens/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>FU</Text>
        </View>
        <Text style={styles.userName}>FOM User</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Informações Pessoais</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="location-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Endereços</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="card-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Métodos de Pagamento</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pedidos</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="time-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Histórico de Pedidos</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="return-down-back-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Devoluções</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Notificações</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="language-outline" size={22} color="#3498db" style={styles.menuIcon} />
          <Text style={styles.menuText}>Idioma</Text>
          <Ionicons name="chevron-forward" size={22} color="#bdc3c7" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>SAIR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  section: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },
  logoutButton: {
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: "#e74c3c",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
});