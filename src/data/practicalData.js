// practicalData.js - Contains complete metadata, algorithms, instructions, and copyable code for all 8 practicals

export const PRACTICALS = [
  {
    id: 1,
    title: 'Weather App',
    category: 'API & Async',
    projectName: 'WeatherApp',
    aim: 'To build an app that shows the current temperature and wind speed of a city using the free Open-Meteo API.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd WeatherApp
npm run reset-project
npx expo start`,
    step2: 'None needed.',
    algorithm: [
      'Import the hook and components: useState from "react", View, Text, TextInput, Button from "react-native".',
      'Create the component: export default function Index() { ... }',
      'Create state variables: city (string), weather (any | null), message (string).',
      'Create the function const getWeather = async () => { ... }',
      'Inside it, if the city box is empty, show "Please enter a city" and return.',
      'Wrap remaining steps in try { ... } catch { setMessage("Network error"); }',
      'Call geocoding API: https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1',
      'If (!geo.results), show "City not found" and return.',
      'Take the first result: const place = geo.results[0];',
      'Call the forecast API with latitude and longitude: https://api.open-meteo.com/v1/forecast?latitude=...&current_weather=true',
      'Store city name, temperature and wind speed: setWeather({ name: place.name, temp: w.current_weather.temperature, wind: w.current_weather.windspeed });',
      'Clear the message: setMessage("");',
      'In return, display heading Text, TextInput, Button ("Get Weather"), Text ({message}), and weather card with name, temp, wind.'
    ],
    sampleOutput: 'Typing "Nagpur" and pressing the button shows the temperature in °C and the wind speed in km/h.',
    testInputs: [
      { name: 'Nagpur', note: 'Manual sample' },
      { name: 'Mumbai', note: 'Coastal weather' },
      { name: 'Delhi', note: 'North India' },
      { name: 'London', note: 'International' },
      { name: 'Tokyo', note: 'East Asia' }
    ],
    code: `import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Index() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [message, setMessage] = useState('');

  const getWeather = async () => {
    if (city === '') {
      setMessage('Please enter a city');
      return;
    }
    try {
      const geo = await (await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + city + '&count=1')).json();
      if (!geo.results) {
        setMessage('City not found');
        return;
      }
      const place = geo.results[0];
      const w = await (await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + place.latitude + '&longitude=' + place.longitude + '&current_weather=true')).json();
      setWeather({
        name: place.name,
        temp: w.current_weather.temperature,
        wind: w.current_weather.windspeed
      });
      setMessage('');
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather App</Text>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        style={styles.input}
      />
      <Button title="Get Weather" onPress={getWeather} />
      <Text style={styles.message}>{message}</Text>
      {weather && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>City: {weather.name}</Text>
          <Text style={styles.resultText}>Temperature: {weather.temp} °C</Text>
          <Text style={styles.resultText}>Wind Speed: {weather.wind} km/h</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 },
  message: { color: 'red', marginTop: 10, textAlign: 'center' },
  resultBox: { marginTop: 20, padding: 15, backgroundColor: '#f0f4f8', borderRadius: 8 },
  resultTitle: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  resultText: { fontSize: 16, marginVertical: 3 }
});`
  },
  {
    id: 2,
    title: 'Calculator App',
    category: 'Math & State',
    projectName: 'CalculatorApp',
    aim: "To build a calculator that adds, subtracts, multiplies and divides two numbers using the phone's number keypad.",
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd CalculatorApp
npm run reset-project
npx expo start`,
    step2: 'None needed.',
    algorithm: [
      'Import useState from "react", View, Text, TextInput, Button from "react-native".',
      'Create component: export default function Index()',
      'Create state variables: const [num1, setNum1] = useState(""), [num2, setNum2] = useState(""), [result, setResult] = useState("").',
      'Create calculate function: const calculate = (op: string) => { ... }',
      'Convert typed text to numbers: const a = parseFloat(num1); const b = parseFloat(num2);',
      'Check if either value is not a number: if (isNaN(a) || isNaN(b)) { setResult("Enter both numbers"); return; }',
      'Perform calculation according to op: + (a+b), - (a-b), * (a*b).',
      'For division (/), check for zero first: if (op === "/") setResult(b === 0 ? "Cannot divide by 0" : String(a / b));',
      'In return, display two TextInput boxes with keyboardType="numeric".',
      'Display four buttons for +, -, x (calls calculate("*")), and /.',
      'Display result: <Text>Result: {result}</Text>'
    ],
    sampleOutput: 'Entering 12 and 8 and pressing x shows Result: 96.',
    testInputs: [
      { a: '12', b: '8', op: 'x', exp: '96' },
      { a: '50', b: '25', op: '+', exp: '75' },
      { a: '100', b: '30', op: '-', exp: '70' },
      { a: '15', b: '0', op: '/', exp: 'Cannot divide by 0' }
    ],
    code: `import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Index() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const calculate = (op: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult('Enter both numbers');
      return;
    }
    if (op === '+') setResult(String(a + b));
    if (op === '-') setResult(String(a - b));
    if (op === '*') setResult(String(a * b));
    if (op === '/') setResult(b === 0 ? 'Cannot divide by 0' : String(a / b));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calculator App</Text>
      <TextInput
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
        placeholder="First number"
        style={styles.input}
      />
      <TextInput
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
        placeholder="Second number"
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <Button title="+" onPress={() => calculate('+')} />
        <Button title="-" onPress={() => calculate('-')} />
        <Button title="x" onPress={() => calculate('*')} />
        <Button title="/" onPress={() => calculate('/')} />
      </View>
      <Text style={styles.result}>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 },
  result: { fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }
});`
  },
  {
    id: 3,
    title: 'Todo App',
    category: 'State & Lists',
    projectName: 'TodoApp',
    aim: 'To build a todo app where tasks can be added, marked as done and deleted.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd TodoApp
npm run reset-project
npx expo start`,
    step2: 'None needed.',
    algorithm: [
      'Import useState from "react", View, Text, TextInput, Button, FlatList, TouchableOpacity from "react-native".',
      'Create component: export default function Index()',
      'Create state variables: task (string), todos ({ id: string, text: string, done: boolean }[]).',
      'ADD: const addTodo = () => { if (task === "") return; setTodos([...todos, { id: Date.now().toString(), text: task, done: false }]); setTask(""); };',
      'DONE: const toggleTodo = (id: string) => { setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t)); };',
      'DELETE: const deleteTodo = (id: string) => { setTodos(todos.filter(t => t.id !== id)); };',
      'In return: TextInput for task, Button "Add" calling addTodo.',
      'Display list with FlatList data={todos} keyExtractor={item => item.id}.',
      'Inside renderItem, wrap task text in TouchableOpacity calling toggleTodo(item.id) with textDecorationLine: item.done ? "line-through" : "none".',
      'Beside each task add Delete button calling deleteTodo(item.id).'
    ],
    sampleOutput: 'Tasks can be added, tapped to cross out, and deleted.',
    testInputs: [
      { text: 'Complete React Native Lab Record', done: false },
      { text: 'Verify Expo SDK 54 dependencies', done: true },
      { text: 'Submit assignment on Google Classroom', done: false }
    ],
    code: `import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{ id: string; text: string; done: boolean }[]>([]);

  const addTodo = () => {
    if (task === '') return;
    setTodos([...todos, { id: Date.now().toString(), text: task, done: false }]);
    setTask('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Enter task"
          style={styles.input}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.todoText, { textDecorationLine: item.done ? 'line-through' : 'none' }]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => deleteTodo(item.id)} color="#e11d48" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  todoItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  todoText: { fontSize: 16 }
});`
  },
  {
    id: 4,
    title: 'Camera and Image Picker',
    category: 'Hardware & Media',
    projectName: 'CameraApp',
    aim: 'To take a photo with the camera or choose one from the gallery and display it on the screen.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd CameraApp
npm run reset-project
npx expo start`,
    step2: `npx expo install expo-image-picker`,
    algorithm: [
      'Import useState from "react", View, Text, Button, Image, Alert from "react-native", and * as ImagePicker from "expo-image-picker".',
      'Create component: export default function Index()',
      'Create state: const [image, setImage] = useState<string | null>(null);',
      'GALLERY: const pickImage = async () => { const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsEditing: true, quality: 1 }); if (!result.canceled) setImage(result.assets[0].uri); };',
      'CAMERA: const takePhoto = async () => { const perm = await ImagePicker.requestCameraPermissionsAsync(); if (!perm.granted) { Alert.alert("Camera permission required"); return; } const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 }); if (!result.canceled) setImage(result.assets[0].uri); };',
      'In return, display two buttons: "Choose from Gallery" and "Take a Photo".',
      'Display the photo only when chosen: {image && <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}'
    ],
    sampleOutput: 'The chosen or captured photo appears below the buttons. Test the camera on a real phone, because emulator cameras are limited.',
    testInputs: [],
    code: `import { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Camera permission required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Camera & Image Picker</Text>
      <View style={styles.buttonContainer}>
        <Button title="Choose from Gallery" onPress={pickImage} />
        <View style={{ height: 10 }} />
        <Button title="Take a Photo" onPress={takePhoto} />
      </View>
      {image && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 12 }} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  buttonContainer: { width: '80%', marginBottom: 20 },
  imagePreview: { marginTop: 10, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 16 }
});`
  },
  {
    id: 5,
    title: 'Product List with Add to Cart',
    category: 'E-Commerce & REST',
    projectName: 'CartApp',
    aim: 'To fetch a product list from the DummyJSON API, add products to a cart, remove them, and show the total price.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd CartApp
npm run reset-project
npx expo start`,
    step2: 'None needed.',
    algorithm: [
      'Import useState, useEffect from "react", View, Text, Button, FlatList, Image from "react-native".',
      'Create component: export default function Index()',
      'Create state variables: products ([]), cart ([]), screen ("products").',
      'Fetch products once when app starts: useEffect(() => { fetch("https://dummyjson.com/products").then(r => r.json()).then(j => setProducts(j.products)); }, []);',
      'ADD TO CART: const addToCart = (item: any) => { setCart([...cart, item]); };',
      'REMOVE: const removeFromCart = (index: number) => { setCart(cart.filter((_, i) => i !== index)); };',
      'TOTAL: const total = cart.reduce((sum, p) => sum + p.price, 0);',
      'In return, display two buttons to switch screens: "Products" and "Cart (" + cart.length + ")".',
      'If screen === "products", show FlatList of products (thumbnail, title, price, "Add to Cart" button).',
      'Otherwise show FlatList of cart items (title, price, "Remove" button) and at bottom: <Text>Total: {total}</Text>.'
    ],
    sampleOutput: 'The product list loads, the cart count increases when Add to Cart is pressed, and the cart screen shows the items and the total.',
    testInputs: [],
    code: `import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [screen, setScreen] = useState('products');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(r => r.json())
      .then(j => setProducts(j.products));
  }, []);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Products" onPress={() => setScreen('products')} />
        <Button title={'Cart (' + cart.length + ')'} onPress={() => setScreen('cart')} />
      </View>

      {screen === 'products' ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 60, height: 60, borderRadius: 6 }} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>Price: $\${item.price}</Text>
              </View>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cart}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.cartItem}>
                <View>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>Price: $\${item.price}</Text>
                </View>
                <Button title="Remove" onPress={() => removeFromCart(index)} color="#e11d48" />
              </View>
            )}
          />
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total: $\${total}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  productCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', gap: 12 },
  productInfo: { flex: 1 },
  productTitle: { fontWeight: '600', fontSize: 15 },
  productPrice: { color: '#059669', marginTop: 4 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  totalBox: { padding: 16, backgroundColor: '#f1f5f9', borderRadius: 8, marginTop: 10, alignItems: 'center' },
  totalText: { fontSize: 18, fontWeight: 'bold' }
});`
  },
  {
    id: 6,
    title: 'Lost and Found (CRUD with Supabase)',
    category: 'Cloud Database',
    projectName: 'LostFoundApp',
    aim: 'To build a basic Lost and Found app that can Create, Read, Update and Delete items stored in a Supabase database.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd LostFoundApp
npm run reset-project
npx expo start`,
    step2: `npx expo install @supabase/supabase-js react-native-url-polyfill`,
    step3Sql: `create table items (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  type text not null,
  place text,
  phone text
);
alter table items enable row level security;
create policy "public access" on items for all using (true) with check (true);`,
    step4File: `import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('YOUR_PROJECT_URL', 'YOUR_PUBLISHABLE_KEY');`,
    algorithm: [
      'Import hooks & components: useState, useEffect from "react", View, Text, TextInput, Button, FlatList, Alert from "react-native", and { supabase } from "../lib/supabase".',
      'Create component: export default function Index()',
      'Create state variables: items, title, description, place, phone, type ("Lost"), editId (null).',
      'READ: const loadItems = async () => { const { data } = await supabase.from("items").select("*").order("id", { ascending: false }); setItems(data || []); };',
      'Load items on mount: useEffect(() => { loadItems(); }, []);',
      'CREATE & UPDATE: const saveItem = async () => { if (title === "") return; const row = { title, description, type, place, phone }; if (editId === null) await supabase.from("items").insert(row); else await supabase.from("items").update(row).eq("id", editId); clear form; loadItems(); };',
      'EDIT: const editItem = (item) => { populate form fields and remember setEditId(item.id); };',
      'DELETE: const deleteItem = async (id) => { await supabase.from("items").delete().eq("id", id); loadItems(); };',
      'In return: Two buttons for Lost & Found type selection, Text "Selected: {type}", 4 TextInputs for title, description, place, phone (keyboardType="phone-pad"), and save button.',
      'Display FlatList with item details, plus Edit and Delete buttons.'
    ],
    sampleOutput: 'An item can be added, edited and deleted in the app. Open Table Editor -> items in the Supabase dashboard to see the rows change.',
    testInputs: [
      { title: 'Scientific Calculator', type: 'Lost', place: 'Lab 1', phone: '9876543210' },
      { title: 'College ID Card', type: 'Found', place: 'Canteen', phone: '9988776655' }
    ],
    code: `import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Lost');
  const [editId, setEditId] = useState<number | null>(null);

  const loadItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('id', { ascending: false });
    if (error) Alert.alert('Error', error.message);
    setItems(data || []);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const saveItem = async () => {
    if (title === '') return;
    const row = { title, description, type, place, phone };
    if (editId === null) {
      const { error } = await supabase.from('items').insert(row);
      if (error) Alert.alert('Error', error.message);
    } else {
      const { error } = await supabase.from('items').update(row).eq('id', editId);
      if (error) Alert.alert('Error', error.message);
    }
    setTitle('');
    setDescription('');
    setPlace('');
    setPhone('');
    setType('Lost');
    setEditId(null);
    loadItems();
  };

  const editItem = (item: any) => {
    setTitle(item.title);
    setDescription(item.description);
    setType(item.type);
    setPlace(item.place);
    setPhone(item.phone);
    setEditId(item.id);
  };

  const deleteItem = async (id: number) => {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) Alert.alert('Error', error.message);
    loadItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lost and Found</Text>
      
      {/* Type Selector Buttons */}
      <View style={styles.typeRow}>
        <Button title="Lost" onPress={() => setType('Lost')} />
        <Button title="Found" onPress={() => setType('Found')} />
      </View>
      <Text style={styles.selectedType}>Selected: {type}</Text>

      {/* Input Form */}
      <TextInput value={title} onChangeText={setTitle} placeholder="Title" style={styles.input} />
      <TextInput value={description} onChangeText={setDescription} placeholder="Description" style={styles.input} />
      <TextInput value={place} onChangeText={setPlace} placeholder="Place" style={styles.input} />
      <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone" style={styles.input} />

      <Button title={editId === null ? 'Add Item' : 'Update Item'} onPress={saveItem} />

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>[{item.type}] {item.title}</Text>
            <Text style={styles.itemDetails}>{item.description}</Text>
            <Text style={styles.itemDetails}>Place: {item.place} | Phone: {item.phone}</Text>
            <View style={styles.itemButtons}>
              <Button title="Edit" onPress={() => editItem(item)} />
              <Button title="Delete" onPress={() => deleteItem(item.id)} color="#e11d48" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  typeRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 8 },
  selectedType: { textAlign: 'center', fontWeight: '600', marginBottom: 12, color: '#4f46e5' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 8 },
  itemCard: { padding: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, marginBottom: 10, backgroundColor: '#f8fafc' },
  itemTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  itemDetails: { fontSize: 13, color: '#475569', marginBottom: 2 },
  itemButtons: { flexDirection: 'row', gap: 10, marginTop: 8 }
});`
  },
  {
    id: 7,
    title: 'Login and Signup (Supabase Authentication)',
    category: 'Cloud Auth',
    projectName: 'LoginApp',
    aim: 'To build an app where a user can sign up, log in and log out using email and password with Supabase Authentication.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd LoginApp
npm run reset-project
npx expo start`,
    step2: `npx expo install @supabase/supabase-js react-native-url-polyfill @react-native-async-storage/async-storage`,
    step3Settings: 'Go to Authentication -> Sign In / Providers -> Email and switch off "Confirm email" (for testing). Then copy Project URL & publishable key.',
    step4File: `import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('YOUR_PROJECT_URL', 'YOUR_PUBLISHABLE_KEY', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
});`,
    algorithm: [
      'Import useState, useEffect from "react", View, Text, TextInput, Button, Alert from "react-native", and { supabase } from "../lib/supabase".',
      'Create component: export default function Index()',
      'Create state variables: email, password, session.',
      'Check saved login on start: useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)); const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s)); return () => listener.subscription.unsubscribe(); }, []);',
      'SIGNUP: const signUp = async () => { if (email === "" || password === "") { Alert.alert("Enter email and password"); return; } const { error } = await supabase.auth.signUp({ email, password }); if (error) Alert.alert("Signup failed", error.message); };',
      'LOGIN: const signIn = async () => { if (email === "" || password === "") { Alert.alert("Enter email and password"); return; } const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) Alert.alert("Login failed", error.message); };',
      'LOGOUT: const signOut = async () => { await supabase.auth.signOut(); };',
      'If user is logged in (session), show welcome screen: <Text>Welcome!</Text>, <Text>Logged in as {session.user.email}</Text>, <Button title="Logout" onPress={signOut} />.',
      'Otherwise, show login form: TextInput email, TextInput password (secureTextEntry), Button "Login", Button "Create account".'
    ],
    sampleOutput: 'After signing up, the Welcome screen shows the logged-in email. Open Authentication -> Users in Supabase dashboard to see the new user. Close the app and reopen it: the user is still logged in.',
    testInputs: [
      { email: 'student@example.com', password: 'password123' },
      { email: 'test.user@college.edu', password: 'securePass12' }
    ],
    code: `import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = async () => {
    if (email === '' || password === '') {
      Alert.alert('Enter email and password');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Signup failed', error.message);
  };

  const signIn = async () => {
    if (email === '' || password === '') {
      Alert.alert('Enter email and password');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Login failed', error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (session) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeText}>Logged in as {session.user.email}</Text>
        <View style={{ marginTop: 20 }}>
          <Button title="Logout" onPress={signOut} color="#e11d48" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login & Signup</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        style={styles.input}
      />
      <View style={styles.buttonStack}>
        <Button title="Login" onPress={signIn} />
        <View style={{ height: 10 }} />
        <Button title="Create account" onPress={signUp} color="#4f46e5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  welcomeTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  welcomeText: { fontSize: 16, color: '#475569', textAlign: 'center', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', padding: 12, borderRadius: 8, marginBottom: 12 },
  buttonStack: { marginTop: 10 }
});`
  },
  {
    id: 8,
    title: 'Student Management System (CRUD with Supabase)',
    category: 'Analytics & CRUD',
    projectName: 'StudentApp',
    aim: 'To build an app that can Create, Read, Update and Delete student records in Supabase, with a search by name and a summary of the total students and average marks.',
    step1: `npx.cmd create-expo-app@latest --template default@sdk-54
cd StudentApp
npm run reset-project
npx expo start`,
    step2: `npx expo install @supabase/supabase-js react-native-url-polyfill`,
    step3Sql: `create table students (
  id bigint generated always as identity primary key,
  name text not null,
  roll_no text not null,
  course text,
  marks numeric
);
alter table students enable row level security;
create policy "public access" on students for all using (true) with check (true);`,
    step4File: `import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('YOUR_PROJECT_URL', 'YOUR_PUBLISHABLE_KEY');`,
    algorithm: [
      'Import useState, useEffect from "react", View, Text, TextInput, Button, FlatList, Alert from "react-native", and { supabase } from "../lib/supabase".',
      'Create component: export default function Index()',
      'Create state variables: students ([]), name, rollNo, course, marks, search, editId (null).',
      'READ: const loadStudents = async () => { const { data, error } = await supabase.from("students").select("*").order("id", { ascending: false }); if (error) Alert.alert("Error", error.message); setStudents(data || []); };',
      'Load students on start: useEffect(() => { loadStudents(); }, []);',
      'CREATE & UPDATE: const saveStudent = async () => { if (name === "" || rollNo === "") { Alert.alert("Name and Roll No required"); return; } if (isNaN(parseFloat(marks))) { Alert.alert("Enter marks as a number"); return; } const row = { name, roll_no: rollNo, course, marks: parseFloat(marks) }; if (editId === null) await supabase.from("students").insert(row); else await supabase.from("students").update(row).eq("id", editId); clear form; loadStudents(); };',
      'EDIT: const editStudent = (s) => { populate form with s.name, s.roll_no, s.course, s.marks; setEditId(s.id); };',
      'DELETE: const deleteStudent = async (id) => { await supabase.from("students").delete().eq("id", id); loadStudents(); };',
      'SEARCH: const shown = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));',
      'SUMMARY: const average = students.length === 0 ? 0 : students.reduce((sum, s) => sum + Number(s.marks), 0) / students.length;',
      'In return: summary bar showing Total students: {students.length} | Average marks: {average.toFixed(1)}, 4 TextInputs (name, roll_no, course, marks numeric), save button, search TextInput, and FlatList with {shown} having Edit & Delete buttons.'
    ],
    sampleOutput: 'A student can be added, edited and deleted. The search box filters the list, and the top line shows the total students and the average marks. Open Table Editor -> students in Supabase to see the rows.',
    testInputs: [
      { name: 'Pooja Hegde', roll_no: 'CS-2024-21', course: 'Computer Science', marks: '91' },
      { name: 'Vikram Singh', roll_no: 'CS-2024-22', course: 'Data Science', marks: '78.5' }
    ],
    code: `import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [course, setCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const loadStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: false });
    if (error) Alert.alert('Error', error.message);
    setStudents(data || []);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const saveStudent = async () => {
    if (name === '' || rollNo === '') {
      Alert.alert('Please fill name and roll number');
      return;
    }
    if (isNaN(parseFloat(marks))) {
      Alert.alert('Enter marks as a number');
      return;
    }
    const row = { name, roll_no: rollNo, course, marks: parseFloat(marks) };
    if (editId === null) {
      const { error } = await supabase.from('students').insert(row);
      if (error) Alert.alert('Error', error.message);
    } else {
      const { error } = await supabase.from('students').update(row).eq('id', editId);
      if (error) Alert.alert('Error', error.message);
    }
    setName('');
    setRollNo('');
    setCourse('');
    setMarks('');
    setEditId(null);
    loadStudents();
  };

  const editStudent = (s: any) => {
    setName(s.name);
    setRollNo(s.roll_no);
    setCourse(s.course || '');
    setMarks(String(s.marks));
    setEditId(s.id);
  };

  const deleteStudent = async (id: number) => {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) Alert.alert('Error', error.message);
    loadStudents();
  };

  const shown = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const average =
    students.length === 0
      ? 0
      : students.reduce((sum, s) => sum + Number(s.marks), 0) / students.length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Management</Text>
      
      {/* Summary Banner */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>
          Total students: {students.length} | Average marks: {average.toFixed(1)}
        </Text>
      </View>

      {/* Form Fields */}
      <TextInput value={name} onChangeText={setName} placeholder="Student Name" style={styles.input} />
      <TextInput value={rollNo} onChangeText={setRollNo} placeholder="Roll Number" style={styles.input} />
      <TextInput value={course} onChangeText={setCourse} placeholder="Course" style={styles.input} />
      <TextInput value={marks} onChangeText={setMarks} keyboardType="numeric" placeholder="Marks" style={styles.input} />

      <Button
        title={editId === null ? 'Add Student' : 'Update Student'}
        onPress={saveStudent}
      />

      {/* Search Bar */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name"
        style={[styles.input, styles.searchInput]}
      />

      {/* Student List */}
      <FlatList
        data={shown}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>{item.name} ({item.roll_no})</Text>
              <Text style={styles.studentDetails}>Course: {item.course || 'N/A'}</Text>
              <Text style={styles.studentMarks}>Marks: {item.marks}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => editStudent(item)} />
              <Button title="Delete" onPress={() => deleteStudent(item.id)} color="#e11d48" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  summaryBar: { padding: 10, backgroundColor: '#e0e7ff', borderRadius: 8, marginBottom: 12 },
  summaryText: { textAlign: 'center', fontWeight: 'bold', color: '#3730a3', fontSize: 14 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, marginBottom: 8 },
  searchInput: { marginTop: 12, backgroundColor: '#f1f5f9', borderColor: '#94a3b8' },
  studentCard: { flexDirection: 'row', padding: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, marginBottom: 8, backgroundColor: '#fff', alignItems: 'center' },
  studentName: { fontSize: 15, fontWeight: 'bold' },
  studentDetails: { fontSize: 13, color: '#64748b', marginTop: 2 },
  studentMarks: { fontSize: 13, fontWeight: '600', color: '#059669', marginTop: 2 },
  actions: { flexDirection: 'row', gap: 6 }
});`
  }
];

export const COMMON_TROUBLESHOOTING = [
  {
    title: 'npx is blocked in PowerShell',
    solution: 'Use npx.cmd instead of npx (e.g. npx.cmd create-expo-app@latest ...). In PowerShell, script execution policies can block npx.ps1, but npx.cmd bypasses this safely.'
  },
  {
    title: 'Template command gives an error',
    solution: 'Run the alternative command: npx create-expo-app@latest --template default@sdk-54 (or npx.cmd ...). Also make sure you type the project name when prompted.'
  },
  {
    title: 'Expo Go says the project is incompatible',
    solution: 'Update the Expo Go app from Google Play Store or Apple App Store. The practical manual requires SDK 54 support.'
  },
  {
    title: 'Red error after installing a package',
    solution: 'Stop the Expo server with Ctrl+C, then restart with clear cache: npx expo start -c. If phone cannot connect on same Wi-Fi, use npx expo start --tunnel.'
  },
  {
    title: 'Supabase list stays empty',
    solution: 'Check that Project URL and Publishable Key (sb_publishable_...) are correct. In Supabase SQL Editor, verify that the table creation SQL and RLS policy (create policy "public access" on ... for all using (true) with check (true);) ran without errors.'
  }
];
