import React, { useState, useRef, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// PermissionsAndroid, Platform
import ViewShot from "react-native-view-shot";
//import * as MediaLibrary from 'expo-media-library';
import Feather from "react-native-vector-icons/Feather";
import { UserContext } from "../contexts/User";
import axios from "axios";
//import RNFetchBlob from 'rn-fetch-blob'

export default function Photo({ route, navigation }) {
  const { frame, oneCut, twoCut, threeCut, fourCut } = route.params;
  console.log("!!!!", frame, oneCut, twoCut, threeCut, fourCut);

  const devWidth = Dimensions.get("window").width;
  const { user, dispatch } = useContext(UserContext);
  const ref = useRef();

  const getPhotoUri = async () => {
    const uri = await ref.current.capture();
    console.log("👂👂 Image saved to", uri);
    return uri;
  };

  //캡처
  const [capImg, setCapImg] = useState(null);

  //   const onCapture = useCallback((uri) => {
  //     console.log("do something with ", uri);
  //     setCapImg(uri);
  //   }, []);

  // 업로드버튼 클릭시
  const uploadButton = useCallback(async () => {
    try {
      const url = await getPhotoUri();
      console.log(url);
      const form = new FormData();
      const filename = url.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;
      let content = " ";
      let date = new Date();

      form.append(
        "date",
        date.getFullYear() +
          "-" +
          (date.getMonth() + 1 > 9
            ? (date.getMonth() + 1).toString()
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9
            ? date.getDate().toString()
            : "0" + date.getDate().toString())
      );
      form.append("content", content);
      form.append("image", { uri: url, name: filename, type });
      console.log(form);

      axios
        .post("http://13.125.249.247/filme/story/", form, {
          headers: {
            "x-access-token": `${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);
          dispatch({
            userIdx: user.userIdx,
            identification: user.identification,
            token: user.token,
          });
          navigation.navigate("PhotoStory");
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          alert("Error", error);
        });
    } catch (e) {
      alert(e);
    } finally {
    }
  }, [ref, user, dispatch]);

  //갤러리 저장
  // const checkPermision = async () => {
  //     if (Platform.OS === 'ios') {
  //         downloadImage()
  //     } else {
  //         try {
  //             const granted = await PermissionsAndroid.request(
  //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //                 {
  //                     title: 'Storage Permission Required',
  //                     message: 'App needs access to your storage to download Photos'
  //                 }
  //             )
  //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //                 console.log('Storage Permission Granted.')
  //                 downloadImage()
  //             } else {
  //                 alert('Storage Permission Not Granted')
  //             }
  //         } catch (error) {

  //         }
  //     }
  // }
  // const downloadImage = () => {
  //     let date = new Date()
  //     let image_URL = IMAGE_PATH
  //     let ext = getExtention(image_URL)
  //     ext = '.' + ext[0]
  //     //
  //     const {config, fs} = RNFetchBlob
  //     let PictureDir = fs.dirs.PictureDir
  //     let options = {
  //         fileCache: true,
  //         addAndroidDownloads: {
  //             useDownloadManager: true,
  //             notification: true,
  //             path: PictureDir + '/image_' +
  //             Math.floor(date.getTime() + date.getSeconds() /2 ) + ext,
  //             description: 'Image'
  //         }
  //     }
  //     config(options)
  //     .fetch('GET', image_URL)
  //     .then(res => {
  //         console.log('res -> ', JSON.stringify(res))
  //         alert('Image Downloaded Successfully!')
  //     })
  // }
  // const getExtention = filename => {
  //     return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
  // }
  //---------------------------------
  // MediaLibrary.requestPermissionsAsync();
  // const [status, requestPermission] = MediaLibrary.usePermissions();
  // const onSave = async () => {
  //     try {
  //         //let uri = await getPhotoUri();
  //         let uri = capImg
  //         console.log('~~',uri);
  //         setFinish(true);
  //         console.log(status);

  //         MediaLibrary.getPermissionsAsync().then((data) => {
  //             MediaLibrary.saveToLibraryAsync(uri);
  //                 console.log("갤러리 저장에 성공함!");
  //             if (data.status === 'granted') {
  //                 MediaLibrary.saveToLibraryAsync(uri);
  //                 console.log("갤러리 저장에 성공함!");
  //             }
  //         });

  //     } catch (err) {
  //         console.log("갤러리에 저장하는데에 실패함!");
  //     }
  // };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={{ color: "gray", margin: 10 }}>
        업로드 버튼을 클릭하면 포토스토리에 업로드됩니다
      </Text>

      <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }}>
        <ImageBackground source={frame} style={{ width: 350, height: 525 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: oneCut.uri }}
              style={{ width: 153, height: 106, top: 40, left: 11 }}
            />
            <Image
              source={{ uri: oneCut.uri }}
              style={{ width: 153, height: 106, top: 56.3, left: 34 }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: twoCut.uri }}
              style={{ width: 153, height: 106, top: 47.3, left: 11 }}
            />
            <Image
              source={{ uri: twoCut.uri }}
              style={{ width: 153, height: 106, top: 63.3, left: 34 }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: threeCut.uri }}
              style={{ width: 153, height: 106, top: 54, left: 11 }}
            />
            <Image
              source={{ uri: threeCut.uri }}
              style={{ width: 153, height: 106, top: 69.8, left: 34 }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: fourCut.uri }}
              style={{ width: 153, height: 106, top: 61, left: 11 }}
            />
            <Image
              source={{ uri: fourCut.uri }}
              style={{ width: 153, height: 106, top: 76.8, left: 34 }}
            />
          </View>
        </ImageBackground>
      </ViewShot>

      <TouchableOpacity
        style={{
          backgroundColor: "#E8E8E8",
          borderRadius: 20,
          width: devWidth - 30,
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
        onPress={uploadButton}
      >
        <Feather
          name="download"
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#505050",
          }}
        />
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#505050",
          }}
        >
          업로드
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
