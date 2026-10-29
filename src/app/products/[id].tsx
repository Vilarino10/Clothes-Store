import { View, Text, StyleSheet, Image, TouchableOpacity, Vibration } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { products } from '@/data/products';
import { COLORS } from '@/constants/colors';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const { addToCart } = useContext(CartContext)

    const product = products.find((item) => item.id === id); 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => {router.back()}}
                    style={styles.backButton}
                    >
                    
                    <Ionicons 
                    name='arrow-back'
                    size={28}
                    color={COLORS.text}
                    style={{ transform: [{ translateY: -11 }] }}
                    />

                </TouchableOpacity>

                <Text style={styles.backToProductsList}>Voltar ao Catálogo de Produtos</Text>
            </View>
            <Image 
                source={{ uri: product?.image }}
                style={styles.image}
            />
            <Text style={styles.title}>
                {product?.name}
            </Text>

            <Text style={styles.category}>
                {product?.category}
            </Text>

            <Text style={styles.price}>
                R$ {product?.price.toFixed(2)}
            </Text>

            <TouchableOpacity style={styles.cartButton} onPress={() => {
                if (product) {
                    addToCart(product);
                    Vibration.vibrate(100);
                    router.push('/cart');
                }
            }}>
                <Text style={styles.cartButtonText}>
                    Adicionar ao Carrinho
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: '700',
    },

    image: {
        width: '100%',
        height: 300,
        borderRadius: 24,
        marginBottom: 24,
    },

    category: {
        color: COLORS.textSecondary,
        fontSize: 16,
        marginBottom: 8,
    },

    price: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '700',
    },

    cartButton: {
        width: '90%',
        backgroundColor: COLORS.text,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 32,
    },

    cartButtonText: {
        color: '#111111',
        fontSize: 16,
        fontWeight: '700',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        width: '100%',
        paddingHorizontal: 20,
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },

    backToProductsList: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 24,
    },
});