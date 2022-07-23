import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

const Images = [
  {
    id: '1',
    img: require("../../storage/images/photo-1.png"),
  },
  {
    id: '2',
    img: require("../../storage/images/photo-2.png"),
  },
  {
    id: '3',
    img: require("../../storage/images/photo-3.png"),
  },
  {
    id: '4',
    img: require("../../storage/images/photo-4.png"),
  },
];

const devWidth = Dimensions.get("window").width;

export default function PhotoStory({ navigation }) {

  //사진 있는지 여부
  const [hasImg, setHasImg] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />

      <View style={styles.header}>
        <View style={{ width: 40 }}></View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>포토스토리</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
          <AntDesign name='plussquareo' style={{ fontSize: 22, marginRight: 15 }} />
        </TouchableOpacity>
      </View>

      {hasImg ? (
        <View style={styles.content_hasImg}>
          <FlatList
            data={Images}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={{ margin: 1 }}>
                <Image source={item.img} style={styles.img} />
              </View>
            )}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.content_noImg}>
          <AntDesign name='camerao' style={{ fontSize: 85 }} />
          <Text style={{ fontSize: 22 }}>사진 없음</Text>
        </View>
      )}

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
  content_hasImg: {
    alignItems: 'center',
    marginBottom: 65,
  },
  img: {
    width: devWidth / 3.1,
    height: 150,
  },
  content_noImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});