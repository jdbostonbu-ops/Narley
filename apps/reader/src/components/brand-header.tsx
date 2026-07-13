import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';

const theme = getTheme(false);

export const BrandHeader = () => (
  <View style={styles.card}>
    <View style={styles.glow} />
    <View style={styles.row}>
      <View style={styles.logo}>
        <Ionicons
          accessibilityLabel="Narley home"
          color={theme.colors.textInverse}
          name="home"
          size={30}
        />
      </View>
      <View style={styles.copy}>
        <Text accessibilityRole="header" style={styles.title}>NARLEY</Text>
        <Text numberOfLines={1} style={styles.subtitle}>Community resource navigation</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.primary, borderRadius: 28, marginBottom: 18, overflow: 'hidden', paddingHorizontal: 20, paddingVertical: 22, width: '100%' },
  glow: { backgroundColor: theme.colors.surface, borderRadius: 999, height: 220, opacity: 0.05, position: 'absolute', right: -80, top: -120, width: 220 },
  row: { alignItems: 'center', flexDirection: 'row' },
  logo: { alignItems: 'center', backgroundColor: theme.colors.primaryDark, borderRadius: 16, height: 54, justifyContent: 'center', marginRight: 16, width: 54 },
  copy: { flex: 1 },
  title: { color: theme.colors.textInverse, fontSize: 34, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: theme.colors.textInverse, fontSize: 14, fontWeight: '500', marginTop: 2, opacity: 0.72 },
});
