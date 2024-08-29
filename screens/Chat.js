import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import colors from '../colors';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "No", style: "cancel" },
        { text: "Sí", onPress: () => signOut(auth).catch(error => console.log('Error logging out: ', error)) }
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Chat',
      headerRight: () => (
        <TouchableOpacity style={styles.logoutButton} onPress={onSignOut}>
          <AntDesign name="logout" size={24} color={colors.gray} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
      renderSend={(props) => (
        <TouchableOpacity style={styles.sendButton} onPress={() => props.onSend({ text: props.text }, true)}>
          <FontAwesome name="send" size={24} color={colors.primaryContrast} />
        </TouchableOpacity>
      )}
      messagesContainerStyle={styles.messagesContainer}
      textInputStyle={styles.textInput}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
    />
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
  },
  messagesContainer: {
    backgroundColor: '#f4f4f8',
  },
  textInput: {
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 10,  // Adding margin to give more space
  },
  sendButton: {
    marginBottom: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF', // Strong blue color for the button
    borderRadius: 20,
    padding: 8,
  }
});
