import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

// --- Tipos de Navegação ---
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

// --- Objeto de Cores (separado para uso em outros contextos, como SVG) ---
const colors = {
  primaryGreen: '#00843D',
  primaryGray: '#A0AEC0',
  white: '#FFFFFF',
  lightGray: '#F7FAFC',
  darkText: '#2D3748',
};

// --- Componente de Logo (SVG) ---

// --- Componente Principal ---
export default function LoginScreen(): JSX.Element {
  const navigation = useNavigation<LoginScreenProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (email && password) {
      navigation.replace('Home');
    } else {
      alert('Por favor, preencha email e senha');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Formas decorativas */}
        <View style={[styles.backgroundShape, styles.shape1]} />
        <View style={[styles.backgroundShape, styles.shape2]} />

        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Acesse sua plataforma para continuar</Text>

        <TextInput
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.primaryGray}
        />

        <TextInput
          placeholder="Sua senha"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor={colors.primaryGray}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} activeOpacity={0.7}>
          <Text style={styles.signUpText}>Não tem uma conta? </Text>
          <Text style={[styles.signUpText, styles.signUpLink]}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: colors.primaryGreen,
    opacity: 0.05,
  },
  shape1: {
    width: 400,
    height: 400,
    top: -150,
    left: -100,
  },
  shape2: {
    width: 300,
    height: 300,
    bottom: -120,
    right: -120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.darkText,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primaryGray,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
    color: colors.darkText,
  },
  button: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: colors.primaryGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: colors.primaryGray,
    fontSize: 14,
    textAlign: 'center',
  },
  signUpLink: {
    color: colors.primaryGreen,
    fontWeight: '600',
  },
});
