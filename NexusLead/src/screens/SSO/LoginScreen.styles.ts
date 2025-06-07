import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Objeto de cores para fácil referência
  colors: {
    primaryGreen: '#00843D',
    primaryGray: '#A0AEC0', // Tom de cinza mais moderno
    white: '#FFFFFF',
    lightGray: '#F7FAFC',
    darkText: '#2D3748',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#00843D', // primaryGreen
    opacity: 0.05,
  },
  shape1: {
    width: 400,
    height: 400,
    top: -150,
    left: -100,
  },
  shape2: {
    width: 300,
    height: 300,
    bottom: -120,
    right: -120,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748', // darkText
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#A0AEC0', // primaryGray
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#F7FAFC', // lightGray
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
    color: '#2D3748', // darkText
  },
  button: {
    backgroundColor: '#00843D', // primaryGreen
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00843D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF', // white
    fontWeight: '700',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#A0AEC0', // primaryGray
    fontSize: 14,
    textAlign: 'center',
  },
  signUpLink: {
    color: '#00843D', // primaryGreen
    fontWeight: '600',
  },
});
