import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString().substring(0, 10);

  const addTodo = async () => {
    if (text == "") return;

    const { error } = await supabase.from("todos").insert({ title: text });

    if (error) {
      console.error(error);
      return;
    }

    setText("");
    getTodos();
  };

  const removeTodo = async (item) => {
    const { error } = await supabase
      .from("dones")
      .insert({ title: item.title, completed: item.completed });

    if (error) {
      console.error(error);
      return;
    }

    const response = await supabase.from("todos").delete().eq("id", item.id);
    console.log(`Delete Todo: ${item.title}`);

    getTodos();
  };

  const updateStatus = async (item) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      console.error(error);
      return;
    }

    getTodos();
  };

  const getTodos = async () => {
    try {
      const { data: todos, error } = await supabase.from("todos").select("*");

      if (error) {
        console.error("Error fetching todos:", error.message);
        return;
      }

      todos.forEach((item) => {
        const { created_at } = item;
        const createDate = created_at.substring(0, 10);

        if (createDate !== today) {
          removeTodo(item);
        }
      });

      if (todos && todos.length > 0) {
        setTodos(todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.completed ? (
            <TouchableOpacity
              style={styles.todo}
              onPress={() => updateStatus(item)}
            >
              <Text style={styles.completed} key={item.id}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.todo}
              onPress={() => updateStatus(item)}
            >
              <Text key={item.id}>{item.title}</Text>
            </TouchableOpacity>
          )
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  todo: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  completed: {
    textDecorationLine: "line-through",
  },
});
