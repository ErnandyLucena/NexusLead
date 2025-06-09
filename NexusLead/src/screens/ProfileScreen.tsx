import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface IconProps {
  name: 'mail' | 'phone' | 'shield' | 'edit-2' | 'log-out';
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 20, color = '#2d3748' }) => {
  const iconContainerStyle: StyleProp<ViewStyle> = {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const lineStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    backgroundColor: color,
  };

  switch (name) {
    case 'mail':
      return (
        <View style={iconContainerStyle}>
          <View
            style={{
              width: size,
              height: size * 0.7,
              borderRadius: 2,
              borderWidth: 1.5,
              borderColor: color,
            }}
          />
          <View
            style={{
              ...lineStyle,
              width: size * 0.8,
              height: 1.5,
              transform: [{ rotate: '30deg' }],
              top: size * 0.2,
              left: size * 0.1,
            }}
          />
        </View>
      );
    case 'phone':
      return (
        <View style={iconContainerStyle}>
          <View
            style={{
              width: size * 0.6,
              height: size,
              borderRadius: 4,
              borderWidth: 1.5,
              borderColor: color,
            }}
          />
          <View
            style={{
              ...lineStyle,
              width: size * 0.3,
              height: 1.5,
              top: size * 0.1,
            }}
          />
        </View>
      );
    case 'shield':
      return (
        <View style={iconContainerStyle}>
          <View
            style={{
              width: size,
              height: size,
              borderWidth: 1.5,
              borderColor: color,
              borderRadius: size / 2,
            }}
          />
        </View>
      );
    case 'edit-2':
      return (
        <View style={iconContainerStyle}>
          <View
            style={{
              ...lineStyle,
              width: 1.5,
              height: size * 0.4,
              top: size * 0.5,
              left: size * 0.15,
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              width: size * 0.6,
              height: size * 0.6,
              borderWidth: 1.5,
              borderColor: color,
              transform: [{ rotate: '45deg' }],
              position: 'absolute',
            }}
          />
        </View>
      );
    case 'log-out':
      return (
        <View style={iconContainerStyle}>
          <View
            style={{
              width: size * 0.7,
              height: size,
              borderWidth: 1.5,
              borderColor: color,
              borderRightWidth: 0,
              position: 'absolute',
              left: 0,
            }}
          />
          <View
            style={{
              ...lineStyle,
              height: 1.5,
              width: size * 0.6,
              left: size * 0.4,
              top: size / 2 - 0.75,
            }}
          />
          <View
            style={{
              ...lineStyle,
              height: 1.5,
              width: size * 0.3,
              left: size * 0.7,
              top: size * 0.35,
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              ...lineStyle,
              height: 1.5,
              width: size * 0.3,
              left: size * 0.7,
              bottom: size * 0.35,
              transform: [{ rotate: '-45deg' }],
              position: 'absolute',
            }}
          />
        </View>
      );
    default:
      return <View style={iconContainerStyle} />;
  }
};

const UNIMED_GREEN = '#00995d';
const TEXT_COLOR_DARK = '#2d3748';
const TEXT_COLOR_LIGHT = '#718096';
const BACKGROUND_COLOR = '#f7fafc';
const CARD_BACKGROUND_COLOR = '#ffffff';
const BORDER_COLOR = '#e2e8f0';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const user = {
    name: 'Dr. Ernandy',
    specialty: 'Cardiologista',
    crm: 'CRM/SP 123456',
    email: 'dr.ernandy@hostcom.br',
    phone: '(11) 99999-8888',
    avatarUrl: 'https://placehold.co/120x120/a3d4a0/2d3748?text=DE',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.avatarUrl }}
          style={styles.avatar}
          onError={(e) => console.log(e.nativeEvent.error)}
        />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileSpecialty}>{user.specialty}</Text>
        <Text style={styles.profileCrm}>{user.crm}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações de Contato</Text>
        <View style={styles.infoRow}>
          <Icon name="mail" size={20} color={UNIMED_GREEN} />
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color={UNIMED_GREEN} />
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Opções</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="edit-2" size={20} color={TEXT_COLOR_DARK} />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Icon name="shield" size={20} color={TEXT_COLOR_DARK} />
          <Text style={styles.optionText}>Segurança e Privacidade</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutButton}>
        <Icon name="log-out" size={16} color={'#c53030'} />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: UNIMED_GREEN,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: TEXT_COLOR_DARK,
  },
  profileSpecialty: {
    fontSize: 16,
    color: UNIMED_GREEN,
    marginTop: 4,
  },
  profileCrm: {
    fontSize: 14,
    color: TEXT_COLOR_LIGHT,
    marginTop: 2,
  },
  card: {
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR_DARK,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: TEXT_COLOR_LIGHT,
    marginLeft: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  optionText: {
    fontSize: 16,
    color: TEXT_COLOR_DARK,
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fed7d7',
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#c53030',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
