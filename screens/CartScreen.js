// screens/CartScreen.js
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

// Dados de exemplo para o carrinho
const cartItems = [
  { id: '1', name: 'Travesseiro de Espuma', price: 'R$ 89,90', quantity: 1 },
  { id: '2', name: 'Travesseiro Ortopédico', price: 'R$ 129,90', quantity: 2 },
];

// Componente para cada item do carrinho
const CartItem = ({ name, price, quantity }) => (
  <View style={styles.cartItem}>
    <View style={styles.itemColor} />
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemPrice}>{price}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>Quantidade: {quantity}</Text>
      </View>
    </View>
  </View>
);

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CartItem name={item.name} price={item.price} quantity={item.quantity} />
            )}
            style={styles.list}
          />
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryValue}>R$ 349,70</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Frete:</Text>
              <Text style={styles.summaryValue}>R$ 15,00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalValue}>R$ 364,70</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubtext}>Adicione produtos para continuar</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemColor: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#3498db',
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  summaryValue: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 8,
    paddingTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  checkoutButton: {
    backgroundColor: '#3498db',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});