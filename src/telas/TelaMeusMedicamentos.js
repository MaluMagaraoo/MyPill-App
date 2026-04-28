// ============================================================
// TelaMeusMedicamentos.js - TELA DE LISTA DE MEDICAMENTOS
// Exibe todos os medicamentos cadastrados com imagem,
// informações, barra de estoque e botão de deletar.
// Corresponde ao requisito da Parte 1 do projeto.
// ============================================================

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Respeita o notch do iPhone
import { Feather } from '@expo/vector-icons';                  // Ícone da lixeira e botão +
import { dadosMedicamentos } from '../dados/dadosMedicamentos'; // Lista de medicamentos

export default function TelaMeusMedicamentos({ navigation }) {
  return (
    <SafeAreaView style={estilos.areaSegura} edges={['top']}>
      <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>

        {/* ---- CABEÇALHO DA TELA ---- */}
        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>Meus Medicamentos</Text>
          <Text style={estilos.subtitulo}>
            {dadosMedicamentos.length} medicamento{dadosMedicamentos.length !== 1 ? 's' : ''} na sua lista
          </Text>
        </View>

        {/* ---- LISTA DE CARDS DE MEDICAMENTOS ---- */}
        <View style={estilos.lista}>
          {/* Percorre cada medicamento e renderiza um card */}
          {dadosMedicamentos.map((medicamento) => {
            // Calcula a porcentagem do estoque (max 100%)
            const porcentagemEstoque = Math.min((medicamento.estoque / 30) * 100, 100);
            // Verifica se o estoque está baixo (menos de 10 unidades)
            const estoqueBaixo = medicamento.estoque <= 10;

            return (
              <TouchableOpacity
                key={medicamento.id}
                style={estilos.cardMedicamento}
                // Ao tocar no card, navega para a tela de detalhes passando o ID
                onPress={() => navigation.navigate('MedicationDetail', { medicacaoId: medicamento.id })}
              >
                {/* ---- CONTEÚDO PRINCIPAL DO CARD ---- */}
                <View style={estilos.conteudoCard}>

                  {/* Imagem do medicamento */}
                  <View style={estilos.containerImagem}>
                    {medicamento.imagem ? (
                      // Se tem imagem, exibe ela
                      <Image source={medicamento.imagem} style={estilos.imagemMedicamento} />
                    ) : (
                      // Se não tem imagem, exibe um placeholder colorido com emoji
                      <View style={[estilos.imagemMedicamento, estilos.placeholderImagem, { backgroundColor: medicamento.cor }]}>
                        <Text style={estilos.textoPlaceholder}>💊</Text>
                      </View>
                    )}
                    {/* Bolinha colorida no canto superior direito */}
                    <View style={[estilos.indicadorCor, { backgroundColor: medicamento.cor }]} />
                    {/* Badge vermelho quando o estoque está baixo */}
                    {estoqueBaixo && (
                      <View style={estilos.badgeEstoqueBaixo}>
                        <Text style={estilos.textoBadgeEstoque}>{medicamento.estoque}un</Text>
                      </View>
                    )}
                  </View>

                  {/* Informações textuais do medicamento */}
                  <View style={estilos.infoMedicamento}>
                    <Text style={estilos.nomeMedicamento}>{medicamento.nome}</Text>
                    <Text style={estilos.dosagemMedicamento}>{medicamento.dosagem}</Text>
                    {/* Descrição resumida (1 linha apenas) */}
                    <Text style={estilos.descricaoMedicamento} numberOfLines={1}>{medicamento.descricao}</Text>
                    {/* Chips com os horários de administração */}
                    <View style={estilos.containerHorarios}>
                      {medicamento.horarios.map((horario, i) => (
                        <View key={i} style={estilos.chipHorario}>
                          <Text style={estilos.textoChipHorario}>{horario}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Botão de deletar medicamento */}
                  <TouchableOpacity style={estilos.botaoDeletar}>
                    <Feather name="trash-2" size={16} color="#D4756A" />
                  </TouchableOpacity>
                </View>

                {/* ---- BARRA DE ESTOQUE NA PARTE INFERIOR ---- */}
                <View style={estilos.containerEstoque}>
                  <View style={estilos.barraEstoque}>
                    {/* Preenchimento da barra - fica vermelho quando estoque baixo */}
                    <View style={[
                      estilos.preenchimentoEstoque,
                      estoqueBaixo && estilos.preenchimentoEstoqueBaixo,
                      { width: `${porcentagemEstoque}%` }
                    ]} />
                  </View>
                  {/* Texto com quantidade restante */}
                  <Text style={[estilos.textoEstoque, estoqueBaixo && estilos.textoEstoqueBaixo]}>
                    {medicamento.estoque} restante{medicamento.estoque !== 1 ? 's' : ''}
                  </Text>
                </View>

              </TouchableOpacity>
            );
          })}
        </View>

        {/* ---- BOTÃO FLUTUANTE PARA ADICIONAR NOVO MEDICAMENTO ---- */}
        <TouchableOpacity style={estilos.botaoAdicionar} onPress={() => navigation.navigate('Add')}>
          <Feather name="plus" size={24} color="#3A2E24" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}


// ---------------- ESTILOS ----------------

const estilos = StyleSheet.create({
  areaSegura:                  { flex: 1, backgroundColor: '#F7F3EE' },
  container:                   { flex: 1 },
  conteudo:                    { padding: 24, paddingBottom: 100 },

  // Cabeçalho
  cabecalho:                   { marginBottom: 32 },
  titulo:                      { fontSize: 28, color: '#3A2E24', fontWeight: '600', marginBottom: 8 },
  subtitulo:                   { fontSize: 14, color: '#8A7060' },

  // Lista e card
  lista:                       { gap: 12 },
  cardMedicamento:             { backgroundColor: '#FDFAF7', borderRadius: 20, borderWidth: 1, borderColor: '#E8DDD0', overflow: 'hidden', marginBottom: 12 },
  conteudoCard:                { flexDirection: 'row' },

  // Imagem
  containerImagem:             { width: 112, height: 112, position: 'relative' },
  imagemMedicamento:           { width: '100%', height: '100%' },
  placeholderImagem:           { justifyContent: 'center', alignItems: 'center' },
  textoPlaceholder:            { fontSize: 40 },
  indicadorCor:                { position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#fff' },
  badgeEstoqueBaixo:           { position: 'absolute', top: 8, left: 8, backgroundColor: '#D4756A', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 2 },
  textoBadgeEstoque:           { fontSize: 10, color: '#FFF' },

  // Informações
  infoMedicamento:             { flex: 1, padding: 16, justifyContent: 'space-between' },
  nomeMedicamento:             { fontSize: 16, color: '#3A2E24', fontWeight: '600', marginBottom: 4 },
  dosagemMedicamento:          { fontSize: 14, color: '#8A7060', marginBottom: 4 },
  descricaoMedicamento:        { fontSize: 12, color: '#8A7060', marginBottom: 8 },
  containerHorarios:           { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chipHorario:                 { backgroundColor: '#F7F3EE', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12 },
  textoChipHorario:            { fontSize: 12, color: '#3A2E24' },

  // Botão deletar
  botaoDeletar:                { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F7F3EE', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginRight: 16 },

  // Barra de estoque
  containerEstoque:            { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  barraEstoque:                { flex: 1, height: 6, backgroundColor: '#E8DDD0', borderRadius: 3, overflow: 'hidden' },
  preenchimentoEstoque:        { height: '100%', backgroundColor: '#C9A96E', borderRadius: 3 },
  preenchimentoEstoqueBaixo:   { backgroundColor: '#D4756A' },
  textoEstoque:                { fontSize: 12, color: '#8A7060' },
  textoEstoqueBaixo:           { color: '#D4756A' },

  // Botão flutuante
  botaoAdicionar:              { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#C9A96E', alignItems: 'center', justifyContent: 'center', elevation: 4 },
});
