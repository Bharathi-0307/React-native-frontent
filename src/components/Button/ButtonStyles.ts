import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

// Scaling functions
const {width, height} = Dimensions.get('window');
export const scale = (size: number) => (width / 375) * size;
export const scaleFont = (size: number) => (width / 375) * size;
// Layout styles for the button
const ButtonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    height: 100,
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    height: 100,
    backgroundColor: '#959596',
  },

  borderedButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 28,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    borderColor: 'grey',
    marginBottom: 10,
  },
  buttonTextBlack: {
    color: '#000',
    fontSize: 16,
    marginLeft: '20%',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'Urbanist',
  },
  gradientStyle: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 28,
  },

  buttonContainerNextPrev: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },

  leftButton: {
    alignSelf: 'flex-start',
  },
  rightButton: {
    alignSelf: 'flex-end',
  },
  // NEXT button

  gradientStylePre: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 28,
  },

  imageStyle: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },

  // previewsButton
  previewsButtonbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },

  gradientStyleBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    //  transform: [{ translateY: 10 }],
  },

  imageStyleBack: {
    width: 24,
    height: 24,
  },

  // BACK BUTTON COMBO HEADER BUTTON

  header: {
    fontSize: scaleFont(20),
    fontWeight: '700',
    color: '#AB2959',
    textAlign: 'center',
    fontFamily: 'Inter',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: scale(15),
    padding: scale(15),
    width: '100%',
  },

  backButtonContainer: {
    position: 'absolute',
    left: scale(-10),
    zIndex: 1,
  },
});

export const gradientColors = ['#DB2533', '#AC2959', '#7C2D7E'];
export const gradientColorsPre = ['#FCC80B', '#F5AF17', '#F19821'];
export const gradientStart = {x: 0, y: 0};
export const gradientEnd = {x: 1, y: 0};

export default ButtonStyles;
