 import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [selectedSize, setSelectedSize] = useState(''); // Tamanho selecionado
  const [quantity, setQuantity] = useState(1); // Quantidade
  const [donations, setDonations] = useState([]); // Lista de doações

  const sizes = ['PP', 'P', 'M', 'G', 'GG']; // Tamanhos disponíveis

  const handleAddDonation = () => {
    if (selectedSize && quantity > 0) {
      const newDonation = { size: selectedSize, quantity };
      setDonations([...donations, newDonation]);
      setSelectedSize(''); // Limpa a seleção
      setQuantity(1); // Reinicia a quantidade
    }
  };

  const navigation = useNavigation();

  const goToMap = () =>{
    navigation.navigate("Map");
  }


  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={goToMap} style={styles.goBackButton}>
      <FontAwesome5 name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cadastre um produto</Text>
      </View>
      <Text style={styles.subTitle}>Dados de doação</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSize, // Estilo condicional para o tamanho selecionado
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.quantityLabel}>Quantidade:</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(quantity - 1, 1))}
        >
          <FontAwesome5 name="minus" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(quantity + 1)}
        >
          <FontAwesome5 name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddDonation}>
        <FontAwesome5 name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Adicionar Roupa</Text>
      </TouchableOpacity>
      <Text style={styles.donationListLabel}>Lista de Doações:</Text>
      <FlatList
        data={donations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.donationItem}>
            <Text>{item.size} - {item.quantity}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Prosseguir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSize: {
    backgroundColor: 'blue',
  },
  quantityLabel: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  donationListLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  donationItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  proceedButton: {
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
