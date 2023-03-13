import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removePhoto, updateEmail, UserState } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function GalleryScreen({ navigation}) {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  const photos = user.photos.map((data: string, i: number) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
          <FontAwesome name='times' size={20} color='#000000' style={styles.deleteIcon} />
        </TouchableOpacity>

        <Image source={{ uri: data }} style={styles.photo} />
      </View>
    );
  });

  const handleSignOut = () => {
    dispatch(updateEmail(''));
    navigation.navigate('Home');
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Text style={styles.text}>Logged as: {user.email}</Text>

      <ScrollView contentContainerStyle={styles.galleryContainer}>
        {photos}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Sign out" onPress={() => handleSignOut()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  galleryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  photoContainer: {
    alignItems: 'flex-end',
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: 'Futura',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteIcon: {
    marginRight: 10,
  },
  text: {
    marginBottom: 15,
  },
});
