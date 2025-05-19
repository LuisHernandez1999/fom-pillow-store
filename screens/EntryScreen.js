"use client"

import { useEffect, useState, useRef } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  StatusBar, 
  Animated, 
  Easing 
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

export default function EntryScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(50))
  const pulseAnim = useRef(new Animated.Value(1)).current
  const rotateAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()

    // Animação de pulso contínua
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Animação de rotação suave para o logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 8000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Animação de escala para os botões
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      delay: 600,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    }).start()
  }, [])

  const handleExplore = () => {
    // Navega para a tela principal usando React Navigation
    navigation.navigate("Main")
  }

  // Interpolação para rotação
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg']
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#d50000', '#b71c1c', '#7f0000']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <Animated.View 
        style={[
          styles.logoContainer,
          {
            transform: [
              { rotate: spin },
              { scale: pulseAnim }
            ]
          }
        ]}
      >
        <Text style={styles.logoText}>FOM</Text>
        <View style={styles.logoUnderline} />
      </Animated.View>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Bem-vindo ao Conforto</Text>
        <Text style={styles.subtitleText}>Descubra os travesseiros perfeitos para o seu melhor sono</Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
          <TouchableOpacity 
            style={styles.exploreButton} 
            onPress={handleExplore} 
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>EXPLORAR COLEÇÃO</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>CONHEÇA A FOM</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.View 
        style={[
          styles.decorCircle,
          { opacity: fadeAnim }
        ]} 
      />
      <Animated.View 
        style={[
          styles.decorCircle2,
          { opacity: fadeAnim }
        ]} 
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Conforto premium para um sono premium</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d50000",
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
    marginTop: height * 0.1,
  },
  logoText: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
    letterSpacing: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  logoUnderline: {
    height: 4,
    width: 80,
    backgroundColor: '#ffffff',
    marginTop: 10,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 80,
    zIndex: 2,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitleText: {
    fontSize: 18,
    color: "#ffebee",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#d50000",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    marginTop: 5,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  footer: {
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#ffcdd2",
    fontStyle: "italic",
  },
  decorCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -50,
    right: -50,
    zIndex: 1,
  },
  decorCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    bottom: -100,
    left: -100,
    zIndex: 1,
  }
})