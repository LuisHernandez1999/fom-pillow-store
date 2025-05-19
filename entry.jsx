"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Animated } from "react-native"
// import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const EntryScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(50))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleExplore = () => {
    // Navigate to main tab navigator
    if (navigation) {
      navigation.navigate("Main")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <LinearGradient colors={["#e6f2ff", "#ffffff"]} style={styles.background} /> */}
      <View style={[styles.background, { backgroundColor: "#e6f2ff" }]} />

      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>FOM</Text>
      </View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome to comfort</Text>
        <Text style={styles.subtitleText}>Discover the perfect pillows for your best sleep</Text>

        <TouchableOpacity style={styles.exploreButton} onPress={handleExplore} activeOpacity={0.8}>
          <Text style={styles.buttonText}>EXPLORE COLLECTION</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>LEARN ABOUT FOM</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Premium comfort for premium sleep</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.08,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 10,
    letterSpacing: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 100,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  exploreButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  secondaryButtonText: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  footer: {
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#95a5a6",
    fontStyle: "italic",
  },
})

export default EntryScreen
