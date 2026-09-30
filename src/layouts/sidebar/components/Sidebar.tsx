import type { ReactNode } from 'react';
import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { CvData } from '../../../data/types';
import { colors, sizes } from '../theme';
import { LinkIcon } from '../../../components/LinkIcon';

const styles = StyleSheet.create({
  name: { fontSize: sizes.name, fontWeight: 700, color: colors.sidebarHeading, lineHeight: 1.1 },
  headline: { fontSize: 10, color: colors.sidebarAccent, fontWeight: 600, marginTop: 4, lineHeight: 1.25 },
  block: { marginTop: 9 },
  blockTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: colors.sidebarHeading,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingBottom: 2,
    marginBottom: 5,
    borderBottomWidth: 0.75,
    borderBottomColor: colors.sidebarRule,
  },
  line: { fontSize: sizes.small, lineHeight: sizes.lineHeight, marginBottom: 1 },
  // Link nei contatti: stesso aspetto del testo (react-pdf li renderebbe blu e sottolineati).
  link: { color: colors.sidebarText, textDecoration: 'none' },
  linkRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 3, marginBottom: 1 },
  area: { fontSize: sizes.small, fontWeight: 700, color: colors.sidebarAccent, marginTop: 2 },
  items: { fontSize: sizes.small, lineHeight: sizes.lineHeight },
  muted: { fontSize: sizes.small, lineHeight: sizes.lineHeight, color: colors.sidebarMuted },
  entry: { marginBottom: 3 },
  date: { fontWeight: 400, color: colors.sidebarMuted },
  strong: { fontSize: sizes.small, fontWeight: 600, lineHeight: sizes.lineHeight },
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function Sidebar({ data }: { data: CvData }) {
  const { contacts } = data;
  return (
    <View>
      <Text style={styles.name}>{contacts.name}</Text>
      <Text style={styles.headline}>{data.headline}</Text>
      <Block title={data.labels.contacts}>
        {[
          { text: contacts.email },
          { text: contacts.phone },
          { text: contacts.linkedin, href: `https://${contacts.linkedin}` },
          { text: contacts.instagram, href: `https://${contacts.instagram}` },
          { text: contacts.location },
        ].map((c, i) =>
          c.href ? (
            <View key={i} style={styles.linkRow}>
              <View style={styles.icon}>
                <LinkIcon size={sizes.small - 0.5} color={colors.sidebarText} />
              </View>
              <Link src={c.href} style={[styles.line, styles.link]}>
                {c.text}
              </Link>
            </View>
          ) : (
            <Text key={i} style={styles.line}>
              {c.text}
            </Text>
          ),
        )}
      </Block>
      <Block title={data.labels.skills}>
        {data.skills.map((s, i) => (
          <View key={i}>
            <Text style={styles.area}>{s.area}</Text>
            <Text style={styles.items}>{s.items}</Text>
          </View>
        ))}
      </Block>
      <Block title={data.labels.certifications}>
        {data.certifications.map((c, i) => (
          <View key={i} style={styles.entry}>
            <Text style={styles.strong}>
              <Text style={styles.date}>{`${c.date} · `}</Text>
              {c.name}
            </Text>
          </View>
        ))}
      </Block>
      <Block title={data.labels.education}>
        {data.education.map((e, i) => (
          <View key={i} style={styles.entry}>
            <Text style={styles.strong}>{e.title}</Text>
            <Text style={styles.muted}>
              {e.school} · {e.period}
            </Text>
          </View>
        ))}
      </Block>
      <Block title={data.labels.languages}>
        {data.languages.map((l, i) => (
          <View key={i} style={styles.entry}>
            <Text style={styles.strong}>
              {l.name}
              <Text style={styles.date}> · {l.level}</Text>
            </Text>
          </View>
        ))}
      </Block>
    </View>
  );
}
