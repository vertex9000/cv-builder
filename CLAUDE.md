# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scopo

Generatore di CV in PDF con `@react-pdf/renderer` (Node/TypeScript). Tre dimensioni:

- **CV** indipendenti (nessuna versione base, nessun CV predefinito): i contenuti;
- **layout**: come si impagina un CV; il CV dichiara il proprio. Disponibile: `sidebar` (1 pagina A4, sidebar colorata e colonna principale);
- **temi**: predefinito (`out/cv-<nome>.pdf`) e ad alto contrasto, nero su bianco senza sfondi (`out/cv-<nome>-hc.pdf`).

Il codice e la documentazione sono generici: non devono contenere riferimenti ai contenuti di uno specifico CV (persone, aziende, esperienze). I CV reali stanno in `cv/` ma non vanno versionati (`.gitignore` ammette solo `cv/esempio.ts`).

## Comandi

- Tutti i comandi ricevono come argomento il **nome del CV**, cioè il file `cv/<nome>.ts` senza estensione, senza default; senza nome o con un nome inesistente si fermano elencando i CV. Esempio: `npm run build -- esempio`. Il nome passa ai processi figli nella variabile `CV_NAME` (`src/config.ts`).
- `npm run dev [-- <nome>]`: anteprima live nel browser con Vite (`src/dev.ts`; `preview/`, `vite.config.ts`): menu laterale con tutti i CV di `cv/` in ordine alfabetico e scelta del tema, e il documento del layout del CV scelto in un `PDFViewer`; si ricarica a ogni salvataggio. CV e tema stanno nell'indirizzo (`?cv=<nome>&theme=high-contrast`), quindi il cambio ricarica la pagina (necessario per il tema, letto al caricamento dei moduli). Il nome facoltativo (passato con `CV_NAME`) è il CV aperto all'avvio. Non sostituisce build e check.
- `npm run build -- <nome>`: genera il PDF del CV (`src/cli.ts` lancia `src/build.tsx` con `CV_NAME` e `CV_THEME`).
- `npm run watch -- <nome>`: rigenera a ogni modifica.
- `npm run check -- <nome>`: esce con codice 1 se il PDF manca o non ha il numero di pagine atteso dal layout del CV.
- `build`, `watch` e `check` accettano `--theme high-contrast` per il tema ad alto contrasto (default `default`).
- `npm run typecheck`: `tsc -p .` (niente emit) su codice e CV.

Dopo ogni modifica a contenuti o stile eseguire build e check del CV e controllare a vista la pagina rasterizzata: orfani, overflow, spazio vuoto in fondo non oltre circa il 15%.

## Architettura

- CV: file `cv/<nome>.ts` che esportano come **default** un `CvData` completo (`layout`, contatti in `contacts`, etichette delle sezioni e contenuti). Ogni CV è **indipendente**: nessuno spread da altri CV. Versionato solo il CV d'esempio fittizio `cv/esempio.ts`; gli altri sono locali, esclusi da `.gitignore`.
- `src/config.ts`: cartella `cv/`, elenco dei nomi, CV scelto (`CV_NAME`). `src/data/`: `types.ts` (tipo `CvData`), `cv.ts` (solo Node: caricamento del file con `import()` dinamico). L'anteprima carica i file di `cv/` con `import.meta.glob` sull'alias `@cv`, definito in `vite.config.ts`.
- `src/layouts/`: un layout per cartella, con documento, componenti e tema propri.
  - `names.ts`: nomi dei layout (separati dal registro perché `CvData.layout` li usa senza importare componenti);
  - `index.ts`: registro `nome -> { Document, pages, description }`; `pages` è il numero di pagine atteso da `check`;
  - `sidebar/`: `SidebarDocument.tsx` (un solo `Page`; sfondo e contenuto della sidebar in posizione assoluta e `fixed`, perché senza `fixed` react-pdf può spezzare lo sfondo su una seconda pagina vuota; colonna principale con `marginLeft` pari alla larghezza della sidebar), `components/` (Sidebar, Section, EmployerBlock, ExperienceItem, BulletList), `theme.ts` (palette dei ruoli per ogni tema e `sizes`).
- Le esperienze sono raggruppate per datore di lavoro (`employers: Employer[]`): testata con azienda, grado e periodo, poi le singole esperienze come titoli, con sotto-iniziative. Ruolo e periodo dell'esperienza sono facoltativi quando coincidono con quelli del datore di lavoro.
- Comune a tutti i layout:
  - `src/theme.ts`: nomi dei temi e tema scelto (`themeName`, da `CV_THEME` in Node o `?theme=` nel browser, letto al caricamento dei moduli perché i componenti creano gli stili con `StyleSheet.create` a livello di modulo; per questo `cli.ts` genera in un processo figlio), `primitives` (scala dei colori per nome di colore: `petrol`, `slate`, `neutral`), `alpha(primitiva, opacità)`, `fonts` e `registerFonts(fileFor)` (Source Sans 3, sottoinsieme *latin*, sillabazione disattivata). Deve restare utilizzabile nel browser: niente moduli Node;
  - `src/components/`: componenti generici parametrizzati da props, senza tema (`LinkIcon`, `QrCode`);
  - `src/fonts-node.ts` e `preview/fonts.ts`: sorgente dei font da disco e da URL di Vite;
  - `src/args.ts`, `src/cli.ts`, `src/build.tsx`, `src/check.ts`, `src/output.ts` (file `cv-<nome>[-hc].pdf`).
- Nuovo layout: cartella `src/layouts/<nome>/` con documento (`{ data: CvData }`), componenti e `theme.ts` con una palette per **ogni** tema in `themeNames`; aggiungere il nome in `names.ts` e la voce in `index.ts`. I colori nei temi si assegnano con le primitive, non con valori esadecimali; nei componenti usare solo i ruoli del proprio tema.

## Vincoli

- Nessun testo nei componenti: tutto, etichette comprese, sta nel file del CV.
- Il CV d'esempio (`cv/esempio.ts`) deve restare fittizio e generare una pagina valida: aggiornarla se cambia `CvData`.
- I testi dei CV sono calibrati sul layout (righe, orfani, pagina piena): spostare un CV su un altro layout richiede di rivederli.
- Layout `sidebar`: font non sotto 8.5pt (unica eccezione: la clausola privacy, a 6.5pt in verticale lungo il bordo sinistro della sidebar); se si sfora la pagina, tagliare contenuti prima. La sidebar è in posizione assoluta: se cresce troppo esce dal bordo inferiore **senza** creare una seconda pagina, quindi `check` non lo rileva. Dopo modifiche alla sidebar controllare a vista che le lingue, ultimo blocco, siano visibili.
- In react-pdf un `lineHeight` senza unità si risolve sul `fontSize` dello stesso stile (default 18 se solo ereditato): negli stili con `lineHeight` indicare sempre `fontSize`.
- Testo ruotato: applicare `transform: 'rotate(...)'` direttamente al `Text` in posizione assoluta. Ruotando un `View` che lo contiene, con il font registrato react-pdf non disegna il testo.
- Il sottoinsieme *latin* del font non contiene caratteri come `→`: evitarli nei testi.
- Rispondere all'utente in italiano.
