import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SvgXml } from 'react-native-svg';
import { eyeIconClosed, eyeIconOpen } from '../../styles/Icons';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  testID?: string;
}

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: string;
  style?: object;
}

//###### DEFAULT INPUT STYLE##########

const ThemeInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  testID,
}) => {
  return (
    <View>
      <TextInput
        style={InputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        testID={testID}
      />
    </View>
  );
};

//###### INPUT STYLE TWO##########

const ThemeInputStyleTwo: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  testID,
}) => {
  return (
    <View>
      <TextInput
        style={InputStyles.inputStyleTwo}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        testID={testID}
      />
    </View>
  );
};

//###### BORDER INPUT STYLE NORMAL ##########

const ThemeInputStyleThree: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  testID,
}) => {
  return (
    <View style={InputStyles.gradientBorder}>
      <TextInput
        style={InputStyles.inputStyleThree}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        testID={testID}
        placeholderTextColor="#A5A5A5"
      />
    </View>
  );
};

//###### BORDER INPUT STYLE NON BORDER RADIUS ##########
const ThemeInputStyleFour: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  testID,
}) => {
  return (
    <View style={InputStyles.gradientBorderFour}>
      <TextInput
        style={InputStyles.inputStyleFour}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        testID={testID}
        placeholderTextColor="#A5A5A5"
      />
    </View>
  );
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
}) => {
  const [isSecure, setIsSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setIsSecure(prevState => !prevState);
  };

  return (
    <View style={[InputStyles.container, style]}>
      <View style={InputStyles.gradientBorder}>
        <TextInput
          style={InputStyles.inputStyleThree}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          placeholderTextColor="#A5A5A5"
        />
      </View>
      <TouchableOpacity
        style={InputStyles.eyeIcon}
        onPress={togglePasswordVisibility}>
        {isSecure ? (
          <SvgXml xml={eyeIconClosed} width={20} height={20} />
        ) : (
          <SvgXml xml={eyeIconOpen} width={20} height={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

interface GradientPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const GradientPicker: React.FC<GradientPickerProps> = ({
  selectedValue,
  onValueChange,
  options,
  placeholder = 'Select an option',
}) => {
  return (
    <View style={InputStyles.gradientBorderPicker}>
      <View style={InputStyles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={InputStyles.picker}>
          <Picker.Item label={placeholder} value="" />
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

interface GradientOTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  numInputs?: number;
  inputSize?: number;
  onComplete?: () => void;
}

const GradientOTPInput: React.FC<GradientOTPInputProps> = ({
  otp,
  setOtp,
  numInputs = 6,
  inputSize = 50,
  onComplete,
}) => {
  const handleOTPSubmit = (index: number, text: string) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (newOtp.every(digit => digit !== '')) {
      onComplete && onComplete();
    }
  };

  return (
    <View style={InputStyles.container}>
      <View style={InputStyles.otpContainer}>
        {Array.from({ length: numInputs }).map((_, index) => (
          <View
            key={index}
            style={[
              InputStyles.otpWrapper,
              { width: inputSize, height: inputSize },
            ]}>
            <TextInput
              style={InputStyles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index]}
              onChangeText={text => handleOTPSubmit(index, text)}
              textAlign="center"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const NormalPicker: React.FC<GradientPickerProps> = ({
  selectedValue,
  onValueChange,
  options,
  placeholder = 'Select',
}) => {
  return (
    <View style={InputStyles.NormalgradientBorderPicker}>
      <View style={InputStyles.NormalPickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={InputStyles.picker}>
          <Picker.Item label={placeholder} value="" />
          {options &&
            Array.isArray(options) &&
            options.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
        </Picker>
      </View>
    </View>
  );
};

const InputStyles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 28,
    paddingLeft: 20,
  },

  inputStyleTwo: {
    padding: 12,
    borderColor: '#544C4C24',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
    color: '#544C4C',
    marginBottom: 12,
  },

  gradientBorder: {
    borderRadius: 28,
    padding: 2,
  },

  inputStyleThree: {
    padding: 12,
    fontSize: 16,
    color: '#A5A5A5',
    fontFamily: 'Urbanist',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 26,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    gap: 10,
  },

  inputStyleFour: {
    padding: 12,
    fontSize: 16,
    color: '#544C4C',
    fontFamily: 'Urbanist',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    gap: 10,
  },

  gradientBorderFour: {
    borderRadius: 8,
    padding: 2,
  },

  container: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  gradientBorderPicker: {
    borderRadius: 32,
    padding: 2,
    overflow: 'hidden',
  },

  pickerContainer: {},
  picker: {
    height: 50,
    width: '100%',
    fontSize: 16,
    color: '#A5A5A5',
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
  },

  NormalgradientBorderPicker: {
    padding: 2,
    overflow: 'hidden',
  },
  NormalPickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpWrapper: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 18,
    textAlign: 'center',
  },
});

export {
  ThemeInput,
  ThemeInputStyleTwo,
  ThemeInputStyleThree,
  ThemeInputStyleFour,
  PasswordInput,
  GradientPicker,
  GradientOTPInput,
  NormalPicker,
};
