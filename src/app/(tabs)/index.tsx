import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import  ProductCard  from '../../components/ProductCard'
import { COLORS } from '../../constants/colors';
import { products } from '../../data/products';


export default function HomeScreen() {

  const [search, setSearch] = useState(''); 

  const filteredProducts = products.filter((product) => {
    return product.name
    .toLowerCase()
    .includes(search.toLowerCase());
  });
  

  return (
    <View style={styles.container}>
      
    <View style={styles.header}>
      <Text style={styles.greeting}>Welcome Back, Wayne 🦇</Text>
      <Text style={styles.title}>Gotham Store</Text>
    </View>

  <View style={styles.searchContainer}>
    <Ionicons 
      name='search'
      size={20}
      color='#71717A'
    />
    <TextInput
      placeholder="Pesquisar Produtos"
      placeholderTextColor={'#71717A'}
      value={search}
      onChangeText={setSearch}
      style={styles.searchInput}
    />
  </View>

      <FlatList 
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}     
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: 30,
        }}
      />
    

      <Text style={styles.subtitle}>
        Welcome to the Cave 🦇
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 90,
    paddingHorizontal: 24,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  
  product: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    width: '100%',
  },

  productName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },

  productPrice: {
    color: COLORS.textSecondary,
    marginTop: 8,
    fontSize: 16,
  },

  header: {
    marginBottom: 30,
  },

  greeting: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginBottom: 2,
  },

  title: {
    color: COLORS.text,
    fontSize: 38,
    marginBottom: 2,
    fontWeight: '800',
  },

  searchInput: {
    flex: 1,
    color: COLORS.text,
    paddingVertical: 16,
    paddingLeft: 10,
    fontSize: 16,
  },
 });