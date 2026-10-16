import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';

export default function registerScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');

        if (!name) {
            setError('Digite Seu Nome')
            return;
        }

        if (!email) {
            setError('Digite Seu Email')
            return;
        }

        if (!email.includes('@')) {
            setError('Digite Um Email Válido')
            return;
        }

        if (!password) {
            setError('Digite Sua Senha')
            return;
        }

        if(password.length < 6) {
            setError('A Senha Deve Conter Pelo Menos 6 Caracteres')
            return;
        }

        if (!confirmPassword) {
            setError('Você Deve Confirmar a Senha')
            return;
        }

        if (password !== confirmPassword) {
            setError('As Senhas Não Coincidem')
            return;
        }

        const user = {
            name,
            email,
            password,
        };

        await AsyncStorage.setItem(
            'gotham_store:user',
            JSON.stringify(user)
        );

        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Gotham Store</Text>

                <Text style={styles.subtitle}>
                    Crie Sua Conta
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput 
                    placeholder='Nome'
                    placeholderTextColor={COLORS.textSecondary}
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

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
                
                <TextInput 
                    placeholder='Confirmar Senha'
                    placeholderTextColor={COLORS.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.input}
                    secureTextEntry
                />

                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.loginText}>
                        Já Possui Uma Conta ?
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
        marginBottom: 40,
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
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        color: COLORS.text,
        fontSize: 16,
    },

    button: {
        backgroundColor: COLORS.text,
        borderRadius: 16,
        paddingVertical: 17,
        alignItems: 'center',
        marginTop: 8,
    },

    buttonText: {
        color: COLORS.background,
        fontSize: 15,
        fontWeight: '800',
    },

    loginText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 8, 
    },

    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginTop: -8,
    },
});