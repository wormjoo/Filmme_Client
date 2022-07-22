import React from 'react';
import { Text, View, TextInput } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const Input = ({ label, iconName, error, password, onFocus = () => { }, ...props }) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);

    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ marginVertical: 5, fontSize: 14, color: '#505050' }}>{label}</Text>
            <View style={{
                width: '100%',
                height: 45,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderRadius: 10,
                borderColor: error ? 'red' : '#C8C8C8',
                borderWidth: isFocused ? 2.5 : 1,
            }}>
                <Ionic name={iconName} style={{ fontSize: 20, color: 'gray', paddingRight: 10 }} />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{ flex: 1 }}
                    {...props}
                />
                {password && (
                    <Ionic name={hidePassword ? "eye-off-outline" : "eye-outline"}
                        style={{ fontSize: 22, color: 'gray' }}
                        onPress={() => setHidePassword(!hidePassword)} />
                )}
            </View>
            {error && (
                <Text style={{ color: 'red', fontSize: 12, marginTop: 7 }}>{error}</Text>
            )}
        </View>
    );
};

export default Input;