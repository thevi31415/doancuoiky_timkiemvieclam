import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import axios from 'axios';

const UploadCV: React.FC = () => {
  const [file, setFile] = useState<DocumentPickerResponse | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.error('Unknown error: ', err);
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      Alert.alert('Error', 'Please select a file to upload');
      return;
    }

    const formData = new FormData();
    // formData.append('cv', {
    //   uri: file.uri,
    //   type: file.type,
    //   name: file.name,
    // });

    try {
      const response = await axios.post('https://yourapiendpoint.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully!');
      console.log('Upload Response:', response.data);
    } catch (error) {
      setMessage('Failed to upload file');
      console.error('Upload Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select CV" onPress={handleFilePick} />
      {file && <Text style={styles.fileName}>{file.name}</Text>}
      <Button title="Upload CV" onPress={handleSubmit} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fileName: {
    marginVertical: 8,
    fontSize: 16,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: 'green',
  },
});

export default UploadCV;
