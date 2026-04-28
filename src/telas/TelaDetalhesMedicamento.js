// ============================================================
// TelaDetalhesMedicamento.js - TELA DE DETALHES DO MEDICAMENTO
// Mostra todas as informações de um medicamento específico.
// Abre ao tocar em um item da lista de medicamentos.
// Corresponde ao requisito da Parte 2 do projeto
// (imagem + descrição com mínimo de 30 palavras cada).
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { dadosMedicamentos } from '../dados/dadosMedicamentos'; 

const CORES = {
  fundo:        '#F7F3EE', 
  fundoClaro:   '#FDFAF7', 
  bege:         '#E8DDD0', 
  dourado:      '#C9A96E', 
  marromEscuro: '#3A2E24', 
  marromMedio:  '#8A7060', 
};

export default function TelaDetalhesMedicamento({ route }) {
  const medicacaoId = route?.params?.medicacaoId || '1';
  const medicacao = dadosMedicamentos.find((m) => m.id === medicacaoId);

  // Calcula quantos dias de estoque ainda restam
  const diasRestantes = Math.floor(medicacao.estoque / medicacao.horarios.length);
  const estoqueBaixo = diasRestantes <= 10;

// ---- IMAGEM DO MEDICAMENTO NO TOPO ---- 
  return (
    <ScrollView style={estilos.container}>
      {medicacao.imagem ? (
        <Image source={medicacao.imagem} style={estilos.imagemCabecalho} />
      ) : (
        <View style={[estilos.placeholderImagem, { backgroundColor: medicacao.cor }]}>
          <Text style={estilos.textoPlaceholder}>💊</Text>
        </View>
      )}
      <View style={estilos.conteudo}>
        {/*---- NOME E DOSAGEM ---- */}
        <View style={estilos.cabecalho}>
          <Text style={estilos.nome}>{medicacao.nome}</Text>
          <Text style={estilos.dosagem}>{medicacao.dosagem}</Text>
        </View>

        {/* ---- CARDS DE ESTATÍSTICAS ---- */}
        <View style={estilos.containerEstatisticas}>
          {/* Estatística 1: Quantidade em estoque */}
          <View style={estilos.cardEstatistica}>
            <Text style={estilos.rotuloEstatistica}>Estoque</Text>
            <Text style={estilos.valorEstatistica}>{medicacao.estoque}</Text>
          </View>
          {/* Estatística 2: Dias restantes */}
          <View style={estilos.cardEstatistica}>
            <Text style={estilos.rotuloEstatistica}>Dias Restantes</Text>
            <Text style={estilos.valorEstatistica}>{diasRestantes}</Text>
          </View>
          {/* Estatística 3: Quantidade de horários por dia */}
          <View style={estilos.cardEstatistica}>
            <Text style={estilos.rotuloEstatistica}>Horários</Text>
            <Text style={estilos.valorEstatistica}>{medicacao.horarios.length}</Text>
          </View>
        </View>

        {/* ---- SEÇÃO: DESCRIÇÃO RESUMIDA ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Descrição</Text>
          <Text style={estilos.descricaoResumida}>{medicacao.descricao}</Text>
        </View>

        {/* ---- SEÇÃO: DESCRIÇÃO DETALHADA ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Informações Detalhadas</Text>
          <View style={estilos.cardDescricao}>
            <Text style={estilos.descricaoDetalhada}>{medicacao.descricaoLonga}</Text>
          </View>
        </View>

        {/* ---- SEÇÃO: HORÁRIOS DE INGESTÃO  (USO DE IA)---- */}
        <View style={estilos.secao}>
          <Text style={estilos.tituloSecao}>Horários de Ingestão</Text>
          <View style={estilos.containerHorarios}>
            {/* Renderiza um chip para cada horário */}
            {medicacao.horarios.map((hora, indice) => (
              <View key={indice} style={estilos.chipHorario}>
                <Text style={estilos.textoChipHorario}>🕐 {hora}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

//-------------ESTILOS---------------

const estilos = StyleSheet.create({
  container:             { flex: 1, backgroundColor: CORES.fundo },

  // Imagem de cabeçalho
  imagemCabecalho:       { width: '100%', height: 250 },
  placeholderImagem:     { height: 250, justifyContent: 'center', alignItems: 'center' },
  textoPlaceholder:      { fontSize: 80 },

  // Conteúdo
  conteudo:              { padding: 15 },
  cabecalho:             { marginBottom: 16 },
  nome:                  { fontSize: 28, fontWeight: 'bold', color: CORES.marromEscuro },
  dosagem:               { fontSize: 16, color: CORES.marromMedio, marginTop: 5 },

  // Card de alerta de estoque baixo
  cardAlerta:            { backgroundColor: '#ffebee', borderLeftColor: '#d32f2f', borderLeftWidth: 4, padding: 14, borderRadius: 8, marginBottom: 16 },
  tituloAlerta:          { fontSize: 14, fontWeight: 'bold', color: '#d32f2f' },
  textoAlerta:           { fontSize: 13, color: '#d32f2f', marginTop: 4 },
  botaoReposicao:        { backgroundColor: '#d32f2f', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginTop: 10, alignSelf: 'flex-start' },
  textoBotaoReposicao:   { color: 'white', fontWeight: '600', fontSize: 12 },

  // Cards de estatísticas
  containerEstatisticas: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cardEstatistica:       { flex: 1, backgroundColor: CORES.fundoClaro, padding: 12, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  rotuloEstatistica:     { fontSize: 12, color: CORES.marromMedio, fontWeight: '500' },
  valorEstatistica:      { fontSize: 20, fontWeight: 'bold', color: CORES.dourado, marginTop: 6 },

  // Seções
  secao:                 { marginBottom: 20 },
  tituloSecao:           { fontSize: 16, fontWeight: '700', color: CORES.marromEscuro, marginBottom: 10 },
  descricaoResumida:     { fontSize: 14, color: CORES.marromMedio, lineHeight: 20 },
  cardDescricao:         { backgroundColor: CORES.fundoClaro, padding: 12, borderRadius: 8, borderColor: CORES.bege, borderWidth: 1 },
  descricaoDetalhada:    { fontSize: 14, color: CORES.marromEscuro, lineHeight: 22 },

  // Horários
  containerHorarios:     { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipHorario:           { backgroundColor: CORES.dourado, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  textoChipHorario:      { fontSize: 13, fontWeight: '600', color: 'white' },

  // Erro
  textoErro:             { fontSize: 16, color: CORES.marromEscuro, textAlign: 'center', marginTop: 20 },
});
