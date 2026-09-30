import { StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Employer } from '../../../data/types';
import { colors, sizes } from '../theme';
import { ExperienceItem } from './ExperienceItem';

const styles = StyleSheet.create({
  block: { marginBottom: 6 },
  head: { marginBottom: 5 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  company: { flex: 1, fontSize: sizes.itemTitle + 1.5, fontWeight: 700, color: colors.text, paddingRight: 6 },
  period: { fontSize: sizes.small, color: colors.muted, fontWeight: 600 },
  role: { fontSize: sizes.itemTitle, color: colors.accent, fontWeight: 600 },
  // Le esperienze del datore di lavoro sono rientrate e legate da un filetto verticale.
  experiences: { borderLeftWidth: 1.5, borderLeftColor: colors.experienceRule, paddingLeft: 9 },
});

// last: ultimo blocco della pagina, senza margini inferiori (né suoi né della sua ultima esperienza).
export function EmployerBlock({ employer, last = false }: { employer: Employer; last?: boolean }) {
  return (
    <View style={last ? [styles.block, { marginBottom: 0 }] : styles.block}>
      <View style={styles.head} wrap={false} minPresenceAhead={80}>
        <View style={styles.headRow}>
          <Text style={styles.company}>
            {employer.company}
            <Text style={styles.role}> · {employer.role}</Text>
          </Text>
          <Text style={styles.period}>{employer.period}</Text>
        </View>
      </View>
      <View style={styles.experiences}>
        {employer.experiences.map((e, i) => (
          <ExperienceItem key={i} item={e} last={last && i === employer.experiences.length - 1} />
        ))}
      </View>
    </View>
  );
}
