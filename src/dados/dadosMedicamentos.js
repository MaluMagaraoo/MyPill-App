// ============================================================
// dadosMedicamentos.js - BANCO DE DADOS DOS MEDICAMENTOS
// Este arquivo contém a lista de medicamentos do aplicativo
// e funções auxiliares para filtrar e organizar os dados.
// ============================================================

// Lista principal com todos os medicamentos cadastrados
export const dadosMedicamentos = [
  {
    id: '1',
    nome: 'Vitamina D',
    dosagem: '2000 IU',
    estoque: 45,                          // Quantidade disponível em comprimidos
    horarios: ['08:00', '20:00'],         // Horários que deve ser tomado
    cor: '#C9A96E',                       // Cor de identificação visual
    imagem: require('../img/VitaminaD.png'), // Foto do medicamento
    descricao: 'Vitamina D para absorção de cálcio',
    descricaoLonga: 'Vitamina D é essencial para a absorção de cálcio e manutenção da saúde óssea. Auxilia na imunidade e pode melhorar o humor. Recomenda-se tomar com alimentos que contêm gordura para melhor absorção.',
    frequencia: 'diário',
    inicioTratamento: '2024-01-15',
  },
  {
    id: '2',
    nome: 'Ômega-3',
    dosagem: '1000 mg',
    estoque: 28,
    horarios: ['08:00'],
    cor: '#8A7060',
    imagem: require('../img/Omega3.png'),
    descricao: 'Ácido graxo ômega-3 para saúde cardiovascular',
    descricaoLonga: 'Ômega-3 é um ácido graxo essencial que promove saúde cardiovascular, reduz inflamação e beneficia a saúde cerebral. Deve ser tomado com alimentos para evitar desconforto gastrointestinal.',
    frequencia: 'diário',
    inicioTratamento: '2024-02-10',
  },
  {
    id: '3',
    nome: 'Metformina',
    dosagem: '500 mg',
    estoque: 60,
    horarios: ['07:30', '12:30', '19:30'],
    cor: '#3A2E24',
    imagem: require('../img/Metformina.png'),
    descricao: 'Medicamento para controle de glicemia',
    descricaoLonga: 'Metformina é um medicamento oral utilizado no tratamento do diabetes tipo 2. Ajuda a controlar os níveis de açúcar no sangue. Deve ser tomada com alimentos para reduzir efeitos colaterais gastrointestinais.',
    frequencia: 'diário',
    inicioTratamento: '2023-06-20',
  },
  {
    id: '4',
    nome: 'Atorvastatina',
    dosagem: '20 mg',
    estoque: 52,
    horarios: ['20:00'],
    cor: '#C9A96E',
    imagem: require('../img/Atorvastatina.png'),
    descricao: 'Estatina para redução de colesterol',
    descricaoLonga: 'Atorvastatina é um medicamento que reduz o colesterol LDL e triglicerídeos, diminuindo o risco de doenças cardiovasculares. Deve ser tomada regularmente conforme prescrito, preferencialmente à noite.',
    frequencia: 'diário',
    inicioTratamento: '2023-09-05',
  },
  {
    id: '5',
    nome: 'Lisinopril',
    dosagem: '10 mg',
    estoque: 15,
    horarios: ['07:00'],
    cor: '#E8DDD0',
    imagem: require('../img/Lisinopril.png'),
    descricao: 'Inibidor ACE para controle de pressão',
    descricaoLonga: 'Lisinopril é um medicamento inibidor de ACE utilizado no tratamento da hipertensão e insuficiência cardíaca. Ajuda a relaxar os vasos sanguíneos e reduz a pressão arterial. Deve ser tomado regularmente.',
    frequencia: 'diário',
    inicioTratamento: '2023-08-12',
  },
  {
    id: '6',
    nome: 'Magnésio',
    dosagem: '400 mg',
    estoque: 38,
    horarios: ['21:00'],
    cor: '#8A7060',
    imagem: require('../img/Magnésio.png'),
    descricao: 'Suplemento de magnésio para relaxamento',
    descricaoLonga: 'Magnésio é um mineral essencial que auxilia no relaxamento muscular, reduz o estresse e melhora a qualidade do sono. Também importante para a saúde óssea e função muscular. Recomenda-se tomar antes de dormir.',
    frequencia: 'diário',
    inicioTratamento: '2024-01-08',
  },
];

// ============================================================
// obterProximos()
// Retorna os medicamentos que ainda precisam ser tomados hoje,
// ordenados pelo próximo horário mais próximo do atual
// ============================================================
export const obterProximos = () => {
  const agora = new Date();
  // Formata a hora atual como "HH:MM"
  const horaAtual = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

  return dadosMedicamentos
    .map(med => ({
      ...med,
      // Filtra apenas os horários que ainda não passaram
      proximosHorarios: med.horarios.filter(h => h > horaAtual),
    }))
    .filter(med => med.proximosHorarios.length > 0) // Remove quem não tem mais horários
    .sort((a, b) => (a.proximosHorarios[0] || '').localeCompare(b.proximosHorarios[0] || '')); // Ordena pelo mais próximo
};

// ============================================================
// obterMedicamentosPorPeriodo()
// Agrupa os medicamentos por período do dia (Manhã, Almoço,
// Tarde e Noite) com base nos horários de cada um
// ============================================================
export const obterMedicamentosPorPeriodo = () => {
  // Define os períodos com seus intervalos de horas e ícones
  const periodos = {
    'Manhã':  { inicio: 6,  fim: 12, icone: '🌅' },
    'Almoço': { inicio: 12, fim: 14, icone: '🍽️' },
    'Tarde':  { inicio: 14, fim: 18, icone: '☀️' },
    'Noite':  { inicio: 18, fim: 24, icone: '🌙' },
  };

  // Para cada período, filtra os medicamentos cujos horários se encaixam
  return Object.entries(periodos).map(([periodo, { inicio, fim, icone }]) => {
    const medicamentosNoPeriodo = dadosMedicamentos.filter(med =>
      med.horarios.some(h => {
        const hora = parseInt(h.split(':')[0]); // Extrai só a hora (ex: "08" de "08:00")
        return hora >= inicio && hora < fim;     // Verifica se está no intervalo
      })
    );
    return { periodo, icone, medicamentos: medicamentosNoPeriodo };
  });
};
