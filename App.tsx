import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

function App(): React.JSX.Element {
  const [headers, setHeaders] = useState({});
  const sendRequest = async () => {
    setHeaders({});
    try {
      const response = await fetch('https://ksk.by?route=api/fake');
      const json = await response.json();

      if (json?.success?.headers) {
        setHeaders(json.success.headers);
      }
      console.log(json.success.headers);
    } catch (e) {
      Alert.alert('Не удалось выполнить запрос');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable style={styles.button} onPress={sendRequest}>
          <Text style={styles.text}>Отправить запрос</Text>
        </Pressable>
      </View>
      <View style={styles.response}>
        {headers && (
          <FlatList
            data={Object.entries(headers)}
            renderItem={({item}) => (
              <Text style={styles.header}>{item.join(': ')}</Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
    marginTop: 30,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  response: {
    width: '100%',
    marginVertical: 30,
    paddingHorizontal: 30,
  },
  header: {
    marginTop: 10,
  },
});

export default App;
