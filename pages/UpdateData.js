import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { ref, set, onValue, child, get, getDatabase } from 'firebase/database'
import { useNavigation } from "@react-navigation/native";

export default function UpdateData() {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [todoData, setTodoData] = useState([])

  const UpdateData = () => {
    set(ref(db, 'posts'), {
      title: title,
      body: body,
    });
    setTitle('')
    setBody('')
  }

  useEffect(() => {
    const starCountRef = ref(db, 'Users/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map(key => ({
        Uid: key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  }, [])

  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  });

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => navigation.navigate("Home")}
        style={styles.icon}
        name="chevron-back-outline"
        size={24}
        color="black"
      />
      <Text style={styles.header}>UpdateData</Text>
      {
        todoData.map((item, index) => {
          return(
            <View key={index}>
              <Text style={styles.icon}>{item.Uid}</Text>
              <Text style={styles.icon}>{item.email}</Text>
              <Text style={styles.icon}>{item.nome}</Text>
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    marginTop: 40,
    marginLeft: 16,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});