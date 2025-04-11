import { GradientButton } from '../../../components/Button/Button';
import ErrorMessage from '../../../components/Error/BoostrapStyleError';
import { PasswordInput, ThemeInputStyleThree } from '../../../components/Input/Input';
import { LoadingModal } from '../../../components/LoadingModal/LoadingModal';
import { useAuth } from '../../../context/AuthContext';
import { ApiResponseModel } from '../../../models/apiResponseModel';
import { SignupForm } from '../../../models/authModel';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity,StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { validateEmail } from '../../../utils/validators';
const SignupScreen = ({ navigation }: { navigation: any }) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const { signup } = useAuth();

const formValid = name && email && password && confirmPassword && password === confirmPassword;

useEffect(() => {
    if (error) {
        const timer = setTimeout(() => setError(null), 5000);
        return () => clearTimeout(timer);
    }
}, [error]);

const handleSignup = async () => {
    try {
        setLoading(true);
        validateEmail(email);

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const signupData: SignupForm = { fullname: name, email, password };
        const response: ApiResponseModel = await signup(signupData);

        if (response.success && response.data) {
            navigation.navigate('ProfileSetup', { userId: response.data.userId });
        } else {
            setError(response.message || 'An unknown error occurred');
        }
    } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
    } finally {
        setLoading(false);
    }
};

if (loading) {
    return <LoadingModal loading={loading} setLoading={setLoading} />;
}

return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* <Image source={require('assets/images/sample.png')} style={styles.logo} /> */}
                <Text style={styles.title}>Sign up</Text>

                {error && <ErrorMessage error={error} onClose={() => setError(null)} />}

                <View style={styles.inputContainer}>
                    <ThemeInputStyleThree placeholder="Full Name" value={name} onChangeText={setName} />
                    <ThemeInputStyleThree
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <PasswordInput placeholder="Password" value={password} onChangeText={setPassword} />
                    <PasswordInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <GradientButton title="Sign Up" onPress={handleSignup} disabled={!formValid} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
},
logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
},
inputContainer: {
    marginBottom: 20,
},
linkText: {
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 20,
},
});

export default SignupScreen;