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

const GradientText: React.FC<{
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
  color = '#AB2959',
  textAlign = 'start',
  fontFamily = 'Inter',
  flex = 1,
  height,
}) => {
  const svgWidth = estimateTextWidth(text, fontSize);

  return (
    <View style={[styles.container, {flex: 1, height: 'auto'}]}>
      <Svg height={fontSize * 1.2} width={svgWidth}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FF0000" stopOpacity="1" />
            <Stop offset="50%" stopColor="#CC0000" stopOpacity="1" />
            <Stop offset="100%" stopColor="#990000" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#gradient)"
          fontSize={fontSize}
          fontWeight={fontWeight}
          x="0"
          y={fontSize * 0.75}
          textAnchor={textAlign}
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
    alignItems: 'flex-start',
  },
});

export default GradientText;
