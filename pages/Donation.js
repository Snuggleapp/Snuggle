// faça uma tela simples com hello world

import React from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function Donation() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Doação</Text>
            {/* botao que volta para Map.js */}
            <Button 
                style={{marginTop: 20}}
                icon="arrow-left"
                title="Voltar"
                onPress={() => navigation.goBack()}
            />

        </View>
    );
}
