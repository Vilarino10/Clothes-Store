import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { products } from '@/data/products';
import { COLORS } from '@/constants/colors';

import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const { addToCart } = useContext(CartContext)

    const product = products.find((item) => item.id === id); 

    return (
        <View style={styles.container}>
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
                    router.push('/cart');
                }
            }}>
                <Text style={styles.cartButtonText}>
                    Adicionar ao Carrinho
                </Text>
            </TouchableOpacity>
        </View>
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
});