import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Detail_PhotoStory({ route, navigation }) {

  const date = '2022.07.26';
  const { img } = route.params;
  const memo = '메모입니당';

  const devWidth = Dimensions.get("window").width;
  const devHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{date}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <FontAwesome name='pencil' style={{ fontSize: 22, marginRight: 15, color: "#505050" }} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ImageBackground
          source={require("../../storage/images/detail-photoStory.png")}
          style={{ height: devHeight - 60, width: devWidth - 30, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={img} style={styles.img} />
          <View style={{ height: 70 }}></View>
          <Text>{memo}</Text>
        </ImageBackground>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 150,
    height: 380,
  },
});
