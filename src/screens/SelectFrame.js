import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";

const Frames = [
  {
    id: '1',
    frame: require("../../storage/images/photois-red.png"),
    chk: false,
  },
  {
    id: '2',
    frame: require("../../storage/images/photois-orange.png"),
    chk: false,
  },
  {
    id: '3',
    frame: require("../../storage/images/photois-yw.png"),
    chk: false,
  },
  {
    id: '4',
    frame: require("../../storage/images/photois-mint.png"),
    chk: false,
  },
  {
    id: '5',
    frame: require("../../storage/images/photois-skyblue.png"),
    chk: false,
  },
  {
    id: '6',
    frame: require("../../storage/images/photois-blue.png"),
    chk: false,
  },
];

const Item = ({ frame, chk }) => {

  const [check, setCheck] = useState(chk);
  const navigation = useNavigation();

  return (
    <View style={{ margin: 10 }}>
      <ImageBackground source={frame} style={styles.frame}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TakePic", {
            frame: frame
          })}
          style={styles.chkIcon}>
          <AntDesign
            name={check ? "checkcircle" : "checkcircleo"}
            style={{ fontSize: 25, color: "#505050", }} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
};

const devWidth = Dimensions.get("window").width;

export default function SelectFrame() {

  const renderItem = ({ item }) => (
    <Item frame={item.frame} chk={item.chk} />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>프레임 선택</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={Frames}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          // renderItem={({ item }) => (
          //   <View style={{ margin: 10 }}>
          //     <ImageBackground source={item.frame} style={styles.frame}>
          //       <TouchableOpacity 
          //         style={{ alignItems: 'flex-end', padding: 5 }}
          //         onPress={()=> {item.chk=!item.chk; console.log(item.chk)}}>
          //         <AntDesign 
          //           name={ item.chk ? "checkcircle" : "checkcircleo"} 
          //           style={styles.chkIcon} />
          //       </TouchableOpacity>
          //     </ImageBackground>
          //   </View>
          // )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
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
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    marginBottom: 65,
  },
  frame: {
    width: 180,
    height: 270,
  },
  chkIcon: {
    margin: 5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(200,200,200,0.85)",
    borderRadius: 100,
  },
});