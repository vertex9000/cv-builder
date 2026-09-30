import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Bullet, RichText } from '../../../data/types';
import { colors, sizes } from '../theme';
import { LinkIcon } from '../../../components/LinkIcon';

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginBottom: 1.5 },
  dot: { width: 8, color: colors.accent, fontWeight: 700 },
  body: { flex: 1, fontSize: sizes.body, lineHeight: sizes.lineHeight },
  title: { fontWeight: 600 },
  link: { color: colors.accent, textDecoration: 'none' },
  // Bullet di soli link: icona + link, in fila e a capo se non stanno su una riga.
  links: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  linkTitle: { fontSize: sizes.body, lineHeight: sizes.lineHeight, fontWeight: 600, marginRight: 4 },
  linkItem: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  linkText: { fontSize: sizes.body, lineHeight: sizes.lineHeight, color: colors.accent, textDecoration: 'none' },
  icon: { marginRight: 2.5 },
});

function renderRich(text: RichText) {
  if (typeof text === 'string') return text;
  return text.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <Link key={i} src={part.href} style={styles.link}>
        {part.text}
      </Link>
    ),
  );
}

export function BulletList({ items }: { items: Bullet[] }) {
  return (
    <View>
      {items.map((b, i) => (
        <View key={i} style={styles.item} wrap={false}>
          {/* Le file di link non hanno il pallino, ma restano allineate al testo dei bullet. */}
          <Text style={styles.dot}>{b.links ? '' : '•'}</Text>
          {b.links ? (
            <View style={styles.links}>
              {b.title ? <Text style={styles.linkTitle}>{b.title}:</Text> : null}
              {b.links.map((l, j) => (
                <View key={j} style={styles.linkItem}>
                  <View style={styles.icon}>
                    <LinkIcon size={sizes.small} color={colors.accent} />
                  </View>
                  <Link src={l.href} style={styles.linkText}>
                    {l.text}
                  </Link>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.body}>
              {b.title ? <Text style={styles.title}>{b.title}: </Text> : null}
              {b.href ? (
                <Link src={b.href} style={styles.link}>
                  {renderRich(b.text ?? '')}
                </Link>
              ) : (
                renderRich(b.text ?? '')
              )}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
