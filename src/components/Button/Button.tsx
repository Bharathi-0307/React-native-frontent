import React from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import ButtonStyles from './ButtonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  disabled?: boolean;
}

const GradientButton: React.FC<ButtonProps> = ({title, onPress, style}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.button,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={ButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const NormalButton: React.FC<ButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[ButtonStyles.borderedButton, style]}
      onPress={onPress}>
      <Text style={ButtonStyles.buttonTextBlack}>{title}</Text>
    </TouchableOpacity>
  );
};

const GradientButtonSecondary: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.button,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={ButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const CancelButton: React.FC<ButtonProps> = ({title, onPress, style}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.cancelButton,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={ButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const GradientContinueButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  disabled,
}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.button,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}>
      <Text style={ButtonStyles.buttonText}>{title}</Text>
      {/* <Image
        source={require('assets/images/sample.png')}
        style={ButtonStyles.imageStyle}
      /> */}
    </TouchableOpacity>
  );
};

const GradientBackButton: React.FC<ButtonProps> = ({title, onPress, style}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.previewsButtonbutton,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {/* <Image
        source={require('assets/images/sample.png')}
        style={ButtonStyles.imageStyleBack}
      /> */}
      <Text style={ButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const GradientBackButtonNoBackground: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  const buttonStyle: ViewStyle = {
    ...ButtonStyles.previewsButtonbutton,
    ...style,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {/* <Image
        source={require('../../assets/images/sample.png')}
        style={ButtonStyles.imageStyleBack}
      /> */}
    </TouchableOpacity>
  );
};

interface GlobalHeaderProps {
  title: string;
  onPress: () => void;
}

const BackButtonWithHeader: React.FC<GlobalHeaderProps> = ({
  title,
  onPress,
}) => {
  return (
    <View style={ButtonStyles.headerContainer}>
      <View style={ButtonStyles.backButtonContainer}>
        <GradientBackButtonNoBackground title="" onPress={onPress} />
      </View>
      <Text style={ButtonStyles.header}>{title}</Text>
    </View>
  );
};

export {
  GradientButton,
  NormalButton,
  GradientButtonSecondary,
  GradientContinueButton,
  GradientBackButton,
  GradientBackButtonNoBackground,
  BackButtonWithHeader,
  CancelButton,
};
