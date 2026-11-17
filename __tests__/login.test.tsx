import { render } from "@testing-library/react-native";
import LoginScreen from "../src/app/login";

jest.mock("@/services/firebase", () => ({
  auth: {},
}));

describe("Teste de renderização - Login", () => {
  it("deve renderizar os elementos da tela", async () => {
    const { getByPlaceholderText, getByText } = await render(<LoginScreen />);

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Senha")).toBeTruthy();
    expect(getByText("ENTRAR")).toBeTruthy();
    expect(getByText("Criar uma conta")).toBeTruthy();
  });
});
