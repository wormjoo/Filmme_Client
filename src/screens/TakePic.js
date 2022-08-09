import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";

let camera = Camera;

const TakePic = ({ route }) => {
  const { frame } = route.params;

  const devWidth = Dimensions.get("window").width;

  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [flashMode, setFlashMode] = React.useState("off");

  //네컷
  let [count, setCount] = useState(0);
  const [fin, setFin] = React.useState(false);
  const [oneCut, setOneCut] = React.useState(null);
  const [twoCut, setTwoCut] = React.useState(null);
  const [threeCut, setThreeCut] = React.useState(null);
  const [fourCut, setFourCut] = React.useState(null);

  const __startCamera = async () => {
    //setStartCamera(true)
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    console.log("포토", photo);
    setPreviewVisible(true);
    //setStartCamera(false)
    setCapturedImage(photo);
    setCount(++count);
    console.log("사진 찍을때 카운트", count);
    //console.log("캡처", capturedImage);
  };
  const __savePhoto = () => {
    if (count === 1) {
      setOneCut(capturedImage);
      console.log("원컷", oneCut);
      setPreviewVisible(false);
      __startCamera();
    } else if (count === 2) {
      setTwoCut(capturedImage);
      console.log(twoCut);
      setPreviewVisible(false);
      __startCamera();
    } else if (count === 3) {
      setThreeCut(capturedImage);
      console.log(threeCut);
      setPreviewVisible(false);
      __startCamera();
    } else {
      setFourCut(capturedImage);
      count = 0;
      setFin(true);
      console.log(fourCut, "카운트", count, "피니시", fin);
    }
  };
  const __retakePicture = () => {
    //console.log('다시찍을때 카운트 전',count);
    setCount(--count);
    //console.log('다시찍을때 카운트 후',count);
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {previewVisible && capturedImage ? (
            //사진 찍은 후 화면
            <CameraPreview
              frame={frame}
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
              fin={fin}
              oneCut={oneCut}
              twoCut={twoCut}
              threeCut={threeCut}
              fourCut={fourCut}
              count={count}
            />
          ) : (
            //카메라 화면
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {count + 1}번째 컷
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "10%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === "off" ? "#000" : "#fff",
                      borderRadius: 100,
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {cameraType === "front" ? "🤳" : "📷"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                    backgroundColor: "rgba(150,150,150,0.5)",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        // 첫 화면(사진 찍기 전)
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", marginTop: 20 }}>
            <Image
              source={frame}
              style={{
                width: devWidth,
                height: devWidth * 1.5,
                backgroundColor: "#f5f5f5",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: devWidth,
              borderRadius: 10,
              backgroundColor: "#E8E8E8",
              //flexDirection: 'row',
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#505050",
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              사진 찍기
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
    </View>
  );
};
export default TakePic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

//사진 찍은 후 화면
const CameraPreview = ({
  frame,
  photo,
  retakePicture,
  savePhoto,
  fin,
  oneCut,
  twoCut,
  threeCut,
  fourCut,
  count,
}) => {
  const navigation = useNavigation();
  //console.log('sdsfds', photo);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {count}번째 컷
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                다시 촬영
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                fin
                  ? () =>
                      navigation.navigate("Photo", {
                        //photo: capturedImage.uri,
                        frame: frame,
                        oneCut: oneCut,
                        twoCut: twoCut,
                        threeCut: threeCut,
                        fourCut,
                        fourCut,
                      })
                  : savePhoto
              }
              style={{
                width: 130,
                height: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                {fin ? "완료하기" : "계속 찍기"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
