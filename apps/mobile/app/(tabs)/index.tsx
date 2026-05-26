import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Link } from 'expo-router'

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Medicare</Text>
        <Text style={styles.subtitle}>Consulta médica online</Text>
      </View>

      <View style={styles.warningBanner}>
        <Text style={styles.warningText}>
          ⚠️ Não é um serviço de emergência. Para risco de vida, ligue 192 (SAMU).
        </Text>
      </View>

      <Link href="/nova-consulta" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Iniciar Consulta</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.sectionTitle}>Especialidades</Text>

      <View style={styles.specialtiesGrid}>
        {SPECIALTIES.map((s) => (
          <TouchableOpacity key={s.key} style={styles.specialtyCard}>
            <Text style={styles.specialtyIcon}>{s.icon}</Text>
            <Text style={styles.specialtyLabel}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const SPECIALTIES = [
  { key: 'clinical', label: 'Clínica Médica', icon: '🩺' },
  { key: 'pediatrics', label: 'Pediatria', icon: '👶' },
  { key: 'dermatology', label: 'Dermatologia', icon: '🔬' },
  { key: 'gynecology', label: 'Ginecologia', icon: '🌸' },
  { key: 'psychiatry', label: 'Psiquiatria', icon: '🧠' },
  { key: 'cardiology', label: 'Cardiologia', icon: '❤️' },
]

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  logo: { fontSize: 28, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  warningBanner: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fef2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  warningText: { fontSize: 12, color: '#991b1b', lineHeight: 18 },
  primaryButton: {
    margin: 16,
    marginTop: 4,
    backgroundColor: '#2563eb',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#111827', marginLeft: 16, marginTop: 8, marginBottom: 12 },
  specialtiesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  specialtyCard: {
    width: '30%',
    margin: '1.5%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  specialtyIcon: { fontSize: 24, marginBottom: 6 },
  specialtyLabel: { fontSize: 11, color: '#374151', textAlign: 'center' },
})
