// ============================================================
// TelaInicio.js - TELA INICIAL (ABA "INÍCIO")
// Mostra a agenda do dia com os medicamentos pendentes,
// barra de progresso e linha do tempo por período.
// ============================================================

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Lista inicial 
const medicamentosIniciais = [
  { id: 1, nome: 'Vitamina D',    dosagem: '1000 UI', horario: '8:00',  periodo: 'Manhã',  cor: '#F4A261', tomado: false },
  { id: 2, nome: 'Ômega-3',      dosagem: '500mg',   horario: '8:30',  periodo: 'Manhã',  cor: '#E76F51', tomado: false },
  { id: 3, nome: 'Metformina',   dosagem: '500mg',   horario: '12:00', periodo: 'Almoço', cor: '#2A9D8F', tomado: false },
  { id: 4, nome: 'Atorvastatina',dosagem: '10mg',    horario: '14:00', periodo: 'Tarde',  cor: '#264653', tomado: false },
  { id: 5, nome: 'Lisinopril',   dosagem: '5mg',     horario: '20:00', periodo: 'Noite',  cor: '#E9C46A', tomado: false },
];

export default function TelaInicio() {
  // Estado que guarda a lista de medicamentos
  const [medicamentos, setMedicamentos] = useState(medicamentosIniciais);

  // Cálculos de progresso
  const totalMedicamentos = medicamentos.length;
  const quantidadeTomada = medicamentos.filter(m => m.tomado).length;
  const proximoMedicamento = medicamentos.find(m => !m.tomado);

  // Função chamada ao apertar "Tomar Medicamento"
  const marcarComoTomado = (idMedicamento) => {
    setMedicamentos(anterior =>
      anterior.map(med => (med.id === idMedicamento ? { ...med, tomado: true } : med))
    );
  };

  // Agrupa os medicamentos em 4 períodos do dia
  const periodos = [
    { nome: 'Manhã',  medicamentos: medicamentos.filter(m => m.periodo === 'Manhã') },
    { nome: 'Almoço', medicamentos: medicamentos.filter(m => m.periodo === 'Almoço') },
    { nome: 'Tarde',  medicamentos: medicamentos.filter(m => m.periodo === 'Tarde') },
    { nome: 'Noite',  medicamentos: medicamentos.filter(m => m.periodo === 'Noite') },
  ];

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>

        {/* CARD DE SAUDAÇÃO COM BARRA DE PROGRESSO */}
        <View style={estilos.cardSaudacao}>
          <Text style={estilos.tituloSaudacao}>Bom dia! Malu 🤎</Text>
          <Text style={estilos.subtituloSaudacao}>
            Você tem {totalMedicamentos - quantidadeTomada} medicamento{totalMedicamentos - quantidadeTomada !== 1 ? 's' : ''} pendente{totalMedicamentos - quantidadeTomada !== 1 ? 's' : ''} hoje
          </Text>
          {/* Barra de progresso que mostra quantos foram tomados */}
          <View style={estilos.containerProgresso}>
            <View style={estilos.barraProgresso}>
              <View style={[estilos.preenchimentoProgresso, { width: `${(quantidadeTomada / totalMedicamentos) * 100}%` }]} />
            </View>
            <Text style={estilos.textoProgresso}>{quantidadeTomada}/{totalMedicamentos}</Text>
          </View>
        </View>

        {/* CARD DO PRÓXIMO MEDICAMENTO OU PARABÉNS */}
        {proximoMedicamento ? (
          <View style={estilos.cardProximo}>
            <View style={estilos.cabecalhoProximo}>
              <View>
                <Text style={estilos.rotuloProximo}>PRÓXIMO MEDICAMENTO</Text>
                <Text style={estilos.nomeProximo}>{proximoMedicamento.nome}</Text>
                <Text style={estilos.dosagemProximo}>{proximoMedicamento.dosagem}</Text>
              </View>
              <View style={[estilos.bolinhaCorProximo, { backgroundColor: proximoMedicamento.cor }]} />
            </View>
            <View style={estilos.horarioProximo}>
              <Feather name="clock" size={16} color="#8A7060" />
              <Text style={estilos.textoHorarioProximo}>{proximoMedicamento.horario}</Text>
            </View>
            {/* Botão 1: Marcar como tomado */}
            <TouchableOpacity style={estilos.botaoTomar} onPress={() => marcarComoTomado(proximoMedicamento.id)}>
              <Feather name="check" size={18} color="#3A2E24" />
              <Text style={estilos.textoBotaoTomar}>Tomar Medicamento</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={estilos.cardConcluido}>
            <Feather name="check-circle" size={48} color="#FDFAF7" />
            <Text style={estilos.tituloConcluido}>Parabéns!</Text>
            <Text style={estilos.textoConcluido}>Você tomou todos os medicamentos de hoje</Text>
          </View>
        )}

        {/* LINHA DO TEMPO COM AGENDA DO DIA */}
        <View style={estilos.cardAgenda}>
          <Text style={estilos.tituloAgenda}>Agenda de Hoje</Text>
          {periodos.map((periodo, indice) => (
            <View key={periodo.nome} style={estilos.containerPeriodo}>
              {indice !== periodos.length - 1 && <View style={estilos.linhaTimeline} />}
              <View style={estilos.filaPeriodo}>
                <View style={estilos.bolinhaTimeline} />
                <View style={estilos.conteudoPeriodo}>
                  <Text style={estilos.nomePeriodo}>{periodo.nome.toUpperCase()}</Text>
                  {periodo.medicamentos.map(med => (
                    <View key={med.id} style={estilos.itemMedicamento}>
                      <View style={estilos.infoMedicamento}>
                        <View style={[estilos.bolinhaColorida, { backgroundColor: med.cor }]} />
                        <View>
                          <Text style={estilos.nomeMedicamento}>{med.nome}</Text>
                          <Text style={estilos.horarioMedicamento}>{med.horario}</Text>
                        </View>
                      </View>
                      <View style={[estilos.badgeStatus, med.tomado && estilos.badgeStatusTomado]}>
                        <Text style={[estilos.textoBadgeStatus, med.tomado && estilos.textoBadgeStatusTomado]}>
                          {med.tomado ? 'Tomado' : med === proximoMedicamento ? 'Agora' : 'Pendente'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <View style={estilos.rodape}>
          <Text style={estilos.textoRodape}>Maria Luiza Magarão • RA: 22408637</Text>
          <Text style={estilos.textoRodape}>Algumas funcionalidades com auxilio do Claude AI</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


// ------------ ESTILOS ---------------

const estilos = StyleSheet.create({
  areaSegura:             { flex: 1, backgroundColor: '#F7F3EE' },
  container:              { flex: 1 },
  conteudo:               { padding: 24, paddingBottom: 40 },

  // Card de saudação
  cardSaudacao:           { backgroundColor: '#C9A96E', borderRadius: 20, padding: 24, marginBottom: 24 },
  tituloSaudacao:         { fontSize: 28, color: '#FDFAF7', fontWeight: '600', marginBottom: 8 },
  subtituloSaudacao:      { fontSize: 14, color: '#FDFAF7', opacity: 0.9, marginBottom: 16 },
  containerProgresso:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barraProgresso:         { flex: 1, height: 8, backgroundColor: 'rgba(253, 250, 247, 0.3)', borderRadius: 4, overflow: 'hidden' },
  preenchimentoProgresso: { height: '100%', backgroundColor: '#FDFAF7', borderRadius: 4 },
  textoProgresso:         { fontSize: 12, color: '#FDFAF7', opacity: 0.9 },

  // Card do próximo medicamento
  cardProximo:            { backgroundColor: '#FDFAF7', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E8DDD0', marginBottom: 24 },
  cabecalhoProximo:       { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  rotuloProximo:          { fontSize: 11, color: '#8A7060', marginBottom: 4 },
  nomeProximo:            { fontSize: 24, color: '#3A2E24', fontWeight: '600', marginBottom: 4 },
  dosagemProximo:         { fontSize: 14, color: '#8A7060' },
  bolinhaCorProximo:      { width: 16, height: 16, borderRadius: 8 },
  horarioProximo:         { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  textoHorarioProximo:    { fontSize: 14, color: '#8A7060' },
  botaoTomar:             { backgroundColor: '#C9A96E', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 25 },
  textoBotaoTomar:        { color: '#3A2E24', fontSize: 16, fontWeight: '500' },

  // Card de concluído
  cardConcluido:          { backgroundColor: '#C9A96E', borderRadius: 20, padding: 32, alignItems: 'center', marginBottom: 24 },
  tituloConcluido:        { fontSize: 24, color: '#FDFAF7', fontWeight: '600', marginTop: 16, marginBottom: 8 },
  textoConcluido:         { fontSize: 14, color: '#FDFAF7', opacity: 0.9, textAlign: 'center' },

  // Card da agenda / timeline
  cardAgenda:             { backgroundColor: '#FDFAF7', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: '#E8DDD0' },
  tituloAgenda:           { fontSize: 20, color: '#3A2E24', fontWeight: '600', marginBottom: 24 },
  containerPeriodo:       { position: 'relative', marginBottom: 24 },
  linhaTimeline:          { position: 'absolute', left: 8, top: 32, bottom: 0, width: 1, backgroundColor: '#E8DDD0' },
  filaPeriodo:            { flexDirection: 'row', gap: 16 },
  bolinhaTimeline:        { width: 16, height: 16, borderRadius: 8, backgroundColor: '#C9A96E', borderWidth: 2, borderColor: '#FDFAF7', marginTop: 4 },
  conteudoPeriodo:        { flex: 1 },
  nomePeriodo:            { fontSize: 11, color: '#8A7060', marginBottom: 8 },
  itemMedicamento:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7F3EE', padding: 12, borderRadius: 16, marginBottom: 8 },
  infoMedicamento:        { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  bolinhaColorida:        { width: 10, height: 10, borderRadius: 5 },
  nomeMedicamento:        { fontSize: 14, color: '#3A2E24' },
  horarioMedicamento:     { fontSize: 12, color: '#8A7060' },
  badgeStatus:            { backgroundColor: '#E8DDD0', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeStatusTomado:      { backgroundColor: '#C9A96E' },
  textoBadgeStatus:       { fontSize: 12, color: '#8A7060' },
  textoBadgeStatusTomado: { color: '#3A2E24' },

  // FOOTER
  rodape:                 { alignItems: 'center', paddingVertical: 16, marginTop: 16, borderTopWidth: 1, borderTopColor: '#E8DDD0' },
  textoRodape:            { fontSize: 11, color: '#8A7060', textAlign: 'center', marginBottom: 2 },
});