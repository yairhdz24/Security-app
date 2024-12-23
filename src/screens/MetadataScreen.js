import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const MetadataScreen = () => {
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await extractMetadata(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Error picking image. Please try again.');
    }
    setLoading(false);
  };

  const extractMetadata = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [],
        { exif: true }
      );

      const exif = manipulatedImage.exif;
      
      if (exif) {
        const metadataInfo = {
          Make: exif.Make || 'Unknown',
          Model: exif.Model || 'Unknown',
          DateTime: exif.DateTime || 'Unknown',
          ExposureTime: exif.ExposureTime ? `${exif.ExposureTime} sec` : 'Unknown',
          FNumber: exif.FNumber ? `f/${exif.FNumber}` : 'Unknown',
          ISO: exif.ISO || 'Unknown',
          GPSLatitude: exif.GPSLatitude ? `${exif.GPSLatitude[0]}°${exif.GPSLatitude[1]}'${exif.GPSLatitude[2]}"` : 'Unknown',
          GPSLongitude: exif.GPSLongitude ? `${exif.GPSLongitude[0]}°${exif.GPSLongitude[1]}'${exif.GPSLongitude[2]}"` : 'Unknown',
          ImageWidth: exif.PixelXDimension || 'Unknown',
          ImageHeight: exif.PixelYDimension || 'Unknown',
        };

        setMetadata(metadataInfo);
      } else {
        setMetadata({ error: 'No EXIF metadata found in this image.' });
      }
    } catch (error) {
      console.error('Error extracting metadata:', error);
      setMetadata({ error: 'Error extracting metadata. Please try another image.' });
    }
  };

  return (
    <LinearGradient colors={['#1a1a1a', '#2a2a2a']} style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <FontAwesomeIcon icon={faUpload} size={20} color="#000" />
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <ScrollView style={styles.metadataContainer}>
        {metadata && Object.entries(metadata).map(([key, value]) => (
          <View key={key} style={styles.metadataItem}>
            <Text style={styles.metadataKey}>{key}:</Text>
            <Text style={styles.metadataValue}>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#000',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  metadataContainer: {
    flex: 1,
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  metadataKey: {
    color: '#00ff00',
    fontWeight: 'bold',
  },
  metadataValue: {
    color: '#fff',
  },
});

export default MetadataScreen;

