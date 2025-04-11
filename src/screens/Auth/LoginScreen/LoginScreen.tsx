
import { useAuth } from "../../../context/AuthContext";
import { ApiResponseModel } from "../../../models/apiResponseModel";
import { LoginForm } from "../../../models/authModel";
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Image } from 'react-native';
import { Text } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { validateEmail } from "../../../utils/validators";
import GradientText from "../../../components/Text/GradientText";
import ErrorMessage from "../../../components/Error/BoostrapStyleError";
import { PasswordInput, ThemeInputStyleThree } from "../../../components/Input/Input";
import { GradientContinueButton } from "../../../components/Button/Button";
import { LoadingModal } from "../../../components/LoadingModal/LoadingModal";

const LoginScreen = ({ navigation, route }: { navigation: any; route: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login, isProfileSetupDone, userId } = useAuth();
    const [loading, setLoading] = useState(false);
    const { message, success } = route.params || { message: null, success: null };

    const handleCloseError = () => {
        setError(null);
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                handleCloseError();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            validateEmail(email);

            const loginData: LoginForm = {
                email,
                password,
            };

            const response: ApiResponseModel = await login(loginData);
            if (response.success && response.data) {
                if (!isProfileSetupDone && userId) {
                    navigation.navigate('ProfileSetup', userId);
                }
            } else {
                setError(response.message || 'An unknown error occurred');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        navigation.navigate('GoogleAuth');
    };

    const forgetPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const fontSizeTitle = Number(wp('8%'));

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {/* <Image
                            source={require('../../../assets/sample.png')}
                            style={styles.logo}
                        /> */}
                        <View style={styles.title}>
                            <GradientText
                                text="Sign in with My App"
                                fontSize={fontSizeTitle}
                            />
                        </View>
                        {error && <ErrorMessage error={error} onClose={handleCloseError} />}
                        <View style={styles.inputContainer}>
                            <ThemeInputStyleThree
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                            <PasswordInput
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <View style={styles.forgotPasswordRow}>
                            <TouchableOpacity
                                onPress={forgetPassword}
                                style={styles.forgotPassword}
                            >
                                <Text style={styles.forgotPasswordText}>
                                    <GradientText text={'Forgot Password?'} fontWeight="normal" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <GradientContinueButton
                            title="Sign in"
                            onPress={handleLogin}
                            style={styles.signInButton}
                        />
                    
                        <TouchableOpacity
                            style={styles.socialButton}
                            onPress={handleGoogleLogin}
                        >
                           {/* <Image
                                source={require('assets/images/sample.png')}
                                style={styles.socialIcon}
                            /> */}
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            {/* <Image
                                source={require('assets/images/sample.png')}
                                style={styles.socialIcon}
                            /> */}
                            <Text style={styles.socialButtonText}>
                                Continue with Microsoft
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.footer}>
                            <View style={styles.footerRow}>
                                <Text style={styles.footerText}>Don’t have an Account?</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Signup')}
                                >
                                    <Text style={styles.createAccountLink}>Create Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <LoadingModal loading={loading} setLoading={setLoading} />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: wp('5%'),
    },
    logo: {
        width: wp('30%'),
        height: wp('30%'),
    },
    title: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: hp('2%'),
        fontFamily: 'Urbanist-Regular',
        flexDirection: 'row',
        paddingHorizontal: wp('6%'),
    },
    forgotPasswordRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    forgotPasswordText: {
        fontSize: wp('3.5%'),
        color: '#DB2533',
        fontWeight: 'bold',
    },
    forgotPassword: {
        padding: hp('1%'),
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flex: 0.4,
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: hp('2%'),
        marginVertical: hp('1.5%'),
        gap: hp('2%'),
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: hp('4%'),
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 25,
        width: '80%',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('10%'),
        marginVertical: hp('0.3%'),
    },
    socialIcon: {
        width: wp('5%'),
        height: wp('5%'),
        marginRight: wp('3%'),
    },
    socialButtonText: {
        fontSize: wp('4%'),
        color: '#121212',
        fontWeight: 'bold',
        fontFamily: 'Inter',
    },
    signInButton: {
        height: hp('6%'),
        justifyContent: 'center',
    },
    footer: {
        marginTop: hp('5%'),
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: wp('3%'),
        color: '#000',
    },
    createAccountLink: {
        fontSize: wp('3%'),
        color: '#AB2959',
        fontWeight: '500',
        marginLeft: 5,
    },
});

export default LoginScreen;


