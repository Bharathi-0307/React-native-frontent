import {StyleSheet} from 'react-native';

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
  // EYE ICONS FOR PASSWORD INPUT

  container: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{translateY: -10}],
  },
  eyeImage: {
    width: 20,
    height: 20,
  },

  // DROPDOWN INPUT STYLES

  gradientBorderPicker: {
    borderRadius: 32,
    padding: 2,
    overflow: 'hidden',
  },

  pickerContainer: {
    // backgroundColor: '#FFFFFF',
    // borderRadius: 30,
  },
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

  //  OTP INPUT STYLES

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

  normalBorderPicker: {
    borderRadius: 32,
    padding: 2,
    overflow: 'hidden',
  },

  Normalpicker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000000',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },

  pickerWithBorder: {
    height: 50,
    width: '100%',
    fontSize: 16,
    color: '#A5A5A5',
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
  },
});

export default InputStyles;
