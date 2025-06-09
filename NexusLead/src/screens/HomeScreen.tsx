import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { fullChartData, months } from '../../mockData.tsx'; // Importando os dados do ficheiro mock

// Para os ícones, instale e configure a biblioteca 'react-native-vector-icons'
// Ex: npm install react-native-vector-icons
// e depois: import Icon from 'react-native-vector-icons/Feather';
// A linha abaixo é para demonstração. Descomente a linha de import real no seu projeto.
const Icon = require('react-native-vector-icons/Feather').default;


const screenWidth = Dimensions.get('window').width;

// --- CONSTANTES DE ESTILO ---

// Cores da Paleta Unimed
const UNIMED_GREEN = '#00995d';
const UNIMED_GREEN_LIGHT = '#a3d4a0';
const UNIMED_BLUE = '#00a9e0'; // Cor secundária para contraste
const TEXT_COLOR_DARK = '#2d3748';
const TEXT_COLOR_LIGHT = '#718096';
const BACKGROUND_COLOR = '#f7fafc';
const CARD_BACKGROUND_COLOR = '#ffffff';

// --- CONFIGURAÇÕES DOS GRÁFICOS ---
const chartConfigLight = {
    backgroundGradientFrom: CARD_BACKGROUND_COLOR,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: CARD_BACKGROUND_COLOR,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 153, 93, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(113, 128, 150, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.8,
    useShadowColorFromDataset: false, 
    decimalPlaces: 1,
};

const barChartConfig = {
    ...chartConfigLight,
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(0, 169, 224, ${opacity})`,
};

// --- COMPONENTES REUTILIZÁVEIS ---
const CustomChartLegend = ({ data }) => (
    <View style={styles.legendContainer}>
        {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.name}</Text>
            </View>
        ))}
    </View>
);

const KpiCard = ({ iconName, title, value }) => (
    <View style={[styles.kpiCard, styles.kpiCardSmall]}>
        <View style={styles.kpiIconWrapper}>
            <Icon name={iconName} style={styles.kpiIcon} />
        </View>
        <Text style={styles.kpiCardTitle}>{title}</Text>
        <Text style={styles.kpiCardValue}>{value}</Text>
    </View>
);

// --- COMPONENTE PRINCIPAL ---
export default function HomeScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [filterType, setFilterType] = useState('geral');
  const [activeMonth, setActiveMonth] = useState('Jan');
  const [activeDepartment, setActiveDepartment] = useState('Geral');
  const [displayData, setDisplayData] = useState(fullChartData.geral);

  useEffect(() => {
    const dataKey = filterType === 'mensal' ? activeMonth : 'geral';
    setDisplayData(fullChartData[dataKey] || fullChartData.geral);
  }, [filterType, activeMonth, activeDepartment]);


  const handleChartPress = (chartType, data, config, title, extraProps = {}) => {
    setSelectedChart({ type: chartType, data, config, title, ...extraProps });
    setModalVisible(true);
  };
  
  const renderModalChart = () => {
    if (!selectedChart) return null;
    const modalChartWidth = screenWidth - 32;
    switch(selectedChart.type) {
        case 'line':
            return <LineChart data={selectedChart.data} width={modalChartWidth} height={300} chartConfig={selectedChart.config} bezier style={styles.chartStyle} />;
        case 'bar':
            return <BarChart data={selectedChart.data} width={modalChartWidth} height={300} chartConfig={selectedChart.config} fromZero showValuesOnTopOfBars style={styles.chartStyle} yAxisLabel="" yAxisSuffix={selectedChart.yAxisSuffix || ""} />;
        case 'progress':
            return <ProgressChart data={selectedChart.data} width={modalChartWidth} height={220} strokeWidth={16} radius={45} chartConfig={selectedChart.config} hideLegend={false} />;
        case 'bar_occupancy':
            return <BarChart data={selectedChart.data} width={modalChartWidth} height={220} chartConfig={selectedChart.config} fromZero showValuesOnTopOfBars style={styles.chartStyle} yAxisLabel="" yAxisSuffix="%" />;
        case 'pie':
            return (
                <PieChart
                    data={selectedChart.data.labels.map((label, index) => ({
                        name: label,
                        population: selectedChart.data.datasets[0].data[index] * 100,
                        color: selectedChart.config.color(1, index),
                        legendFontColor: TEXT_COLOR_LIGHT,
                        legendFontSize: 12
                    }))}
                    width={modalChartWidth}
                    height={220}
                    chartConfig={selectedChart.config}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            );
        default:
            return null;
    }
}

  return (
    <View style={{flex: 1}}>
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View>
                <Text style={styles.welcomeTitle}>Olá, Dr. Ernandy</Text>
                <Text style={styles.welcomeSubtitle}>Visão geral dos insights do hospital.</Text>
            </View>
            
          </View>
          
          {/* Filtros */}
          <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Filtros</Text>
              <View style={styles.filterRow}>
                  <TouchableOpacity onPress={() => setFilterType('geral')} style={[styles.filterButton, filterType === 'geral' && styles.filterButtonActive]}>
                      <Text style={[styles.filterButtonText, filterType === 'geral' && styles.filterButtonTextActive]}>Geral</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFilterType('mensal')} style={[styles.filterButton, filterType === 'mensal' && styles.filterButtonActive]}>
                      <Text style={[styles.filterButtonText, filterType === 'mensal' && styles.filterButtonTextActive]}>Mensal</Text>
                  </TouchableOpacity>
              </View>
              {filterType === 'mensal' && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthSelector}>
                      {months.map(month => (
                          <TouchableOpacity key={month} onPress={() => setActiveMonth(month)} style={[styles.monthButton, activeMonth === month && styles.monthButtonActive]}>
                              <Text style={[styles.monthButtonText, activeMonth === month && styles.monthButtonTextActive]}>{month}</Text>
                          </TouchableOpacity>
                      ))}
                  </ScrollView>
              )}
          </View>

          {/* KPIs Principais em Cards */}
          <View style={styles.kpiRow}>
            <KpiCard iconName="users" title="Taxa de Ocupação" value={displayData.kpis.ocupacao} />
            <KpiCard iconName="activity" title="Cirurgias Realizadas" value={displayData.kpis.cirurgias} />
            <KpiCard iconName="refresh-cw" title="Taxa de Readmissão" value={displayData.kpis.readmissao} />
          </View>

          {/* Gráfico de Receita Mensal */}
          <TouchableOpacity onPress={() => handleChartPress('line', displayData.lineChart, { ...chartConfigLight, propsForDots: { r: '6', strokeWidth: '2', stroke: UNIMED_GREEN_LIGHT } }, 'Evolução da Receita Mensal')}>
              <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Evolução da Receita Mensal</Text>
                <LineChart
                  data={displayData.lineChart}
                  width={screenWidth - 70}
                  height={220}
                  chartConfig={{ ...chartConfigLight, propsForDots: { r: '6', strokeWidth: '2', stroke: UNIMED_GREEN_LIGHT } }}
                  bezier
                  style={styles.chartStyle}
                />
              </View>
          </TouchableOpacity>
          
          <View style={styles.smallChartsContainer}>
            <TouchableOpacity style={[styles.chartCard, styles.smallChartCard]} onPress={() => handleChartPress('progress', {data: displayData.doughnut.data}, { ...chartConfigLight, color: (opacity=1, _index) => displayData.doughnut.colors[_index] }, 'Origem das Admissões')}>
                <Text style={styles.chartTitle}>Origem das Admissões</Text>
                <View style={{alignItems: 'center'}}>
                    <ProgressChart
                        data={displayData.doughnut}
                        width={screenWidth / 2 - 42}
                        height={170}
                        strokeWidth={10}
                        radius={45}
                        chartConfig={chartConfigLight}
                        hideLegend={true}
                    />
                </View>
                <CustomChartLegend data={displayData.doughnut.labels.map((label, index) => ({ name: label, color: displayData.doughnut.colors[index] }))} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.chartCard, styles.smallChartCard]} onPress={() => handleChartPress('bar_occupancy', displayData.occupancy, { ...barChartConfig, color: (opacity = 1) => `rgba(0, 153, 93, ${opacity})`}, 'Ocupação por Setor (%)')}>
                <Text style={styles.chartTitle}>Ocupação por Setor</Text>
                 <BarChart
                    data={displayData.occupancy}
                    width={screenWidth / 2 - 50}
                    height={180}
                    chartConfig={{...barChartConfig, color: (opacity = 1) => `rgba(0, 153, 93, ${opacity})`}}
                    fromZero
                    showValuesOnTopOfBars={false}
                    style={{...styles.chartStyle, paddingRight: 0}}
                    yAxisSuffix="%"
                    yAxisLabel=""
                />
            </TouchableOpacity>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Desempenho Operacional</Text>
            <TouchableOpacity onPress={() => handleChartPress('bar', displayData.waitTime, barChartConfig, 'Tempo de Espera na Emergência', { yAxisSuffix: " min" })}>
                <View style={{marginTop: 12}}>
                    <Text style={styles.chartSubtitle}>Tempo de Espera na Emergência (min)</Text>
                    <BarChart
                        data={displayData.waitTime}
                        width={screenWidth - 70}
                        height={220}
                        chartConfig={barChartConfig}
                        fromZero
                        showValuesOnTopOfBars
                        style={styles.chartStyle}
                        yAxisLabel=""
                        yAxisSuffix=" min"
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 24}} onPress={() => handleChartPress('bar', displayData.discharge, barChartConfig, 'Altas por Especialidade', { yAxisSuffix: "" })}>
                <View>
                    <Text style={styles.chartSubtitle}>Altas por Especialidade (Últimos 30 dias)</Text>
                    <BarChart
                        data={displayData.discharge}
                        width={screenWidth - 70}
                        height={220}
                        chartConfig={barChartConfig}
                        fromZero
                        showValuesOnTopOfBars
                        style={styles.chartStyle}
                        yAxisLabel=""
                        yAxisSuffix=""
                    />
                </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible); }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{selectedChart?.title}</Text>
                    {renderModalChart()}
                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(!modalVisible)} >
                        <Text style={styles.modalCloseButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TEXT_COLOR_DARK,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: TEXT_COLOR_LIGHT,
  },
  logoutButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: TEXT_COLOR_DARK,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 6,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_COLOR_DARK,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 18,
  },
  filterButtonActive: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: TEXT_COLOR_LIGHT,
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: UNIMED_GREEN,
  },
  monthSelector: {
    marginTop: 12,
    paddingLeft: 4,
  },
  monthButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginRight: 8,
    backgroundColor: '#e9ecef'
  },
  monthButtonActive: {
    backgroundColor: UNIMED_GREEN,
  },
  monthButtonText: {
    color: TEXT_COLOR_DARK,
    fontWeight: '500',
    fontSize: 12,
  },
  monthButtonTextActive: {
    color: '#fff',
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  kpiCard: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiCardSmall: {
      flex: 1,
      marginHorizontal: 4,
  },
  kpiIconWrapper: {
      backgroundColor: 'rgba(0, 153, 93, 0.1)',
      borderRadius: 999,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
  },
  kpiIcon: {
      fontSize: 22,
      color: UNIMED_GREEN,
  },
  kpiCardTitle: {
    color: TEXT_COLOR_LIGHT,
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  kpiCardValue: {
    color: TEXT_COLOR_DARK,
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    color: TEXT_COLOR_DARK,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  chartSubtitle: {
    color: TEXT_COLOR_LIGHT,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  smallChartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallChartCard: {
      width: '48%',
      marginBottom: 24,
  },
  chartStyle: {
    borderRadius: 16,
    marginVertical: 8,
  },
  legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 12,
      paddingHorizontal: 4,
  },
  legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 5,
  },
  legendColorBox: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 5,
  },
  legendText: {
      fontSize: 10,
      color: TEXT_COLOR_LIGHT,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: TEXT_COLOR_DARK,
      marginBottom: 15,
  },
  modalCloseButton: {
      backgroundColor: UNIMED_GREEN,
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 2,
      marginTop: 15,
  },
  modalCloseButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});
