import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Teste de persistência - Carrinho", () => {
  beforeEach(async () => {
    await AsyncStorage.clear;
  });

  it("deve salvar e recuperar um produto do carrinho", async () => {
    const product = {
      id: "1",
      name: "Moletom Gotham Oversized",
      price: 199.0,
      category: "Moletom",
      image: "imagem-teste",
    };

    await AsyncStorage.setItem("@gotham_store:cart", JSON.stringify([product]));

    const storedCart = await AsyncStorage.getItem("@gotham_store:cart");

    expect(storedCart).toBe(JSON.stringify([product]));
  });
});
