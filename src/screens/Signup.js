import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Keyboard, Alert, ScrollView } from 'react-native';
import Input from '../components/Input';
import Loader from '../components/Loader';
import Agreement from '../components/Agreement';

export default function Signup({ navigation }) {

    const [inputs, setInputs] = React.useState({
        id: "",
        password: "",
        phoneNumber: "",
        nicknickname: "",
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        if (errorMessage == '사용가능한 아이디입니다.') {
            if (inputs.id && inputs.password && inputs.phoneNumber && inputs.nickname) {
                setDisabled();
            }
        }
    }, [errorMessage, inputs]);

    const validateIdDuplicate = useCallback(async () => {
        try {
            axios({
                method: 'get',
                url: `http://133.186.228.218:8080/users/idCheck?id=${inputs.id}`,
            })
                .then(function (response) {
                    setErrorMessage('사용 가능한 아이디입니다.')
                })
                .catch(function (error) {
                    setErrorMessage('중복된 아이디입니다.')
                });
        } catch (e) {
        } finally {

        }
    }, [inputs, errorMessage]);

    const validate = () => {
        Keyboard.dismiss();

        let valid = true;
        if (!inputs.id) {
            handleError("아이디를 입력해주세요!", "id");
            valid = false; 
        } else if (inputs.id.length > 20) {
            handleError("20자 이하의 아이디를 입력해주세요!", "id");
            valid = false;
        } else if (inputs.id.match(/[\s]/g)) {
            handleError("공백을 제거해주세요!", "id");
            valid = false;
        } else if (inputs.id.match(/[`~!@#$%^&*|\\\'\";:\/?]/gi)) {
            handleError("특수문자를 제거해주세요!", "id");
            valid = false;
        }
        if (!inputs.password) {
            handleError("비밀번호를 입력해주세요!", "password");
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError("5자 이상의 비밀번호를 입력해주세요!", "password");
            valid = false;
        } else if (inputs.password.length > 20) {
            handleError("20자 이하의 비밀번호를 입력해주세요!", "password");
            valid = false;
        }
        if (!inputs.phoneNumber) {
            handleError("휴대폰 번호를 입력해주세요!", "phoneNumber");
            valid = false;
        } else if (!inputs.phoneNumber.match(/^[0-9\b -]/g)) {
            handleError("숫자만 입력해주세요!", "phoneNumber");
            valid = false;
        }
        if (!inputs.nickname) {
            handleError("닉네임을 입력해주세요!", "nickname");
            valid = false;
        }
        if (valid) {
            //console.log([inputs.id,inputs.password])
            signup();
        }
    };
    const signup = () => {
        console.log(disabled);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            try {
                navigation.navigate("Login");
            } catch (error) {
                Alert.alert("Error", "뭔가 잘못됐다");
            }
        }, 2000);
    };
    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({ ...prevState, [input]: text }));
    };
    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    };

    return (
        <ScrollView style={styles.container}>
            <Loader visible={loading} />
            <StatusBar backgroundColor='white' barStyle='dark-content' />

            <View style={styles.inputSection}>
                <Text style={styles.headerText}>
                    아래의 사항을 빠짐없이 기입해 주세요.
                </Text>
                <Input
                    label="ID"
                    placeholder="영문ID"
                    iconnickname="person-outline"
                    error={errors.id}
                    onFocus={() => {
                        handleError(null, "id");
                    }}
                    onChangeText={(text) => handleOnChange(text, "id")}
                />
                <View style={styles.checkIdSection}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.chkDupButton}>
                        <Text style={{ fontSize: 12 }}>중복확인</Text>
                    </TouchableOpacity>
                </View>
                <Input
                    label="Password"
                    placeholder="5자 이상"
                    iconnickname="md-lock-closed-outline"
                    error={errors.password}
                    onFocus={() => {
                        handleError(null, "password");
                    }}
                    onChangeText={(text) => handleOnChange(text, "password")}
                    password
                />
                <Input
                    label="PhoneNumber"
                    placeholder="- 없이 숫자만 입력"
                    iconnickname="ios-logo-whatsapp"
                    error={errors.phoneNumber}
                    onFocus={() => {
                        handleError(null, "phoneNumber");
                    }}
                    onChangeText={(text) => handleOnChange(text, "phoneNumber")}
                    keyboardType="numeric"
                />
                <Input
                    label="Nickname"
                    placeholder="닉네임"
                    iconnickname="heart-circle-outline"
                    error={errors.nickname}
                    onFocus={() => {
                        handleError(null, "nickname");
                    }}
                    onChangeText={(text) => handleOnChange(text, "nickname")}
                />
                <Text style={styles.headerText}>
                    서비스 이용 약관에 동의해 주세요.
                </Text>
                <Agreement /> 
                <TouchableOpacity onPress={validate} style={styles.signupButton}>
                    <Text style={{ color: "#505050", fontSize: 20, fontWeight: "bold" }}>
                        가입
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputSection: {
        marginHorizontal: 20,
    },
    headerText: {
        marginVertical: 20,
        fontSize: 20,
        color: '#505050',
    },
    checkIdSection: {
        flexDirection: 'row',
    },
    errorText: {
        flex: 1,
        width: '50%',
        height: 17,
        color: 'gray',
    },
    chkDupButton: {
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        width: 60,
        height: 17,
        alignItems: "center",
        justifyContent: "center",
    },
    signupButton: {
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        width: "100%",
        height: 45,
        marginVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
});
