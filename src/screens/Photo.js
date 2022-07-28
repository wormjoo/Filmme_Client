import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Image, Dimensions } from 'react-native';
import ViewShot from "react-native-view-shot";

export default function Photo({ route }) {
    const { photo, frame } = route.params;
    //const {frame} = route.params.frame;
    //console.log(frame, photo.uri)

    const devWidth = Dimensions.get("window").width;
    const devHeight = Dimensions.get("window").height;

    const ref = useRef();
    const [capImg,setCapImg]=useState(null);

    const onCapture = useCallback(uri => {
        console.log("do something with ", uri);
        setCapImg(uri);
        setCap(true);
    }, []);

    const [cap, setCap] = useState(false);


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            {cap ? (
                <ImageBackground source={{ uri:capImg }} style={{ width: devWidth, height: devHeight }}></ImageBackground>
            ) : (
                <ViewShot onCapture={onCapture} captureMode="mount">
                    <ImageBackground source={frame} style={{ width: devWidth, height: devHeight - 160 }}>
                        <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />
                    </ImageBackground>
                </ViewShot>
            )}


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
