import { Image, StyleSheet, Text, View } from 'react-native';

import { getTheme } from '@shared-ui/theme/theme';

const theme = getTheme(false);
const logo = require('../../assets/images/icon.png');

export const BrandHeader = () => {
  return (
    <View style={styles.card}>
      <View style={styles.glow} />
      <View style={styles.row}>
        <Image accessibilityLabel="Narley" fadeDuration={0} resizeMode="contain" source={logo} style={styles.logo} />
        <View style={styles.copy}>
          <Text accessibilityRole="header" style={styles.title}>NARLEY</Text>
          <Text numberOfLines={1} style={styles.subtitle}>Community resource navigation</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: theme.colors.primary, borderRadius: 28, marginBottom: 18, overflow: 'hidden', paddingHorizontal: 20, paddingVertical: 22, width: '100%' },
  glow: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 999, height: 220, position: 'absolute', right: -80, top: -120, width: 220 },
  row: { alignItems: 'center', flexDirection: 'row' },
  logo: { borderRadius: 16, height: 54, marginRight: 16, width: 54 },
  copy: { flex: 1 },
  title: { color: theme.colors.textInverse, fontSize: 34, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: 'rgba(248,244,234,0.72)', fontSize: 14, fontWeight: '500', marginTop: 2 },
});
