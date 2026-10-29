import { useState } from "react";
import { router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import  ProductCard  from '../../components/ProductCard'
import { COLORS } from '../../constants/colors';
import { products } from '../../data/products';


export default function HomeScreen() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('@gotham_store:user_logged');

    router.replace('/login');
  }
  

  const [search, setSearch] = useState(''); 

  const filteredProducts = products.filter((product) => {
    return product.name
    .toLowerCase()
    .includes(search.toLowerCase());
  });
  

  return (
    <SafeAreaView style={styles.container}>
      
    <View style={styles.header}>
      <Text style={styles.greeting}>Welcome Back </Text>
      <Text style={styles.title}>Kanemberg</Text>
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
        style={styles.productList}
        contentContainerStyle={styles.productListContent}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.subtitle}>
              Welcome to the Kanemberg Store
            </Text>

            <TouchableOpacity 
            onPress={handleLogout} 
            style={styles.logoutButton}
            >

              <Text style={styles.logoutButtonText}>
                  Sair da Conta
              </Text>  
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
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
    marginBottom: 20,
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
  
  logoutButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  logoutButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '700',
  },

  productList: {
    flex: 1,
  },

  productListContent: {
    paddingBottom: 30,
  },

  footer: {
    paddingTop: 10,
    paddingBottom: 20,
  }
 });