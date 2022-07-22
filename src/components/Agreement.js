import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const Agreement = () => {

    const checkInfo = [
        {
            title: '(필수) 만14세 이상입니다.',
            isChecked: false
        },
        {
            title: '(필수) 개인정보 수집이용에 동의',
            isChecked: false
        },
        {
            title: '(필수) 서비스 이용약관에 동의',
            isChecked: false
        },
        {
            title: '(선택) 홍보 및 마케팅 이용에 동의',
            isChecked: false
        },
        {
            title: '(선택) 마케팅 개인정보 제3자 제공 동의',
            isChecked: false
        },
    ];

    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={{ marginBottom: 20 }}>
            <View style={{
                flexDirection: 'row',
                paddingBottom: 15,
                borderBottomColor: '#E8E8E8',
                borderBottomWidth: 2,
                width: '100%',
            }}>
                <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Ionic name='ios-checkmark-circle-sharp'
                        style={{
                            color: isChecked ? '#505050' : '#D9D9D9',
                            fontSize: 20,
                            paddingRight: 7
                        }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 17 }}>약관 전체동의</Text>
            </View>

            {
                checkInfo.map((data, index) => {

                    return (
                        <View key={index}>

                            <View style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>

                                        <Ionic name='ios-checkmark-circle-sharp'
                                            style={{
                                                color: isChecked ? '#505050' : '#D9D9D9',
                                                fontSize: 20,
                                                paddingRight: 7
                                            }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 15 }}> {data.title} </Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 13, opacity: 0.7, textAlign: 'right', paddingRight: 10
                                    }}>
                                        보기
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                })
            }
        </View>
    );
};

export default Agreement;