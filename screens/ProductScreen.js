import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const ProductScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.mainImage} />

      {product.images.length > 1 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
          {product.images.slice(1).map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      )}

      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar à sacola</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF8F2',
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  gallery: {
    marginBottom: 16,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#332C26',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#B8865C',
    fontWeight: '600',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#4F4A45',
    lineHeight: 22,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#B8865C',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductScreen;

