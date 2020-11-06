import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import {RNCamera} from 'react-native-camera';

const LoaderView = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator />
  </View>
);
export default function App() {
  const [image, setImage] = useState(null);

  const takePicture = async (camera:RNCamera) => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.preview}>
          <Text style={styles.title}>Your Profile Picture</Text>
          <Image
            source={{uri: image, width: '100%', height: '80%'}}
            style={styles.clickedPicture}
          />
          <Button
            title="Tirar Foto Novamente"
            onPress={() => setImage(null)}></Button>
        </View>
      ) : (
        <RNCamera
          style={styles.captureWindow}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
         /*  androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }} */>
          {({camera, status}) => {
            if (status !== 'READY') {
              return <LoaderView />;
            }
            return (
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  style={styles.capture}
                  onPress={() => takePicture(camera)}>
                  <Text>SNAP</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b09f1',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  captureWindow: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'white',
    padding: 20,
    alignSelf: 'center',
    borderRadius: 150,
  },
  title: {
    backgroundColor: '#4c06f0',
    color: 'white',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25,
  },
  clickedPicture: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});
