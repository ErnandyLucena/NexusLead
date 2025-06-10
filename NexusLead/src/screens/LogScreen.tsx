import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import RegisterCall from './../components/RegisterCall/RegisterCall'; // ajuste o caminho conforme seu projeto

// --- DADOS DE EXEMPLO (MOCK DATA) ---
const myCallsData = [
  { id: '2024-001', subject: 'Problema com acesso ao sistema de prontuários', date: '08/06/2025', status: 'Concluído' },
  { id: '2024-003', subject: 'Impressora do 2º andar não funciona', date: '09/06/2025', status: 'Em Andamento' },
  { id: '2024-005', subject: 'Solicitação de novo software de gestão', date: '10/06/2025', status: 'Aberto' },
];

const assignedCallsData = [
  { id: '2024-002', subject: 'Aprovação de compra de novos monitores', from: 'Dr. João', date: '09/06/2025', status: 'Aberto' },
  { id: '2024-004', subject: 'Revisão do relatório de performance', from: 'Ana Lima', date: '10/06/2025', status: 'Em Andamento' },
];

const CallItem = ({ item }: { item: any }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Aberto':
        return styles.statusOpen;
      case 'Em Andamento':
        return styles.statusInProgress;
      case 'Concluído':
        return styles.statusCompleted;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity style={styles.callItemCard}>
      <View style={styles.callItemHeader}>
        <Text style={styles.callItemProtocol}>Protocolo: {item.id}</Text>
        <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.callItemSubject}>{item.subject}</Text>
      <Text style={styles.callItemDate}>
        {item.from ? `De: ${item.from} - ` : 'Aberto em: '}{item.date}
      </Text>
    </TouchableOpacity>
  );
};

export default function LogScreen() {
  const [showRegisterCall, setShowRegisterCall] = useState(false);
  const [activeTab, setActiveTab] = useState('meusChamados');

  const toggleRegisterCall = () => {
    setShowRegisterCall(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7fafc" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.mainTitle}>Gestão de Chamados</Text>

        {/* Botão para abrir/fechar o formulário */}
        <TouchableOpacity style={styles.mainButton} onPress={toggleRegisterCall}>
          <Text style={styles.mainButtonText}>
            {showRegisterCall ? 'Fechar Formulário' : 'Registrar Novo Chamado'}
          </Text>
        </TouchableOpacity>

        {/* Formulário de novo chamado (condicional) */}
        {showRegisterCall && <RegisterCall />}

        {/* Abas de Navegação */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'meusChamados' && styles.tabButtonActive]}
            onPress={() => setActiveTab('meusChamados')}>
            <Text style={[styles.tabText, activeTab === 'meusChamados' && styles.tabTextActive]}>
              Meus Chamados
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'solicitacoes' && styles.tabButtonActive]}
            onPress={() => setActiveTab('solicitacoes')}>
            <Text style={[styles.tabText, activeTab === 'solicitacoes' && styles.tabTextActive]}>
              Solicitações para Mim
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Chamados */}
        <View style={styles.listContainer}>
          {activeTab === 'meusChamados'
            ? myCallsData.map(item => <CallItem key={item.id} item={item} />)
            : assignedCallsData.map(item => <CallItem key={item.id} item={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  container: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: '#00995d',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  formPlaceholderText: {
    color: '#a0aec0',
    textAlign: 'center',
    marginVertical: 20,
  },
  formSubmitButton: {
    backgroundColor: '#00a9e0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  formSubmitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#00995d',
  },
  tabText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#00995d',
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
  callItemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  callItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  callItemProtocol: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  callItemSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  callItemDate: {
    fontSize: 12,
    color: '#a0aec0',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusOpen: {
    backgroundColor: '#a0aec0',
  },
  statusInProgress: {
    backgroundColor: '#00a9e0',
  },
  statusCompleted: {
    backgroundColor: '#00995d',
  },
});
