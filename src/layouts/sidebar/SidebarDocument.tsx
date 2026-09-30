import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { CvData } from '../../data/types';
import { BulletList } from './components/BulletList';
import { EmployerBlock } from './components/EmployerBlock';
import { QrCode } from '../../components/QrCode';
import { Section } from './components/Section';
import { Sidebar } from './components/Sidebar';
import { fonts } from '../../theme';
import { colors, sizes } from './theme';

const A4_HEIGHT = 841.89;
const PRIVACY_LENGTH = 780;
const PRIVACY_X = 10;

const styles = StyleSheet.create({
  page: {
    fontFamily: fonts.family,
    fontSize: sizes.body,
    color: colors.text,
    paddingTop: sizes.pagePaddingY,
    paddingBottom: sizes.pagePaddingY,
  },
  sidebarBg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: sizes.sidebarWidth,
    backgroundColor: colors.sidebarBg,
    borderRightWidth: colors.sidebarBorderWidth,
    borderRightColor: colors.sidebarDivider,
  },
  sidebar: {
    position: 'absolute',
    top: sizes.pagePaddingY,
    left: 0,
    width: sizes.sidebarWidth,
    paddingLeft: sizes.sidebarPaddingLeft,
    paddingRight: sizes.sidebarPaddingX,
    color: colors.sidebarText,
  },
  main: {
    marginLeft: sizes.sidebarWidth,
    paddingHorizontal: sizes.mainPaddingX,
  },
  paragraph: { fontSize: sizes.body, lineHeight: sizes.lineHeight, marginBottom: 3 },
  // Interessi: elenco a sinistra, QR code facoltativo a destra alla stessa altezza.
  interestsRow: { flexDirection: 'row', alignItems: 'flex-start' },
  interestsList: { flex: 1 },
  qr: { marginLeft: 10 },
  // Clausola privacy in verticale lungo il bordo sinistro della sidebar, letta dal basso verso l'alto.
  // Si ruota il Text stesso attorno al proprio centro: ruotando un View contenitore, con il font
  // registrato react-pdf non disegna il testo. Unica eccezione al minimo di 8.5pt.
  privacy: {
    position: 'absolute',
    width: PRIVACY_LENGTH,
    left: PRIVACY_X - PRIVACY_LENGTH / 2,
    top: A4_HEIGHT / 2 - 4,
    fontSize: 6.5,
    color: colors.sidebarMuted,
    textAlign: 'center',
    letterSpacing: 0.6,
    transform: 'rotate(-90deg)',
  },
});

// Layout "sidebar": una pagina A4, sidebar a sinistra e colonna principale.
export function SidebarDocument({ data }: { data: CvData }) {
  const { contacts } = data;
  const hasInterests = Boolean(data.interests?.length);
  return (
    <Document title={`${contacts.name} – CV`} author={contacts.name} language={data.lang}>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebarBg} fixed />
        <View style={styles.sidebar} fixed>
          <Sidebar data={data} />
        </View>
        {data.privacy ? (
          <Text style={styles.privacy} fixed>
            {data.privacy}
          </Text>
        ) : null}
        <View style={styles.main}>
          <Section title={data.labels.profile}>
            {data.profile.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </Section>
          <Section title={data.labels.experience} last={!hasInterests}>
            {data.employers.map((e, i) => (
              <EmployerBlock key={i} employer={e} last={!hasInterests && i === data.employers.length - 1} />
            ))}
          </Section>
          {hasInterests ? (
            <Section title={data.labels.interests} minPresenceAhead={12} last>
              <View style={styles.interestsRow}>
                <View style={styles.interestsList}>
                  <BulletList items={data.interests ?? []} />
                </View>
                {data.interestsQr ? (
                  <View style={styles.qr}>
                    <QrCode value={data.interestsQr} size={sizes.qrSize} color={colors.text} />
                  </View>
                ) : null}
              </View>
            </Section>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
