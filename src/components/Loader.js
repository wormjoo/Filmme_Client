import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, ActivityIndicator, ScrollView } from 'react-native';

const Loader = ({visible=false}) => {
    const {height,width} = useWindowDimensions();

    return (
        visible && (
        <View style={[style.container, {height,width} ]}>
          <View style={style.loader}>
            <ActivityIndicator size="large" color={'#C8C8C8'} />
            <Text style={{marginLeft:13, fontSize:14}}>로딩중..</Text>
          </View>
        </View>
        )
    );
};

const style = StyleSheet.create({
    container: {
        flex:1,
        position:'absolute',
        zIndex:10,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center'
    },
    loader: {
        height:70,
        backgroundColor:'#fff',
        marginHorizontal:50,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20,
    },
});

export default Loader;