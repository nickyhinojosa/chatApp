import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const backImage = require("../assets/backImage.png");
const logoImage = require("../img/logo1.jpg");


export default function Signup({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email === '' || password === '') {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Éxito", "Cuenta creada exitosamente");
        navigation.navigate("Login");
      })
      .catch((err) => Alert.alert("Error de registro", err.message));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
      <Image source={logoImage} style={styles.logo} />
        <Text style={styles.welcomeText}>Crear una cuenta en <Text style={styles.appName}>ChatApp</Text></Text>
        <Text style={styles.subtitle}>Crea Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  form: {
    marginHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000000",
  },
  subtitle: {
    fontSize: 25,
    color: "#1E90FF",
  
    marginBottom: 20,
  },
  appName: {
    color: "#4CAF50", // Color verde
  },
  input: {
    backgroundColor: "#f0f0f0",
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 8,
    padding: 10,
    borderColor: "#1E90FF",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#1E90FF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#000000",
    fontSize: 14,
  },
  loginLink: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 15,

  },
});
