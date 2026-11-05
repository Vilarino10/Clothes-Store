import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/products/[id]",
          params: {
            id: product.id,
          },
        })
      }
    >
      <Image source={product.image} style={styles.image} />

      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.name}>{product.name}</Text>

      <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,

    borderWidth: 1,
    width: "100%",
  },

  image: {
    width: "100%",
    height: 220,

    backgroundColor: COLORS.card,

    borderRadius: 18,
    marginBottom: 16,

    resizeMode: "cover",
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
    fontWeight: "600",
  },

  price: {
    color: COLORS.price,
    marginTop: 8,
    fontSize: 20,
    fontWeight: "600",
  },
});
