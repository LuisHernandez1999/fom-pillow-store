import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

// Importe suas telas aqui
import EntryScreen from "./entry-screen"

// Telas de exemplo (substitua por suas telas reais)
import { View, Text } from "react-native"

const ShopScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Loja de Travesseiros</Text>
  </View>
)

const CategoriesScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Categorias</Text>
  </View>
)

const CartScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Carrinho</Text>
  </View>
)

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Perfil</Text>
  </View>
)

// Criando os navegadores
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// Navegador de abas principal
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Loja") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Categorias") {
            iconName = focused ? "grid" : "grid-outline"
          } else if (route.name === "Carrinho") {
            iconName = focused ? "cart" : "cart-outline"
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Loja" component={ShopScreen} />
      <Tab.Screen name="Categorias" component={CategoriesScreen} />
      <Tab.Screen name="Carrinho" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

// Navegador principal que inclui a tela de entrada e o navegador de abas
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
