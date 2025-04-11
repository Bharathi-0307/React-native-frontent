import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
  SvgXml,
} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {playIcon} from '../../styles/Icons';

interface PlayButtonWithTextProps {
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
  textWidth?: any;
}

const PlayButtonWithText: React.FC<PlayButtonWithTextProps> = ({
  buttonText,
  onPress,
  textWidth = wp('30%'),
}) => {
  return (
    <TouchableOpacity style={styles.Button} onPress={onPress}>
      <View style={styles.Content}>
        <Svg width={textWidth} height={wp('6%')}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#DB2533" stopOpacity="1" />
              <Stop offset="50%" stopColor="#AB2959" stopOpacity="1" />
              <Stop offset="100%" stopColor="#7C2D7E" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#gradient)"
            fontSize="14"
            fontWeight="bold"
            x="0"
            y="16"
            textAnchor="start">
            {buttonText.trim()}
          </SvgText>
        </Svg>
        <SvgXml xml={playIcon} width={wp('6%')} height={wp('6%')} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    padding: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  Content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayButtonWithText;
