import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Simulação de banco de dados outlet
const outletProducts = [
  {
    id: "1",
    name: "Travesseiro Ortobom",
    image: "https://via.placeholder.com/300x200.png?text=Produto+1",
    price: 49.9,
    oldPrice: 89.9,
    rating: 4.5,
    material: "Espuma Viscoelástica",
  },
  {
    id: "2",
    name: "Almofada de Pescoço",
    image: "https://via.placeholder.com/300x200.png?text=Produto+2",
    price: 29.9,
    oldPrice: 59.9,
    rating: 4.2,
    material: "Fibra Siliconada",
  },
  // Adicione mais produtos conforme necessário
];

export default function OutletScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aqui você pode substituir pelo fetch real da API
    setProducts(outletProducts);
  }, []);

  const handlePress = (product) => {
    navigation.navigate("Product", { product });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handlePress(item)}
    >
      <View style={styles.pillowItem}>
        <View style={styles.discountTag}>
          <Text style={styles.discountTagText}>
            -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
          </Text>
        </View>
        <Image source={{ uri: item.image }} style={styles.pillowImage} />
        <View style={styles.pillowInfo}>
          <Text style={styles.pillowName}>{item.name}</Text>
          <Text style={styles.pillowMaterial}>{item.material}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.pillowPrice}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.oldPrice}>R$ {item.oldPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Outlet</Text>
        <Text style={styles.headerSubtitle}>Produtos com descontos imperdíveis</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsGrid}
        numColumns={2}
      />
    </View>
  );
}

// Estilos reutilizando os que você forneceu
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#d50000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  productsGrid: {
    paddingHorizontal: 20,
    paddingTop: 15,
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 15,
  },
  pillowItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 280,
  },
  discountTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#d50000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountTagText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  pillowImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  pillowInfo: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  pillowName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    height: 40,
  },
  pillowMaterial: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pillowPrice: {
    fontSize: 16,
    color: "#d50000",
    fontWeight: "700",
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 13,
    color: "#999",
    textDecorationLine: "line-through",
  },
});
