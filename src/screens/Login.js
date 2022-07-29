import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Input from "../components/Input";
import { UserContext } from "../contexts/User";
import axios from "axios";

export default function Login({ navigation }) {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(UserContext);

  const validate = () => {
    Keyboard.dismiss();
    inputs.id = inputs.id.replace(/ /g, "").trim();
    inputs.password = inputs.password.replace(/ /g, "").trim();

    let valid = true;
    if (!inputs.id) {
      handleError("아이디를 입력해주세요!", "id");
      valid = false;
    }
    if (!inputs.password) {
      handleError("비밀번호을 입력해주세요!", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("5자 이상의 비밀번호을 입력해주세요!", "password");
      valid = false;
    }
    if (valid) {
      //console.log([inputs.id,inputs.password])
      login();
    }
  };

  const login = async () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await axios
        .post("http://13.125.249.247/filme/user/login", {
          identification: `${inputs.id}`,
          password: `${inputs.password}`,
        })
        .then((response) => {
          if (response.data.result) {
            const userIdx = response.data.result.userIdx;
            const token = response.data.result.token;
            const identification = inputs.id;
            dispatch({ userIdx, identification, token });
            navigation.navigate("Bottom");
          } else {
            Alert.alert("Error", response.data.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert.alert("로그인 실패");
        });
    }, 1000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.logoSection}>
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 180, height: 180 }}
        />
      </View>

      <View style={styles.inputSection}>
        <Input
          label="ID"
          placeholder="영문ID"
          iconName="person-outline"
          error={errors.id}
          onFocus={() => {
            handleError(null, "id");
          }}
          onChangeText={(text) => handleOnChange(text, "id")}
        />
        <Input
          label="Password"
          placeholder="5자 이상"
          iconName="md-lock-closed-outline"
          error={errors.password}
          onFocus={() => {
            handleError(null, "password");
          }}
          onChangeText={(text) => handleOnChange(text, "password")}
          onEndEditing={validate}
          password
        />
        <TouchableOpacity onPress={validate} style={styles.loginButton}>
          <Text style={{ color: "#505050", fontSize: 20, fontWeight: "bold" }}>
            로그인
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.threeButtonSection}>
        <TouchableOpacity>
          <Text style={styles.threeButtonText}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.threeButtonText}> | </Text>
        <TouchableOpacity>
          <Text style={styles.threeButtonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.threeButtonText}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.threeButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoSection: {
    margin: 50,
    alignItems: "center",
  },
  inputSection: {
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    width: "100%",
    height: 45,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  threeButtonSection: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  threeButtonText: {
    fontSize: 13,
    color: "#505050",
  },
});
