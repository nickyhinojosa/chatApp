import React, { useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from '@expo/vector-icons';

const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const activeUsers = [
    { id: '1', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '2', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: '3', image: 'https://randomuser.me/api/portraits/women/46.jpg' },
    { id: '4', image: 'https://randomuser.me/api/portraits/men/47.jpg' },
];

const messages = [
    { id: '1', name: 'Gise Levito', message: 'Marina está escribiendo...', image: require('../img/jilmar.jpg') , notification: 2 },
    { id: '2', name: 'Jilmar Almendras', message: 'Envió una imagen', image: 'https://randomuser.me/api/portraits/men/49.jpg', notification: 0 },
    { id: '3', name: 'Nicky Hinojosa', message: 'Reúnete conmigo antes de la presentación...', image: require('../img/Nicky.jpg') , notification: 3 },
    { id: '4', name: 'Mateo', message: '¿Cómo preparaste...', image: 'https://randomuser.me/api/portraits/men/51.jpg', notification: 0 },
    { id: '5', name: 'Vero', message: 'Tú: ¿Qué sobre miércoles...', image: 'https://randomuser.me/api/portraits/men/52.jpg', notification: 1 },
    { id: '6', name: 'Sofia Terrazas', message: 'Envió un archivo', image: 'https://randomuser.me/api/portraits/men/53.jpg', notification: 2 },
    { id: '7', name: 'Lili', message: 'La próxima presentación será...', image: require('../img/logo.png'), notification: 0 },
];

const Home = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="home" size={24} color="#4A90E2" style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={styles.profileImage}
                />
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Activos Ahora</Text>
            <FlatList
                horizontal
                data={activeUsers}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.activeUser}>
                        <Image source={{ uri: item.image }} style={styles.activeImage} />
                    </View>
                )}
                style={styles.activeList}
                showsHorizontalScrollIndicator={false}
            />

            <Text style={styles.sectionTitle}>Mensajes</Text>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.messageItem}>
                        <Image source={{ uri: item.image }} style={styles.messageImage} />
                        <View style={styles.messageInfo}>
                            <Text style={styles.messageName}>{item.name}</Text>
                            <Text style={styles.messageText}>{item.message}</Text>
                        </View>
                        {item.notification > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationText}>{item.notification}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                style={styles.messageList}
            />

            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F9FBFF", // Fondo más claro para un look iOS
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        borderColor: "#4A90E2",
        borderWidth: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#4A90E2",
        marginBottom: 5, // Reducido para acercar más las secciones
        marginTop: 10,
    },
    activeList: {
        marginBottom: 10, // Reducir el espacio debajo de los activos
    },
    activeUser: {
        marginRight: 10,
        alignItems: 'center',
    },
    activeImage: {
        width: 70, // Tamaño mayor para estilo más moderno
        height: 70,
        borderRadius: 35,
        borderColor: "#4A90E2",
        borderWidth: 2,
    },
    messageList: {
        marginTop: -10, // Subir los mensajes debajo de los activos
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    messageImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    messageInfo: {
        flex: 1,
    },
    messageName: {
        fontSize: 16,
        fontWeight: '500',
        color: "#2C3A47",
    },
    messageText: {
        fontSize: 14,
        color: "#8E8E93",
    },
    notificationBadge: {
        backgroundColor: "#1E5AB4", // Rojo al estilo iOS
        width: 25,
        height: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: "#fff",
        fontWeight: 'bold',
    },
    chatButton: {
        backgroundColor: "#4A90E2",
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#004D73",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
});
