// ============================================================
// TelaAdicionarMedicamento.js - TELA DE CADASTRO DE MEDICAMENTO
// Formulário completo para adicionar um novo medicamento.
// Corresponde ao requisito da Parte 3 do projeto:
// - 4 TextInput (campos de texto)
// - 2 Picker (listas de seleção)
// - 2 Slider (controles deslizantes)
// - 2 Switch (chaves liga/desliga)
// - 2 Botões com interação
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Respeita o notch do iPhone
import { Feather } from '@expo/vector-icons';                  // Ícones
import { Picker } from '@react-native-picker/picker';          // Lista de seleção (dropdown)
import Slider from '@react-native-community/slider';           // Controle deslizante
import * as SeletorImagem from 'expo-image-picker';            // Seleção de imagem da galeria

// Opções de horários disponíveis para o medicamento
const horariosDisponiveis = [
  { id: 'manha',  rotulo: 'Manhã',  icone: 'sunrise' },
  { id: 'almoco', rotulo: 'Almoço', icone: 'sun' },
  { id: 'tarde',  rotulo: 'Tarde',  icone: 'sunset' },
  { id: 'noite',  rotulo: 'Noite',  icone: 'moon' },
];

// Cores disponíveis para identificar o medicamento visualmente
const opcoesDeCores = ['#F4A261', '#E76F51', '#2A9D8F', '#264653', '#E9C46A', '#C9A96E'];

export default function TelaAdicionarMedicamento({ navigation }) {

  // 4 TextInput (Parte 3 - Requisito)
  const [nome, setNome]             = useState(''); // Campo de texto: nome do medicamento
  const [dosagem, setDosagem]       = useState(''); // Campo de texto: dosagem
  const [estoque, setEstoque]       = useState(''); // Campo de texto: quantidade em estoque
  const [observacoes, setObservacoes] = useState(''); // Campo de texto: observações

  // Imagem selecionada da galeria
  const [uriImagem, setUriImagem]   = useState(null);

  // 2 Pickers (Parte 3 - Requisito)
  const [categoria, setCategoria]   = useState('vitamina'); // Seleção: categoria do medicamento
  const [frequencia, setFrequencia] = useState('diario');   // Seleção: frequência de uso

  // 2 Sliders (Parte 3 - Requisito)
  const [duracao, setDuracao]       = useState(1);  // Deslizante: duração do tratamento (1-90 dias)
  const [importancia, setImportancia] = useState(5); // Deslizante: nível de importância (1-10)

  // 2 Switches (Parte 3 - Requisito)
  const [comAlimentacao, setComAlimentacao] = useState(false); // Chave: tomar com comida
  const [lembrete, setLembrete]             = useState(true);  // Chave: ativar lembretes

  // Horários do dia selecionados (pode selecionar mais de um)
  const [horariosEscolhidos, setHorariosEscolhidos] = useState([]);

  // Cor escolhida para identificar o medicamento
  const [corEscolhida, setCorEscolhida] = useState(opcoesDeCores[0]);


  // ------------ FUNÇÕES -----------------


  // Alterna seleção de horário (USO DE IA)
  const alternarHorario = (idHorario) => {
    setHorariosEscolhidos(anterior =>
      anterior.includes(idHorario)
        ? anterior.filter(t => t !== idHorario) 
        : [...anterior, idHorario]               
    );
  };

  // Abre a galeria de fotos do celular para escolher uma imagem (USO DE IA)
  const selecionarImagem = async () => {
    const resultado = await SeletorImagem.launchImageLibraryAsync({
      mediaTypes: SeletorImagem.MediaTypeOptions.Images,
      allowsEditing: true,  // Permite recortar a imagem
      aspect: [4, 3],       // Proporção do recorte
      quality: 1,           // Qualidade máxima
    });
    if (!resultado.canceled) {
      setUriImagem(resultado.assets[0].uri);
    }
  };

  // Função de salvar - Botão 1 (Parte 3 - Requisito)
  const salvarMedicamento = () => {
    if (!nome || !dosagem || horariosEscolhidos.length === 0) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, dosagem e selecione ao menos um horário');
      return;
    }
    Alert.alert('Sucesso', 'Medicamento salvo!', [
      { text: 'OK', onPress: () => navigation.navigate('MyMeds') },
    ]);
  };


  const podeSalvar = nome && dosagem && horariosEscolhidos.length > 0;

  return (
    <SafeAreaView style={estilos.areaSegura} edges={['top']}>
      <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>

        {/* ---- CABEÇALHO COM BOTÃO DE VOLTAR ---- */}
        <View style={estilos.cabecalho}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.botaoVoltar}>
            <Feather name="arrow-left" size={20} color="#3A2E24" />
          </TouchableOpacity>
          <Text style={estilos.titulo}>Adicionar Medicamento</Text>
        </View>

        {/* ---- UPLOAD DE IMAGEM (USO DE IA) ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Foto do Medicamento</Text>
          {!uriImagem ? (
            <TouchableOpacity style={estilos.areaUpload} onPress={selecionarImagem}>
              <Feather name="upload" size={32} color="#C9A96E" />
              <Text style={estilos.textoUpload}>Clique para adicionar uma foto</Text>
            </TouchableOpacity>
          ) : (
            <View style={estilos.previewImagem}>
              <Image source={{ uri: uriImagem }} style={estilos.imagemPreview} />
              <TouchableOpacity style={estilos.botaoRemoverImagem} onPress={() => setUriImagem(null)}>
                <Feather name="x" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ---- TEXTINPUT 1: NOME DO MEDICAMENTO ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Nome do Medicamento</Text>
          <TextInput
            style={estilos.campoTexto}
            value={nome}
            onChangeText={setNome}       
            placeholder="ex: Aspirina"
            placeholderTextColor="#8A7060"
          />
        </View>

        {/* ---- TEXTINPUT 2: DOSAGEM ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Dosagem</Text>
          <TextInput
            style={estilos.campoTexto}
            value={dosagem}
            onChangeText={setDosagem}
            placeholder="ex: 500mg"
            placeholderTextColor="#8A7060"
          />
        </View>

        {/* ---- TEXTINPUT 3: QUANTIDADE EM ESTOQUE ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Quantidade em Estoque</Text>
          <TextInput
            style={estilos.campoTexto}
            value={estoque}
            onChangeText={setEstoque}
            placeholder="ex: 30"
            keyboardType="numeric"        
            placeholderTextColor="#8A7060"
          />
        </View>

        {/* ---- TEXTINPUT 4: OBSERVAÇÕES ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Observações</Text>
          <TextInput
            style={estilos.campoTexto}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="ex: Tomar com água"
            placeholderTextColor="#8A7060"
          />
        </View>

        {/* ---- PICKER 1: CATEGORIA DO MEDICAMENTO ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Categoria</Text>
          <View style={estilos.containerPicker}>
            <Picker
              selectedValue={categoria}
              onValueChange={setCategoria}  
              style={estilos.picker}
            >
              <Picker.Item label="Vitamina"          value="vitamina" />
              <Picker.Item label="Antibiótico"       value="antibiotico" />
              <Picker.Item label="Analgésico"        value="analgesico" />
              <Picker.Item label="Uso Crônico"       value="cronico" />
              <Picker.Item label="Suplemento"        value="suplemento" />
            </Picker>
          </View>
        </View>

        {/*---- PICKER 2: FREQUÊNCIA DE USO ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Frequência de Uso</Text>
          <View style={estilos.containerPicker}>
            <Picker
              selectedValue={frequencia}
              onValueChange={setFrequencia}
              style={estilos.picker}
            >
              <Picker.Item label="Diário"             value="diario" />
              <Picker.Item label="Semanal"            value="semanal" />
              <Picker.Item label="Quinzenal"          value="quinzenal" />
              <Picker.Item label="Mensal"             value="mensal" />
              <Picker.Item label="Quando necessário"  value="necessario" />
            </Picker>
          </View>
        </View>

        {/* ---- SLIDER 1: DURAÇÃO DO TRATAMENTO ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>
            Duração do Tratamento: {duracao} {duracao === 1 ? 'dia' : 'dias'}
          </Text>
          <Slider
            style={estilos.slider}
            minimumValue={1}              // Valor mínimo: 1 dia
            maximumValue={90}             // Valor máximo: 90 dias
            step={1}                      // Incremento de 1 em 1
            value={duracao}
            onValueChange={setDuracao}    // Atualiza ao arrastar
            minimumTrackTintColor="#C9A96E" // Cor da parte preenchida
            maximumTrackTintColor="#E8DDD0" // Cor da parte vazia
            thumbTintColor="#C9A96E"        // Cor do botão deslizante
          />
          <View style={estilos.rotulosSlider}>
            <Text style={estilos.rotuloSlider}>1 dia</Text>
            <Text style={estilos.rotuloSlider}>90 dias</Text>
          </View>
        </View>

        {/* ---- SLIDER 2: NÍVEL DE IMPORTÂNCIA ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Nível de Importância: {importancia}/10</Text>
          <Slider
            style={estilos.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={importancia}
            onValueChange={setImportancia}
            minimumTrackTintColor="#C9A96E"
            maximumTrackTintColor="#E8DDD0"
            thumbTintColor="#C9A96E"
          />
          <View style={estilos.rotulosSlider}>
            <Text style={estilos.rotuloSlider}>Baixa</Text>
            <Text style={estilos.rotuloSlider}>Alta</Text>
          </View>
        </View>

        {/* ---- SWITCH 1: TOMAR COM ALIMENTAÇÃO ---- */}
        <View style={estilos.cardSwitch}>
          <View style={estilos.infoSwitch}>
            <Text style={estilos.tituloSwitch}>Tomar com Alimentação</Text>
            <Text style={estilos.subtituloSwitch}>Requer comida no estômago</Text>
          </View>
          <Switch
            value={comAlimentacao}
            onValueChange={setComAlimentacao}
            trackColor={{ false: '#E8DDD0', true: '#C9A96E' }} 
            thumbColor="#fff"                                    
          />
        </View>

        {/* ---- SWITCH 2: ATIVAR LEMBRETES ---- */}
        <View style={estilos.cardSwitch}>
          <View style={estilos.infoSwitch}>
            <Text style={estilos.tituloSwitch}>Ativar Lembretes</Text>
            <Text style={estilos.subtituloSwitch}>Notificações nos horários</Text>
          </View>
          <Switch
            value={lembrete}
            onValueChange={setLembrete}
            trackColor={{ false: '#E8DDD0', true: '#C9A96E' }}
            thumbColor="#fff"
          />
        </View>

        {/* ---- SELEÇÃO DE HORÁRIO DO DIA (USO DE IA) ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Horário do Dia</Text>
          <View style={estilos.gradeHorarios}>
            {horariosDisponiveis.map(slot => {
              const estaSelecionado = horariosEscolhidos.includes(slot.id);
              return (
                <TouchableOpacity
                  key={slot.id}
                  style={[estilos.slotHorario, estaSelecionado && estilos.slotHorarioSelecionado]}
                  onPress={() => alternarHorario(slot.id)}
                >
                  <Feather name={slot.icone} size={24} color={estaSelecionado ? '#3A2E24' : '#8A7060'} />
                  <Text style={[estilos.textoSlotHorario, estaSelecionado && estilos.textoSlotHorarioSelecionado]}>
                    {slot.rotulo}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ---- SELETOR DE COR DO MEDICAMENTO ---- */}
        <View style={estilos.secao}>
          <Text style={estilos.rotulo}>Cor do Medicamento</Text>
          <View style={estilos.filaDeCores}>
            {opcoesDeCores.map(cor => (
              <TouchableOpacity
                key={cor}
                style={[estilos.bolinhaCorOpcao, { backgroundColor: cor }, corEscolhida === cor && estilos.bolinhaCorSelecionada]}
                onPress={() => setCorEscolhida(cor)}
              />
            ))}
          </View>
        </View>

        {/* ---- BOTÃO 1: SALVAR MEDICAMENTO ---- */}
        <TouchableOpacity
          style={[estilos.botaoSalvar, !podeSalvar && estilos.botaoSalvarDesabilitado]}
          onPress={salvarMedicamento}
          disabled={!podeSalvar}
        >
          <Text style={estilos.textoBotaoSalvar}>Salvar Medicamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


// ------------ ESTILOS -------------

const estilos = StyleSheet.create({
  areaSegura:                  { flex: 1, backgroundColor: '#F7F3EE' },
  container:                   { flex: 1 },
  conteudo:                    { padding: 24, paddingBottom: 40 },

  // Cabeçalho
  cabecalho:                   { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  botaoVoltar:                 { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', alignItems: 'center', justifyContent: 'center' },
  titulo:                      { fontSize: 28, color: '#3A2E24', fontWeight: '600' },

  // Seções
  secao:                       { marginBottom: 24 },
  rotulo:                      { fontSize: 14, color: '#8A7060', marginBottom: 8 },

  // TextInput
  campoTexto:                  { backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#3A2E24' },

  // Upload de imagem
  areaUpload:                  { height: 160, backgroundColor: '#FDFAF7', borderWidth: 2, borderStyle: 'dashed', borderColor: '#E8DDD0', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  textoUpload:                 { fontSize: 14, color: '#8A7060', marginTop: 8 },
  previewImagem:               { height: 160, backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', borderRadius: 20, overflow: 'hidden', position: 'relative' },
  imagemPreview:               { width: '100%', height: '100%' },
  botaoRemoverImagem:          { position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: '#D4756A', alignItems: 'center', justifyContent: 'center' },

  // Picker
  containerPicker:             { backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', borderRadius: 20, overflow: 'hidden' },
  picker:                      { color: '#3A2E24' },

  // Slider
  slider:                      { width: '100%', height: 40 },
  rotulosSlider:               { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  rotuloSlider:                { fontSize: 12, color: '#8A7060' },

  // Switch
  cardSwitch:                  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', borderRadius: 20, padding: 16, marginBottom: 16 },
  infoSwitch:                  { flex: 1 },
  tituloSwitch:                { fontSize: 14, color: '#3A2E24', marginBottom: 4 },
  subtituloSwitch:             { fontSize: 12, color: '#8A7060' },

  // Seleção de horários
  gradeHorarios:               { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  slotHorario:                 { flex: 1, minWidth: '45%', backgroundColor: '#FDFAF7', borderWidth: 1, borderColor: '#E8DDD0', borderRadius: 20, padding: 16, alignItems: 'center' },
  slotHorarioSelecionado:      { backgroundColor: '#C9A96E', borderColor: '#C9A96E' },
  textoSlotHorario:            { fontSize: 14, color: '#8A7060', marginTop: 8 },
  textoSlotHorarioSelecionado: { color: '#3A2E24' },

  // Seletor de cores
  filaDeCores:                 { flexDirection: 'row', gap: 12 },
  bolinhaCorOpcao:             { width: 48, height: 48, borderRadius: 24 },
  bolinhaCorSelecionada:       { borderWidth: 4, borderColor: '#C9A96E', transform: [{ scale: 1.1 }] },

  // Botões
  botaoSalvar:                 { backgroundColor: '#C9A96E', paddingVertical: 16, borderRadius: 25, alignItems: 'center', marginTop: 32, marginBottom: 16 },
  botaoSalvarDesabilitado:     { opacity: 0.5 },
  textoBotaoSalvar:            { color: '#3A2E24', fontSize: 16, fontWeight: '600' },
  botaoCancelar:               { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#E8DDD0', paddingVertical: 16, borderRadius: 25, alignItems: 'center' },
  textoBotaoCancelar:          { color: '#3A2E24', fontSize: 16, fontWeight: '600' },
});
