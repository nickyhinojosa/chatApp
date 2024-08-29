import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/backImage.png");
const logoImage = require("../img/logo1.jpg");

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Éxito", "Inicio de sesión exitoso"))
      .catch((err) => Alert.alert("Error de inicio de sesión", err.message));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.welcomeText}>Bienvenido a </Text>
        <Text style={styles.welcomeText}> <Text style={styles.appName}>ChatApp</Text></Text>
        <Text style={styles.subtitle}>Inicia sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A9A9A9"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupLink}>Crear una cuenta</Text>
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
  appName: {
    color: "#4CAF50", // Color verde
  },
  subtitle: {
    fontSize: 35,
    fontSize: 25,
    color: "#1E90FF",
  
    marginBottom: 20,
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
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    color: "#000000",
    fontSize: 14,
  },
  signupLink: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
