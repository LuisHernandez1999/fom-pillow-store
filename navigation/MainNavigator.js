import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

// Importe as telas
import ShopScreen from "../screens/ShopScreen"
import CategoriesScreen from "../screens/CategoriesScreen"
import CartScreen from "../screens/CartScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Shop") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Categories") {
            iconName = focused ? "grid" : "grid-outline"
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
        headerTitle: "FOM",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen name="Shop" component={ShopScreen} options={{ title: "Loja" }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ title: "Categorias" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Carrinho" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
    </Tab.Navigator>
  )
}
