// screens/ShopScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dados para o carrossel de promoções
const promotions = [
  {
    id: 'promo1',
    title: 'OFERTA ESPECIAL',
    description: 'Travesseiros premium com 30% OFF',
    color: '#d50000',
    discount: '30%',
    endDate: '3 dias',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop'
  },
  {
    id: 'promo2',
    title: 'COMBO FAMÍLIA',
    description: 'Leve 4, pague 3 em travesseiros selecionados',
    color: '#9c27b0',
    discount: '25%',
    endDate: '5 dias',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'promo3',
    title: 'LANÇAMENTO',
    description: 'Nova linha de travesseiros ergonômicos',
    color: '#2196f3',
    discount: '15%',
    endDate: '7 dias',
    image: 'https://images.unsplash.com/photo-1629196914168-3100be76b751?q=80&w=2070&auto=format&fit=crop'
  },
];

// Categorias de travesseiros
const categories = [
  { id: 'cat1', name: 'Ortopédicos', icon: 'fitness-outline' },
  { id: 'cat2', name: 'Plumas', icon: 'leaf-outline' },
  { id: 'cat3', name: 'Espuma', icon: 'cube-outline' },
  { id: 'cat4', name: 'Látex', icon: 'water-outline' },
  { id: 'cat5', name: 'Infantil', icon: 'happy-outline' },
];

// Dados de exemplo para travesseiros com mais detalhes
const pillowData = [
  { 
    id: '1', 
    name: 'Travesseiro de Espuma Premium', 
    price: 'R$ 89,90', 
    oldPrice: 'R$ 129,90',
    rating: 4.5, 
    material: 'Espuma viscoelástica', 
    stock: 'Em estoque',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    isPromo: true,
    discount: '30%'
  },
  { 
    id: '2', 
    name: 'Travesseiro Ortopédico Cervical', 
    price: 'R$ 129,90', 
    rating: 4.8, 
    material: 'Espuma com memória', 
    stock: 'Em estoque',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    isPromo: false
  },
  { 
    id: '3', 
    name: 'Travesseiro de Plumas Luxo', 
    price: 'R$ 149,90', 
    oldPrice: 'R$ 189,90',
    rating: 4.2, 
    material: 'Plumas naturais', 
    stock: 'Poucas unidades',
    image: 'https://images.unsplash.com/photo-1629196914168-3100be76b751?q=80&w=2070&auto=format&fit=crop',
    isPromo: true,
    discount: '20%'
  },
  { 
    id: '4', 
    name: 'Travesseiro Cervical Terapêutico', 
    price: 'R$ 119,90', 
    rating: 4.7, 
    material: 'Látex ergonômico', 
    stock: 'Em estoque',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    isPromo: false
  },
  { 
    id: '5', 
    name: 'Travesseiro de Látex Natural', 
    price: 'R$ 199,90', 
    rating: 4.9, 
    material: 'Látex natural', 
    stock: 'Esgotado',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    isPromo: false
  },
  { 
    id: '6', 
    name: 'Travesseiro Macio Premium', 
    price: 'R$ 179,90', 
    oldPrice: 'R$ 219,90',
    rating: 4.6, 
    material: 'Microfibra', 
    stock: 'Em estoque',
    image: 'https://images.unsplash.com/photo-1629196914168-3100be76b751?q=80&w=2070&auto=format&fit=crop',
    isPromo: true,
    discount: '15%'
  },
  { 
    id: '7', 
    name: 'Travesseiro Antialérgico', 
    price: 'R$ 109,90', 
    rating: 4.4, 
    material: 'Tecido hipoalergênico', 
    stock: 'Em estoque',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    isPromo: false
  },
  { 
    id: '8', 
    name: 'Travesseiro de Bambu Ecológico', 
    price: 'R$ 159,90', 
    rating: 4.3, 
    material: 'Fibra de bambu', 
    stock: 'Poucas unidades',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    isPromo: false
  },
];

// Componente para o carrossel de promoções
const PromotionCard = ({ item, index }) => {
  return (
    <View style={[styles.promoCard, { backgroundColor: item.color }]}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.promoImage} 
        resizeMode="cover"
      />
      <View style={styles.promoOverlay} />
      <View style={styles.promoContent}>
        <View style={styles.promoHeader}>
          <Text style={styles.promoTitle}>{item.title}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        </View>
        <Text style={styles.promoDescription}>{item.description}</Text>
        <View style={styles.promoFooter}>
          <Text style={styles.promoTimeLeft}>Termina em {item.endDate}</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Ver Ofertas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Componente para cada categoria
const CategoryItem = ({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.categoryItem, isSelected && styles.categoryItemSelected]} 
      onPress={onPress}
    >
      <View style={[styles.categoryIcon, isSelected && styles.categoryIconSelected]}>
        <Ionicons name={item.icon} size={22} color={isSelected ? '#fff' : '#d50000'} />
      </View>
      <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

// Componente para cada item da lista de produtos
const PillowItem = ({ item }) => {
  // Determina a cor do status de estoque
  const getStockColor = () => {
    if (item.stock === 'Em estoque') return '#4CAF50';
    if (item.stock === 'Poucas unidades') return '#FF9800';
    return '#F44336';
  };

  // Renderiza as estrelas de avaliação
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={`star-${i}`} name="star" size={14} color="#FFD700" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Ionicons key={`star-${i}`} name="star-half" size={14} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={`star-${i}`} name="star-outline" size={14} color="#FFD700" />);
      }
    }
    
    return stars;
  };

  return (
    <TouchableOpacity style={styles.pillowItem}>
      {item.isPromo && (
        <View style={styles.discountTag}>
          <Text style={styles.discountTagText}>{item.discount}</Text>
        </View>
      )}
      
      <Image source={{ uri: item.image }} style={styles.pillowImage} />
      
      <View style={styles.pillowInfo}>
        <Text style={styles.pillowName} numberOfLines={2}>{item.name}</Text>
        
        <View style={styles.ratingContainer}>
          {renderStars(item.rating)}
          <Text style={styles.ratingText}> ({item.rating})</Text>
        </View>
        
        <Text style={styles.pillowMaterial} numberOfLines={1}>{item.material}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.pillowPrice}>{item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          )}
        </View>
        
        <View style={styles.pillowFooter}>
          <Text style={[styles.stockStatus, { color: getStockColor() }]}>
            {item.stock}
          </Text>
          
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="cart-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ShopScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(pillowData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Função para filtrar os travesseiros com base na pesquisa
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredData(pillowData);
    } else {
      const filtered = pillowData.filter(item => 
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.material.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Função para filtrar por categoria
  const handleCategoryPress = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
      setFilteredData(pillowData);
    } else {
      setSelectedCategory(category.id);
      // Aqui você filtraria por categoria real, mas para este exemplo apenas simulamos
      const filtered = pillowData.filter((_, index) => index % 2 === (category.id === 'cat1' ? 0 : 1));
      setFilteredData(filtered);
    }
  };

  // Indicadores do carrossel
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {promotions.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={`dot-${i}`}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  // Filtra os produtos em promoção
  const promoProducts = pillowData.filter(item => item.isPromo);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FOM</Text>
        <Text style={styles.headerSubtitle}>Loja de Travesseiros</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Barra de pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar travesseiros..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Carrossel de promoções */}
        <View style={styles.promoSection}>
          <Text style={styles.sectionTitle}>Promoções Especiais</Text>
          
          <Animated.FlatList
            data={promotions}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item, index }) => <PromotionCard item={item} index={index} />}
            contentContainerStyle={styles.promoList}
          />
          
          {renderDots()}
        </View>
        
        {/* Categorias */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryItem 
                item={item} 
                isSelected={selectedCategory === item.id}
                onPress={() => handleCategoryPress(item)}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {/* Produtos em promoção */}
        <View style={styles.promoProductsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ofertas Imperdíveis</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver Todos</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={promoProducts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <PillowItem item={item} />}
            contentContainerStyle={styles.promoProductsList}
          />
        </View>
        
        {/* Todos os produtos */}
        <View style={styles.allProductsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Todos os Produtos</Text>
            <View style={styles.sortContainer}>
              <Ionicons name="filter-outline" size={18} color="#d50000" />
              <Text style={styles.sortText}>Filtrar</Text>
            </View>
          </View>
          
          {filteredData.length === 0 ? (
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={styles.noResultsText}>Nenhum travesseiro encontrado</Text>
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredData.map(item => (
                <View key={item.id} style={styles.gridItem}>
                  <PillowItem item={item} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#d50000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  
  // Estilos para a seção de promoções
  promoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  promoList: {
    paddingRight: 20,
  },
  promoCard: {
    width: width - 40,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 20,
  },
  promoImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  promoContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  discountBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  discountText: {
    color: '#d50000',
    fontWeight: '800',
    fontSize: 16,
  },
  promoDescription: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  promoTimeLeft: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    color: '#d50000',
    fontWeight: '700',
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#d50000',
    marginHorizontal: 4,
  },
  
  // Estilos para categorias
  categoriesSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  categoriesList: {
    paddingRight: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryIconSelected: {
    backgroundColor: '#d50000',
    borderColor: '#d50000',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#d50000',
    fontWeight: '600',
  },
  categoryItemSelected: {
    // Estilos para categoria selecionada
  },
  
  // Estilos para produtos em promoção
  promoProductsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#d50000',
    fontWeight: '600',
    fontSize: 14,
  },
  promoProductsList: {
    paddingRight: 20,
  },
  
  // Estilos para todos os produtos
  allProductsSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: '#d50000',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 15,
  },
  
  // Estilos para cada item de travesseiro
  pillowItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 280,
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#d50000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountTagText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  pillowImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  pillowInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  pillowName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    height: 40,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  pillowMaterial: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pillowPrice: {
    fontSize: 16,
    color: '#d50000',
    fontWeight: '700',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  pillowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#d50000',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estilos para nenhum resultado
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});