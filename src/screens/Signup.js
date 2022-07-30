import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Agreement from "../components/Agreement";
import axios from "axios";

export default function Signup({ navigation }) {
  const [inputs, setInputs] = React.useState({
    identification: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    if (errorMessage == "사용 가능한 아이디입니다.") {
      if (inputs.identification && inputs.password && inputs.name) {
        setDisabled(false);
      }
    }
  }, [errorMessage, inputs]);

  const validateIdDuplicate = useCallback(async () => {
    try {
      axios({
        method: "get",
        url: `http://13.125.249.247/filme/user/id-check?identification=${inputs.identification}`,
      })
        .then(function (response) {
          setErrorMessage(response.data.message);
        })
        .catch(function (error) {
          setErrorMessage("중복된 아이디입니다.");
        });
    } catch (e) {
    } finally {
    }
  }, [inputs]);

  const validate = () => {
    Keyboard.dismiss();

    let valid = true;
    if (!inputs.identification) {
      handleError("아이디를 입력해주세요!", "identification");
      valid = false;
    } else if (inputs.identification.length > 19) {
      handleError("19자 이하의 아이디를 입력해주세요!", "identification");
      valid = false;
    } else if (inputs.identification.match(/[\s]/g)) {
      handleError("공백을 제거해주세요!", "identification");
      valid = false;
    } else if (inputs.identification.match(/[`~!@#$%^&*|\\\'\";:\/?]/gi)) {
      handleError("특수문자를 제거해주세요!", "identification");
      valid = false;
    }
    if (!inputs.password) {
      handleError("비밀번호를 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length < 6) {
      handleError("6자 이상의 비밀번호를 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length > 12) {
      handleError("12자 이하의 비밀번호를 입력해주세요!", "password");
      valid = false;
    }
    if (!inputs.name) {
      handleError("닉네임을 입력해주세요!", "name");
      valid = false;
    }
    if (valid) {
      //console.log([inputs.id,inputs.password])
      signup(inputs);
    }
  };
  const signup = async (inputs) => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      console.log(inputs);
      await axios
        .post("http://13.125.249.247/filme/user", {
          identification: `${inputs.identification}`,
          password: `${inputs.password}`,
          name: `${inputs.name}`,
        })
        .then((response) => {
          if (response.data.isSuccess != true) {
            Alert.alert("오류", response.data.message);
          } else {
            Alert.alert("가입이 완료되었습니다.");
            navigation.navigate("Login");
          }
        })
        .catch((err) => {
          console.log(err);
          Alert.alert("오류", err.message);
        });
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
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.inputSection}>
        <Text style={styles.headerText}>
          아래의 사항을 빠짐없이 기입해 주세요.
        </Text>
        <Input
          label="ID"
          placeholder="5 ~ 19자 (영어, 숫자 가능)"
          iconnickname="person-outline"
          error={errors.identification}
          onFocus={() => {
            handleError(null, "identification");
          }}
          onChangeText={(text) => handleOnChange(text, "identification")}
        />
        <View style={styles.checkIdSection}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.chkDupButton}
            onPress={validateIdDuplicate}
          >
            <Text style={{ fontSize: 12 }}>중복확인</Text>
          </TouchableOpacity>
        </View>
        <Input
          label="Password"
          placeholder="6 ~ 12자 (영어, 숫자 필수 포함)"
          iconnickname="md-lock-closed-outline"
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
          onChangeText={(text) => handleOnChange(text, "password")}
          password
        />
        <Input
          label="Nickname"
          placeholder="닉네임"
          iconnickname="heart-circle-outline"
          error={errors.name}
          onFocus={() => {
            handleError(null, "name");
          }}
          onChangeText={(text) => handleOnChange(text, "name")}
        />
        <Text style={styles.headerText}>서비스 이용 약관에 동의해 주세요.</Text>
        <Agreement />
        <TouchableOpacity
          disabled={disabled}
          onPress={validate}
          style={styles.signupButton}
        >
          <Text style={{ color: "#505050", fontSize: 20, fontWeight: "bold" }}>
            가입
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputSection: {
    marginHorizontal: 20,
  },
  headerText: {
    marginVertical: 20,
    fontSize: 20,
    color: "#505050",
  },
  checkIdSection: {
    flexDirection: "row",
  },
  errorText: {
    flex: 1,
    width: "50%",
    height: 17,
    color: "gray",
    marginLeft: 10,
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
