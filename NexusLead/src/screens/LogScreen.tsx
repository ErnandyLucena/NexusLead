import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

// --- Paleta de Cores (Unimed) ---
const colors = {
  primaryGreen: '#00995D',
  background: '#F4F7F9',
  white: '#FFFFFF',
  darkText: '#2c3e50',
  lightText: '#8E8E93',
  borderColor: '#E0E0E0',
  disabled: '#bdc3c7',
  success: '#27ae60',
};

// --- DEFINIÇÃO DE TIPOS PARA MAIOR SEGURANÇA E CLAREZA ---
type Category = {
  label: string;
  value: string;
};

type Sector = {
  label: string;
  value: string;
};

type CategoriesBySector = { 
  [key: string]: Category[] 
};

// --- DADOS MOCKADOS (AGORA COM TIPAGEM EXPLÍCITA) ---
const sectors: Sector[] = [
  { label: 'Tecnologia da Informação (TI)', value: 'ti' },
  { label: 'Manutenção Predial', value: 'manutencao' },
  { label: 'Recursos Humanos (RH)', value: 'rh' },
  { label: 'Almoxarifado', value: 'almoxarifado' },
];

const categoriesBySector: CategoriesBySector = {
  ti: [
    { label: 'Problema com Computador', value: 'problema_pc' },
    { label: 'Sistema Fora do Ar', value: 'sistema_fora_ar' },
    { label: 'Solicitação de Acesso', value: 'solicitacao_acesso' },
    { label: 'Problema de Rede/Internet', value: 'problema_rede' },
  ],
  manutencao: [
    { label: 'Ar Condicionado', value: 'ar_condicionado' },
    { label: 'Elétrica', value: 'eletrica' },
    { label: 'Hidráulica', value: 'hidraulica' },
    { label: 'Marcenaria', value: 'marcenaria' },
  ],
  rh: [
    { label: 'Dúvidas sobre Folha de Pagamento', value: 'duvida_pagamento' },
    { label: 'Solicitação de Férias', value: 'solicitacao_ferias' },
    { label: 'Comunicação de Afastamento', value: 'comunicacao_afastamento' },
  ],
  almoxarifado: [
    { label: 'Pedido de Material de Escritório', value: 'pedido_escritorio' },
    { label: 'Pedido de Insumos Médicos', value: 'pedido_insumos' },
  ],
};
// --- FIM DOS DADOS MOCKADOS ---

export default function LogScreen() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Requisito mínimo de caracteres para a descrição
  const MIN_DESC_LENGTH = 10;

  useEffect(() => {
    if (selectedSector) {
      setAvailableCategories(categoriesBySector[selectedSector] || []);
      setSelectedCategory(null);
    } else {
      setAvailableCategories([]);
    }
  }, [selectedSector]);
  
  useEffect(() => {
    const isFormComplete = !!selectedSector && !!selectedCategory && description.trim().length >= MIN_DESC_LENGTH;
    setIsFormValid(isFormComplete);
  }, [selectedSector, selectedCategory, description]);

  const handleSendRequest = () => {
    if (!isFormValid) return;

    console.log({ sector: selectedSector, category: selectedCategory, description });
    
    setShowSuccessMessage(true);
    setSelectedSector(null);
    setSelectedCategory(null);
    setDescription('');

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.flexContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Nova Solicitação</Text>
              <Text style={styles.headerSubtitle}>
                Preencha os detalhes para abrir um chamado.
              </Text>
            </View>

            {/* Card do Formulário */}
            <View style={styles.formContainer}>
              {/* Seletor de Setor */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Setor de Destino</Text>
                <PickerSelect
                  onValueChange={(value) => setSelectedSector(value)}
                  items={sectors}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'Selecione um setor...', value: null }}
                  value={selectedSector}
                  Icon={() => <Ionicons name="chevron-down" size={22} color={colors.lightText} />}
                />
              </View>

              {/* Seletor de Categoria */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria</Text>
                <PickerSelect
                  onValueChange={(value) => setSelectedCategory(value)}
                  items={availableCategories}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'Selecione uma categoria...', value: null }}
                  value={selectedCategory}
                  disabled={!selectedSector}
                  Icon={() => <Ionicons name="chevron-down" size={22} color={colors.lightText} />}
                />
              </View>

              {/* Campo de Descrição */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição Detalhada</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  placeholder="Descreva o problema ou a solicitação..."
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />
                 <Text style={styles.helperText}>
                  Mínimo de {MIN_DESC_LENGTH} caracteres.
                </Text>
              </View>
            </View>
            
            {/* Mensagem de Sucesso */}
            {showSuccessMessage && (
                <View style={styles.successContainer}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                  <Text style={styles.successMessage}>
                      Solicitação enviada com sucesso!
                  </Text>
                </View>
            )}

            {/* Botão de Envio */}
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              onPress={handleSendRequest}
              disabled={!isFormValid}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Enviar Solicitação</Text>
            </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- ESTILOS MODERNIZADOS ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.darkText,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.lightText,
    textAlign: 'center',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkText,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.darkText,
    minHeight: 120,
  },
  helperText: {
    fontSize: 12,
    color: colors.lightText,
    marginTop: 4,
    textAlign: 'right',
  },
  button: {
    backgroundColor: colors.primaryGreen,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  successContainer: {
    backgroundColor: colors.success,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successMessage: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    color: colors.darkText,
    paddingRight: 30, 
    backgroundColor: colors.background,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    color: colors.darkText,
    paddingRight: 30,
    backgroundColor: colors.background,
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 12 : 18,
    right: 15,
  },
  placeholder: {
    color: colors.lightText,
  }
});
