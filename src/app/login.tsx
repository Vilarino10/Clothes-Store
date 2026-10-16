import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import { COLORS } from '@/constants/colors';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');

        if (!email) {
            setError('Digite Seu Email');
            return;
        }

        if (!email.includes('@')) {
            setError('Digite Um Email Válido');
            return;
        }

        if (!password) {
            setError('Digite Sua Senha');
            return;
        }

        if (password.length < 6) {
            setError('A Senha Deve Conter Pelo Menos 6 Caracteres');
            return;
        }

        const storedUser = await AsyncStorage.getItem(
            'gotham_store:user'
        );

        if (!storedUser) {
            setError('Nenhum Usuario Cadastrado')
            return;
        }

        const user = JSON.parse(storedUser);


        if (user.email !== email || user.password !== password) {
            setError('Email ou Senha Incorretos')
            return;
        }

        await AsyncStorage.setItem(
            '@gotham_store:user_logged',
            'true'
        );

        router.replace('/');
    };

    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Gotham Store</Text>

                <Text style={styles.subtitle}>
                    Bem Vindo à Gotham
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor={COLORS.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <TextInput 
                    placeholder='Senha'
                    placeholderTextColor={COLORS.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>
                    Criar uma conta
                </Text>
            </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },

    header: {
        marginBottom: 40
    },

    title: {
        color: COLORS.text,
        fontSize: 16,
    },

    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },

    form: {
        gap: 16,
    },

    input: {
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        color: COLORS.text,
        fontSize: 16,
    },

    button : {
        backgroundColor: COLORS.text,
        borderRadius: 16,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 8,
    },

    buttonText: {
        color: COLORS.background,
        fontSize: 15,
        fontWeight: 800,
    },

    registerText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 8,
    },

    errorText: {
        color: COLORS.error,
        fontSize: 14,
        marginTop: -8,
    },
});