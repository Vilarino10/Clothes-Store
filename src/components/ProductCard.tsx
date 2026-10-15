import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { Product } from '../types/product';


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.placeholderEmoji}>🧥</Text>
            </View>

            <Text style={styles.category}>{product.category}</Text>

            <Text style={styles.name}>{product.name}</Text>

            <Text style={styles.price}>
                R$ {product.price.toFixed(2)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 28,
        padding: 18,
        marginBottom: 18,

        borderWidth: 1,
        width: '100%',
    },

    image: {
        width: '100%',
        height: 220,

        backgroundColor: COLORS.card,

        borderRadius: 18,
        marginBottom: 16,

        justifyContent: 'center',
        alignItems: 'center',
    },

    placeholderEmoji: {
        fontSize: 72,
    },

    category: {
        color: COLORS.accent,
        fontSize: 14,
        marginBottom: 6,
    },

    name: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '600',
    },

    price: {
        color: COLORS.price,
        marginTop: 8,
        fontSize: 20,
        fontWeight: '600',
    },
});