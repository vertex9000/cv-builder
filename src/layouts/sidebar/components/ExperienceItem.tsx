import { StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Experience } from '../../../data/types';
import { colors, sizes } from '../theme';
import { BulletList } from './BulletList';

const styles = StyleSheet.create({
  item: { marginBottom: 9 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { flex: 1, fontSize: sizes.itemTitle, fontWeight: 700, paddingRight: 6 },
  period: { fontSize: sizes.small, color: colors.muted, fontWeight: 600 },
  role: { fontSize: sizes.body, color: colors.accent, fontWeight: 600, marginBottom: 2 },
  context: { color: colors.muted, fontWeight: 400 },
  titleGap: { height: 2 },
  intro: { fontSize: sizes.body, lineHeight: sizes.lineHeight, marginBottom: 2 },
  // Sotto-iniziativa (titolo, sottotitolo e bullet) leggermente rientrata rispetto all'esperienza.
  sub: { marginTop: 3, paddingLeft: sizes.subIndent },
  subHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1.5 },
  subTitle: { flex: 1, fontWeight: 700, color: colors.text, paddingRight: 6 },
  subPeriod: { fontSize: sizes.small, color: colors.muted },
});

export function ExperienceItem({ item, last = false }: { item: Experience; last?: boolean }) {
  return (
    <View style={last ? [styles.item, { marginBottom: 0 }] : styles.item}>
      <View wrap={false} minPresenceAhead={60}>
        <View style={styles.headRow}>
          <Text style={styles.title}>{item.title}</Text>
          {item.period ? <Text style={styles.period}>{item.period}</Text> : null}
        </View>
        {item.role ? (
          <Text style={styles.role}>
            {item.role}
            {item.context ? <Text style={styles.context}> · {item.context}</Text> : null}
          </Text>
        ) : (
          <View style={styles.titleGap} />
        )}
      </View>
      {item.intro ? <Text style={styles.intro}>{item.intro}</Text> : null}
      {item.bullets ? <BulletList items={item.bullets} /> : null}
      {item.subInitiatives?.map((s, i) => (
        <View key={i} style={styles.sub}>
          <View style={styles.subHead} wrap={false} minPresenceAhead={40}>
            <Text style={styles.subTitle}>{s.title}</Text>
            {s.period ? <Text style={styles.subPeriod}>{s.period}</Text> : null}
          </View>
          {s.intro ? <Text style={styles.intro}>{s.intro}</Text> : null}
          <BulletList items={s.bullets} />
        </View>
      ))}
    </View>
  );
}
