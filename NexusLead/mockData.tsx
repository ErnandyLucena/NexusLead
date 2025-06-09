// --- DADOS DE EXEMPLO (MOCK) ---

// Cores da Paleta Unimed
const UNIMED_GREEN = '#00995d';
const UNIMED_GREEN_LIGHT = '#a3d4a0';
const DOUGHNUT_COLORS = [UNIMED_GREEN, '#00b36e', UNIMED_GREEN_LIGHT];
const DOUGHNUT_LABELS = ['Emergência', 'Transfer.', 'Agendado'];
const OCCUPANCY_LABELS = ["UTI", "Intern.", "Emerg."];

// Este ficheiro centraliza todos os dados de exemplo usados na aplicação.
// Em um cenário real, estes dados viriam de uma API.

const monthlyData: { [key: string]: any } = {
    Jan: {
        kpis: { ocupacao: '78%', cirurgias: 110, readmissao: 10 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.3, 0.25, 0.35, 0.3] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [22, 40, 60, 28] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [70, 90, 55, 80] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.5, 0.15, 0.35], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [85, 70, 55] }] },
    },
    Fev: {
        kpis: { ocupacao: '82%', cirurgias: 125, readmissao: 11 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.35, 0.4, 0.3, 0.45] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [24, 42, 62, 29] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [80, 100, 60, 85] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.4, 0.25, 0.35], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [92, 78, 65] }] },
    },
    Mar: {
        kpis: { ocupacao: '88%', cirurgias: 140, readmissao: 9 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.4, 0.45, 0.5, 0.45] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [26, 48, 68, 32] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [90, 110, 70, 95] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.42, 0.22, 0.36], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [95, 80, 70] }] },
    },
    Abr: {
        kpis: { ocupacao: '85%', cirurgias: 135, readmissao: 12 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.42, 0.4, 0.48, 0.5] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [25, 46, 66, 31] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [88, 105, 68, 92] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.43, 0.2, 0.37], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [90, 78, 68] }] },
    },
    Mai: {
        kpis: { ocupacao: '86%', cirurgias: 142, readmissao: 11 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.45, 0.42, 0.5, 0.53] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [28, 50, 70, 34] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [92, 115, 72, 98] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.4, 0.25, 0.35], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [91, 79, 69] }] },
    },
    Jun: {
        kpis: { ocupacao: '83%', cirurgias: 130, readmissao: 13 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.5, 0.48, 0.55, 0.57] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [27, 49, 68, 33] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [85, 110, 65, 90] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.48, 0.18, 0.34], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [88, 76, 66] }] },
    },
    Jul: {
        kpis: { ocupacao: '80%', cirurgias: 120, readmissao: 14 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.52, 0.5, 0.58, 0.6] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [30, 52, 72, 35] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [80, 100, 60, 85] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.52, 0.15, 0.33], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [85, 74, 64] }] },
    },
    Ago: {
        kpis: { ocupacao: '81%', cirurgias: 128, readmissao: 12 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.55, 0.53, 0.6, 0.62] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [29, 51, 70, 34] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [82, 105, 62, 88] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.47, 0.2, 0.33], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [86, 75, 65] }] },
    },
    Set: {
        kpis: { ocupacao: '84%', cirurgias: 138, readmissao: 11 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.58, 0.56, 0.62, 0.65] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [26, 48, 67, 32] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [88, 112, 68, 94] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.45, 0.21, 0.34], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [89, 77, 67] }] },
    },
    Out: {
        kpis: { ocupacao: '87%', cirurgias: 145, readmissao: 10 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.6, 0.58, 0.65, 0.68] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [25, 47, 65, 31] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [95, 120, 75, 100] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.43, 0.23, 0.34], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [93, 81, 71] }] },
    },
    Nov: {
        kpis: { ocupacao: '89%', cirurgias: 150, readmissao: 9 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.62, 0.6, 0.68, 0.7] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [24, 45, 64, 30] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [100, 125, 80, 105] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.41, 0.24, 0.35], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [96, 83, 72] }] },
    },
    Dez: {
        kpis: { ocupacao: '85%', cirurgias: 141, readmissao: 11 },
        lineChart: { labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'], datasets: [{ data: [0.65, 0.63, 0.7, 0.72] }] },
        waitTime: { labels: ['Triagem', 'Consulta', 'Exames', 'Resultados'], datasets: [{ data: [28, 50, 70, 33] }] },
        discharge: { labels: ['Cardio', 'Orto', 'Neuro', 'Pedia'], datasets: [{ data: [90, 115, 70, 95] }] },
        doughnut: { labels: DOUGHNUT_LABELS, data: [0.46, 0.2, 0.34], colors: DOUGHNUT_COLORS },
        occupancy: { labels: OCCUPANCY_LABELS, datasets: [{ data: [90, 78, 68] }] },
    }
};

// --- CÁLCULO DOS DADOS GERAIS ---

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const geral = {
    kpis: {
        ocupacao: `80%`,
        cirurgias: months.reduce((acc, month) => acc + monthlyData[month].kpis.cirurgias, 0).toString(),
        readmissao: `${Math.round(months.reduce((acc, month) => acc + monthlyData[month].kpis.readmissao, 0) / 12)}%`,
    },
    lineChart: {
        labels: months,
        datasets: [{
            data: months.map(month => monthlyData[month].lineChart.datasets[0].data.reduce((acc, val) => acc + val, 0)),
            color: (opacity = 1) => `rgba(0, 153, 93, ${opacity})`,
            strokeWidth: 3
        }],
    },
    waitTime: {
        labels: monthlyData.Jan.waitTime.labels,
        datasets: [{
            data: monthlyData.Jan.waitTime.labels.map((_, i) =>
                Math.round(months.reduce((acc, month) => acc + monthlyData[month].waitTime.datasets[0].data[i], 0) / 12)
            )
        }]
    },
    discharge: {
        labels: monthlyData.Jan.discharge.labels,
        datasets: [{
            data: monthlyData.Jan.discharge.labels.map((_, i) =>
                months.reduce((acc, month) => acc + monthlyData[month].discharge.datasets[0].data[i], 0)
            )
        }]
    },
    doughnut: {
        labels: DOUGHNUT_LABELS,
        data: DOUGHNUT_LABELS.map((_, i) => {
            const avg = months.reduce((acc, month) => acc + monthlyData[month].doughnut.data[i], 0) / 12;
            return parseFloat(avg.toFixed(2));
        }),
        colors: DOUGHNUT_COLORS
    },
    occupancy: {
        labels: OCCUPANCY_LABELS,
        datasets: [{
            data: OCCUPANCY_LABELS.map((_, i) =>
                Math.round(months.reduce((acc, month) => acc + monthlyData[month].occupancy.datasets[0].data[i], 0) / 12)
            )
        }]
    }
};

export const fullChartData = {
    geral,
    ...monthlyData
};

export { months };
export const departments = ['Geral', 'Cardiologia', 'Ortopedia', 'Neurologia', 'Pediatria'];
