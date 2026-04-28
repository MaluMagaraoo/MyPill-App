// ============================================================
// App.js - ARQUIVO PRINCIPAL DO APLICATIVO
// Este arquivo unifica o ponto de entrada (index.js) e toda
// a configuração de navegação do app em um único lugar.
// ============================================================

import React from 'react';

// registerRootComponent: registra este arquivo como ponto de entrada do Expo
// Substitui o index.js — não é mais necessário ter arquivo separado
import { registerRootComponent } from 'expo';

// NavigationContainer: envolve todo o app e gerencia a navegação
import { NavigationContainer } from '@react-navigation/native';

// createBottomTabNavigator: cria a barra de abas na parte de baixo
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// createNativeStackNavigator: cria navegação em pilha (tela empilhada sobre outra)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Feather: biblioteca de ícones para os botões da barra de abas
import { Feather } from '@expo/vector-icons';

// Importação das telas do aplicativo
import TelaInicio from './src/telas/TelaInicio';
import TelaAdicionarMedicamento from './src/telas/TelaAdicionarMedicamento';
import TelaMeusMedicamentos from './src/telas/TelaMeusMedicamentos';
import TelaDetalhesMedicamento from './src/telas/TelaDetalhesMedicamento';

// Criação dos navegadores
const Abas = createBottomTabNavigator();     // Navegador de abas
const Pilha = createNativeStackNavigator();  // Navegador de pilha

// ============================================================
// PilhaMeusMedicamentos
// Agrupa as telas de "Meus Medicamentos" e "Detalhes"
// em uma navegação de pilha (uma abre em cima da outra)
// ============================================================
function PilhaMeusMedicamentos() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      {/* Tela principal da lista de medicamentos */}
      <Pilha.Screen name="ListaMedicamentos" component={TelaMeusMedicamentos} />
      {/* Tela de detalhes, abre ao tocar em um medicamento */}
      <Pilha.Screen name="MedicationDetail" component={TelaDetalhesMedicamento} />
    </Pilha.Navigator>
  );
}

// ============================================================
// AbasInferiores
// Define as 3 abas principais do aplicativo na barra inferior
// ============================================================
function AbasInferiores() {
  return (
    <Abas.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FDFAF7',
          borderTopColor: '#E8DDD0',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarActiveTintColor: '#C9A96E',
        tabBarInactiveTintColor: '#8A7060',
      }}
    >
      {/* Aba 1: Tela de Início */}
      <Abas.Screen
        name="Inicio"
        component={TelaInicio}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />

      {/* Aba 2: Tela de Adicionar Medicamento */}
      <Abas.Screen
        name="Add"
        component={TelaAdicionarMedicamento}
        options={{
          tabBarLabel: 'Adicionar',
          tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
        }}
      />

      {/* Aba 3: Pilha de Meus Medicamentos + Detalhes */}
      <Abas.Screen
        name="MyMeds"
        component={PilhaMeusMedicamentos}
        options={{
          tabBarLabel: 'Meus Remédios',
          tabBarIcon: ({ color, size }) => <Feather name="package" color={color} size={size} />,
        }}
      />
    </Abas.Navigator>
  );
}

// ============================================================
// App - Componente raiz do aplicativo
// ============================================================
function App() {
  return (
    <NavigationContainer>
      <AbasInferiores />
    </NavigationContainer>
  );
}

// Registra o App como ponto de entrada do Expo (substitui o index.js)
export default registerRootComponent(App);