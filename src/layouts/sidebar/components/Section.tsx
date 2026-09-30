import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { colors, sizes } from '../theme';

const styles = StyleSheet.create({
  section: { marginBottom: 10 },
  title: {
    fontSize: sizes.sectionTitle,
    fontWeight: 700,
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingBottom: 2,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.sectionRule,
  },
});

interface SectionProps {
  title: string;
  children: ReactNode;
  // Spazio minimo (pt) che deve seguire il titolo sulla stessa pagina, per evitare titoli orfani.
  minPresenceAhead?: number;
  // Ultima sezione della colonna: niente margine inferiore, che conterebbe per l'impaginazione.
  last?: boolean;
}

export function Section({ title, children, minPresenceAhead = 40, last = false }: SectionProps) {
  return (
    <View style={last ? [styles.section, { marginBottom: 0 }] : styles.section}>
      <Text style={styles.title} minPresenceAhead={minPresenceAhead}>
        {title}
      </Text>
      {children}
    </View>
  );
}
