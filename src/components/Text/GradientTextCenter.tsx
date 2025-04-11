import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const estimateTextWidth = (text: string, fontSize: number): number => {
  const averageCharWidth = 0.6; 
  return text.length * fontSize * averageCharWidth;
};

const GradientTextCenter: React.FC<{
  text: string;
  fontSize?: number;
  color?: string;
  textAlign?: 'start' | 'middle' | 'end';
  fontFamily?: string;
  flex?: number;
  fontWeight?: string;
  height?: number;
}> = ({
  text,
  fontSize = 14,
  fontWeight = 'bold',
  fontFamily = 'Inter',
  height,
}) => {
  const svgWidth = estimateTextWidth(text, fontSize);

  return (
    <View style={[styles.container, {flex: 1, height: height || 'auto'}]}>
      <Svg height={fontSize * 1.2} width={svgWidth}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#DB2533" stopOpacity="1" />
            <Stop offset="50%" stopColor="#AB2959" stopOpacity="1" />
            <Stop offset="100%" stopColor="#7C2D7E" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#gradient)"
          fontSize={fontSize}
          fontWeight={fontWeight}
          x="50%"
          y={fontSize * 0.99}
          textAnchor="middle"
          fontFamily={fontFamily}>
          {text}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GradientTextCenter;
