import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
});