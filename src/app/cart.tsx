import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors";
import { CartContext } from "@/context/CartContext";

export default function CartScreen() {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  const handlePurchase = () => {
    if (cart.length === 0) {
      return;
    }

    if (cart.length === 0) {
      return;
    }

    Alert.alert("Compra Realizada!", "Seu Pedido foi realizado com sucesso", [
      {
        text: "Continuar Comprando",
        onPress: () => {
          clearCart();
          router.replace("/");
        },
      },
    ]);

    clearCart();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color={COLORS.text}
            style={{ transform: [{ translateY: -11 }] }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Meu Carrinho</Text>
      </View>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}- ${index}`}
            renderItem={({ item }) => (
              <View style={styles.product}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productPrice}>
                  R$ {item.price.toFixed(2)}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
            <Text style={styles.buyButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>

            <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
          </View>
        </>
      )}
      <View />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },

  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },

  product: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  productName: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "600",
  },

  productCategory: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },

  productPrice: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },

  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 16,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalLabel: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
  },

  total: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  buyButton: {
    backgroundColor: COLORS.text,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  buyButtonText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "700",
  },
});
