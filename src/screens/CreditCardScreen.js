import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreditCardScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);

  const validateCreditCard = () => {
    // Luhn algorithm for credit card validation
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    setIsValid(sum % 10 === 0);
  };

  return (
    <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={faCreditCard} size={20} color="#00ff00" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Enter credit card number"
          placeholderTextColor="#555"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.validateButton} onPress={validateCreditCard}>
        <Text style={styles.validateButtonText}>Validate</Text>
      </TouchableOpacity>
      {isValid !== null && (
        <View style={[styles.resultContainer, isValid ? styles.validResult : styles.invalidResult]}>
          <FontAwesomeIcon icon={isValid ? faCheck : faTimes} size={20} color={isValid ? '#00ff00' : '#ff0000'} />
          <Text style={styles.resultText}>
            {isValid ? 'Valid credit card number' : 'Invalid credit card number'}
          </Text>
        </View>
      )}
      <ScrollView style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Credit Card Validation Info:</Text>
        <Text style={styles.infoText}>
          This tool uses the Luhn algorithm to validate credit card numbers. The Luhn algorithm, also known as the "modulus 10" or "mod 10" algorithm, is a simple checksum formula used to validate a variety of identification numbers, including credit card numbers.
        </Text>
        <Text style={styles.infoText}>
          Please note that while this algorithm can detect many errors in credit card numbers, it does not guarantee that the number corresponds to an actual, issued credit card.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  validateButton: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  validateButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  validResult: {
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
  },
  invalidResult: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  resultText: {
    color: '#fff',
    marginLeft: 10,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  infoTitle: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    marginBottom: 10,
  },
});

export default CreditCardScreen;

