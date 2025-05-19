// screens/CategoriesScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Animated,
  Dimensions,
  StatusBar,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Dados de exemplo para categorias com imagens e descrições
const categories = [
  { 
    id: '1', 
    name: 'Travesseiros de Espuma', 
    count: '12 produtos',
    description: 'Conforto e suporte para um sono tranquilo',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    color: '#d50000',
    icon: 'cube-outline',
    featured: true
  },
  { 
    id: '2', 
    name: 'Travesseiros Ortopédicos', 
    count: '8 produtos',
    description: 'Alívio para dores no pescoço e coluna',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    color: '#9c27b0',
    icon: 'fitness-outline',
    featured: true
  },
  { 
    id: '3', 
    name: 'Travesseiros de Plumas', 
    count: '5 produtos',
    description: 'Maciez e luxo para noites especiais',
    image: 'https://images.unsplash.com/photo-1629196914168-3100be76b751?q=80&w=2070&auto=format&fit=crop',
    color: '#2196f3',
    icon: 'leaf-outline',
    featured: false
  },
  { 
    id: '4', 
    name: 'Travesseiros Cervicais', 
    count: '7 produtos',
    description: 'Suporte ergonômico para a região cervical',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    color: '#4caf50',
    icon: 'body-outline',
    featured: true
  },
  { 
    id: '5', 
    name: 'Travesseiros de Látex', 
    count: '4 produtos',
    description: 'Durabilidade e resistência a ácaros',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    color: '#ff9800',
    icon: 'water-outline',
    featured: false
  },
  { 
    id: '6', 
    name: 'Travesseiros Infantis', 
    count: '6 produtos',
    description: 'Segurança e conforto para os pequenos',
    image: 'https://images.unsplash.com/photo-1629196914168-3100be76b751?q=80&w=2070&auto=format&fit=crop',
    color: '#e91e63',
    icon: 'happy-outline',
    featured: false
  },
  { 
    id: '7', 
    name: 'Travesseiros Antialérgicos', 
    count: '9 produtos',
    description: 'Proteção contra alergias e ácaros',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1974&auto=format&fit=crop',
    color: '#673ab7',
    icon: 'medkit-outline',
    featured: false
  },
  { 
    id: '8', 
    name: 'Travesseiros de Viagem', 
    count: '3 produtos',
    description: 'Compactos e práticos para suas jornadas',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop',
    color: '#009688',
    icon: 'airplane-outline',
    featured: false
  },
];

// Componente para categorias em destaque
const FeaturedCategory = ({ item, index }) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];
  
  const scale = useRef(new Animated.Value(1)).current;
  
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.featuredCategoryContainer}
    >
      <Animated.View 
        style={[
          styles.featuredCategory,
          { transform: [{ scale }] }
        ]}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.featuredImage} 
        />
        <View style={[styles.featuredOverlay, { backgroundColor: `${item.color}99` }]} />
        
        <View style={styles.featuredContent}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={24} color="#fff" />
          </View>
          
          <View style={styles.featuredInfo}>
            <Text style={styles.featuredName}>{item.name}</Text>
            <Text style={styles.featuredDescription}>{item.description}</Text>
            <View style={styles.featuredFooter}>
              <Text style={styles.featuredCount}>{item.count}</Text>
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Componente para cada categoria na grade
const CategoryGridItem = ({ item }) => {
  const scale = useRef(new Animated.Value(1)).current;
  
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.gridItemContainer}
    >
      <Animated.View 
        style={[
          styles.gridItem,
          { transform: [{ scale }] }
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.gridImage} />
        <View style={[styles.gridOverlay, { backgroundColor: `${item.color}99` }]} />
        
        <View style={styles.gridContent}>
          <View style={[styles.gridIconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={20} color="#fff" />
          </View>
          
          <Text style={styles.gridName}>{item.name}</Text>
          <Text style={styles.gridCount}>{item.count}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Filtrar categorias com base na pesquisa
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(item => 
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.description.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };
  
  // Separar categorias em destaque
  const featuredCategories = categories.filter(item => item.featured);
  
  // Animação do cabeçalho
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });
  
  const titleScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#d50000" />
      
      {/* Cabeçalho animado */}
      <Animated.View 
        style={[
          styles.header,
          { 
            height: headerHeight,
          }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Animated.View 
            style={[
              styles.titleContainer,
              { 
                opacity: headerOpacity,
                transform: [{ scale: titleScale }]
              }
            ]}
          >
            <Text style={styles.title}>Categorias</Text>
            <Text style={styles.subtitle}>Explore nossos diferentes tipos de travesseiros</Text>
          </Animated.View>
        </View>
      </Animated.View>
      
      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar categorias..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Conteúdo principal */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Categorias em destaque */}
        {featuredCategories.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Categorias em Destaque</Text>
            
            {featuredCategories.map((item, index) => (
              <FeaturedCategory key={item.id} item={item} index={index} />
            ))}
          </View>
        )}
        
        {/* Todas as categorias */}
        <View style={styles.allCategoriesSection}>
          <Text style={styles.sectionTitle}>Todas as Categorias</Text>
          
          {filteredCategories.length === 0 ? (
            <View style={styles.noResults}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={styles.noResultsText}>Nenhuma categoria encontrada</Text>
            </View>
          ) : (
            <View style={styles.categoriesGrid}>
              {filteredCategories.map(item => (
                <CategoryGridItem key={item.id} item={item} />
              ))}
            </View>
          )}
        </View>
        
        {/* Seção de ajuda */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <View style={styles.helpIconContainer}>
              <Ionicons name="help-circle-outline" size={30} color="#d50000" />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Precisa de ajuda?</Text>
              <Text style={styles.helpText}>
                Nossos especialistas podem ajudar você a escolher o travesseiro ideal para suas necessidades.
              </Text>
              <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.helpButtonText}>Falar com Especialista</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      
      {/* Botão flutuante */}
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="filter" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#d50000',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  backButton: {
    marginRight: 15,
    marginBottom: 5,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: -25,
    height: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  
  // Estilos para categorias em destaque
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  featuredCategoryContainer: {
    marginBottom: 15,
  },
  featuredCategory: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estilos para todas as categorias
  allCategoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItemContainer: {
    width: '48%',
    marginBottom: 15,
  },
  gridItem: {
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  gridIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gridCount: {
    fontSize: 12,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Estilos para seção de ajuda
  helpSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  helpCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  helpIconContainer: {
    marginRight: 15,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: '#d50000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Estilos para botão flutuante
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#d50000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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