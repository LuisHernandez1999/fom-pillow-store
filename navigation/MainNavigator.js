import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ShopScreen from "../screens/ShopScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import OutletScreen from "../screens/OutletScreen"

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Shop") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Categories") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name == "Outlet") {
            iconName =  focused ? "outlet" : "outlet-outline";
          }
            
          return <Ionicons name={iconName} size={size} color={color} />;
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
      <Tab.Screen name="Outlet" component={OutletScreen} />

    </Tab.Navigator>
  );
}
