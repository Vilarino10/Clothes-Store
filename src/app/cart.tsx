import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, StyleSheet } from  'react-native';

import { COLORS } from "@/constants/colors";
import { CartContext } from "@/context/CartContext";

export default function CartScreen() {
    const { cart } = useContext(CartContext)

    const total = cart.reduce((sum, product) => {
        return sum + product.price;
    }, 0);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Meu Carrinho</Text>

            {cart.length === 0 ? (
                <Text style={styles.emptyText}>
                Seu carrinho está vazio
                </Text>
            ) : (
                <>
                    <FlatList 
                    data={cart}
                    keyExtractor={(item, index) => `${item.id}- ${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.product}>
                            <Text style={styles.productName}>
                                {item.name}
                            </Text>

                            <Text style={styles.productPrice}>
                                R$ {item.price.toFixed(2)}
                            </Text>
                        </View>
                    )} 
                />

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>

                    <Text style={styles.total}>
                        R$ {total.toFixed(2)}
                    </Text>
                </View>
            </>
           )}
           <View />
 </SafeAreaView>
 )}

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
    },

    title: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
    },

    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },

    product: {
        backgroundColor: '#1A1A1A',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },

    productName: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: '600',
    },

    productCategory: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 4,
    },

    productPrice: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10,
    },

    totalContainer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 16,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    totalLabel: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
    },

    total: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
    },
 });