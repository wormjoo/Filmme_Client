import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';

const Frames = [
  {
    id: '1',
    frame: require("../../storage/images/photois-red.png"),
  },
  {
    id: '2',
    frame: require("../../storage/images/photois-orange.png"),
  },
  {
    id: '3',
    frame: require("../../storage/images/photois-yw.png"),
  },
  {
    id: '4',
    frame: require("../../storage/images/photois-mint.png"),
  },
  {
    id: '5',
    frame: require("../../storage/images/photois-skyblue.png"),
  },
  {
    id: '6',
    frame: require("../../storage/images/photois-blue.png"),
  },
];

const devWidth = Dimensions.get("window").width;

export default function TakePic ({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content'/>

      <View style={styles.header}>
        <View style={{width:40}}></View>
        <Text style={{fontSize:22, fontWeight:'bold'}}>프레임 선택</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <Text style={{fontSize:18, color:'#505050', marginRight:15}}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <FlatList
          data={Frames}
          keyExtractor={(item) => item["id"].toString()}
          renderItem={({ item }) => (
            <View style={{margin:10}}>
              <Image source={item.frame} style={styles.frame}/>
            </View>
          )}
          numColumns={2}
        />
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
      marginBottom: 65,
    },
    frame: {
      width: devWidth/2.2,
      height: 300,
    },
  });