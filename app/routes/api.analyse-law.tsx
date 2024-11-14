// In `app/routes/api/analyse-law.ts`
import { json } from '@remix-run/node';
import OpenAI from 'openai';

export const action = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }
  const { content } = await request.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const principles = [
    'Digitale Kommunikation sicherstellen\n' +
      'Darum ist das wichtig\n' +
      'Bürgerinnen und Bürger, Mitarbeitende in Unternehmen, weiteren Organisationen und der Verwaltung sind meist an digitale Kommunikation gewöhnt. In der Verwaltung und den Behörden erlaubt eine durchgehend digitale Dokumentation, Bearbeitung und ggf. Prüfung eine effizientere Bearbeitung.\n' +
      'Digitale Kommunikation sollte immer bedarfsorientiert und inklusiv sein — in bestimmten Fällen kann z. B. ergänzend auch die Schriftform sinnvoll sein, sofern eine digitale Weiterverarbeitung sichergestellt ist.\n' +
      '\n' +
      'Tipps für Ihr Regelungsvorhaben\n' +
      'Wählen Sie Formulierungen, die den Einsatz von unterschiedlichen Medien, Technologien und Verfahren ermöglichen.\n' +
      'Sollten Sie technologische Lösungen festschreiben, ermöglichen Sie den Einsatz von offenen Technologien, so sorgen Sie für Transparenz und Wiederverwendbarkeit.\n' +
      'Ersetzen oder ergänzen Sie Schriftformerfordernisse und analoge Nachweispflichten. Prüfen Sie etwa, ob die Textform ausreichend ist und ermöglichen Sie die digitale Bearbeitung.\n' +
      'Vermeiden Sie Medienbrüche. Diese können z. B. durch visuelle Darstellung des Vollzugs, wie Flussdiagramme, erkennbar werden.\n' +
      'Erfüllen Sie Anforderungen der Barrierefreiheit und beachten Sie die Bedarfe unterschiedlicher Personengruppen.',
    'Wiederverwendung von Daten und Standards ermöglichen\n' +
      'Darum ist das wichtig\n' +
      'Häufig sind Daten von Personen oder Organisationen in verschiedenen Prozessen relevant. Das heißt, dass die Daten, die für Ihr Regelungsvorhaben benötigt werden, an anderer Stelle bereits vorliegen könnten. Sie sollten wiederverwendet werden, damit Bürgerinnen und Bürger oder Unternehmen Daten kein weiteres Mal angeben müssen und Verfahren vereinfacht werden. Auch die Wiederverwendung von Open-Source-Software, Standards oder sogar einzelner Design- oder Software-Komponenten vereinfacht Verfahren und spart Ressourcen.\n' +
      '\n' +
      'Tipps für Ihr Regelungsvorhaben\n' +
      'Recherchieren Sie für Ihr Regelungsvorhaben relevante bestehende Standards, Komponenten, Richtlinien, Verfahren zur Datenerfassung, Datenaustauschverfahren (Once-Only-Prinzip) sowie Register und weitere Quellen. Erste Anhaltspunkte finden Sie zum Beispiel auf:\n' +
      '\n' +
      'der Verwaltungsdaten-Informationsplattform: verwaltungsdaten-informationsplattform.de \n' +
      'der Registerlandkarte: registerlandkarte.de \n' +
      'der Open-Source-Plattform der Verwaltung: opencode.de ',
    'Datenschutz und Informationssicherheit gewährleisten\n' +
      'Darum ist das wichtig\n' +
      'Datenschutz und Informationssicherheit sind zentrale Voraussetzungen für praxistaugliche Digitalisierung — frühzeitig mitgedacht können Bedürfnisse von Betroffenen auf einfache Weise mit Daten- und Informationssicherheit vereinbart werden. Das Regelungsvorhaben soll eine datenschutzkonforme Umsetzung ermöglichen: Vor der Erhebung von Daten muss definiert werden, welche Daten zu welchem Zweck benötigt und wie sie geschützt werden.\n' +
      '\n' +
      'Tipps für Ihr Regelungsvorhaben\n' +
      'Beteiligen Sie frühzeitig Expertinnen und Experten für Datenschutz und Informationssicherheit, um datenschutzkonforme Regelungen zu schreiben. Anhaltspunkte dafür geben auch geltende Richtlinien und Ausführungsbestimmungen z.B. vom BSI.\n' +
      'Schaffen Sie die Rechtsgrundlage, um alle benötigten Daten zu erfassen und zu verarbeiten.\n' +
      'Berücksichtigen Sie die finanziellen und personellen Ressourcen, die für die Umsetzung der Vorgaben der Informationssicherheit nötig sind.',
    'Klare Regelungen für eine digitale Ausführung finden\n' +
      'Darum ist das wichtig\n' +
      'Durch eindeutige und klare Formulierungen können die Regelungen verständlich dargestellt und die digitale Umsetzung erleichtert werden. Komplizierte, schwer verständliche Regelungskonstrukte erschweren eine digitale Ausführung.\n' +
      '\n' +
      'Tipps für Ihr Regelungsvorhaben\n' +
      'Formulieren Sie die Texte Ihres Regelungsvorhaben so, dass es in der Umsetzung in Auf- gaben und chronologische Schritte übersetzt werden kann.\n' +
      'Formulieren Sie klare Entscheidungsstrukturen. Nutzen Sie dafür eindeutige Kriterien und eine kohärente und logische Systematik. Ausnahmen sind klar gekennzeichnet. Testen Sie die Verständlichkeit mit den Personen, die an der Umsetzung beteiligt sind.\n' +
      'Versuchen Sie, Rechtsbegriffe zu harmonisieren. Verwenden Sie definierte Rechtsbegriffe aus Ihrem Rechtsbereich. Auslegungen verhindern eine einheitliche Umsetzung.',
    'Automatisierung ermöglichen\n' +
      'Darum ist das wichtig\n' +
      'Digitale Lösungen zu erstellen, ist zunächst aufwändig. Die “Duplikation” oder Skalierung kostet jedoch (fast) nichts. Daher ist es personell und wirtschaftlich sinnvoll, sich wiederholende Schritte, Prozesse oder Vorgehen zu automatisieren. Ein Regelungsvorhaben, das Ermessensspielraum lässt, kann nicht vollständig automatisiert werden: Soweit es dem Regelungsziel dient, sollte darauf verzichtet werden. Dadurch entstehen zeitliche und finanzielle Freiräume für Fälle, die eine gesonderte Auseinandersetzung benötigen.\n' +
      '\n' +
      'Tipps für Ihr Regelungsvorhaben\n' +
      'Schaffen Sie die rechtlichen Möglichkeiten für automatisierte und/oder antragslose Verfahren. Prüfen Sie z. B. die Möglichkeit von Pauschalen.\n' +
      'Formulieren Sie klare Entscheidungsstrukturen. Nutzen Sie dafür eindeutige Kriterien und eine kohärente und logische Systematik. Beziehen Sie IT-Expertise mit ein.\n' +
      'Versuchen Sie, Rechtsbegriffe zu harmonisieren. Verwenden Sie definierte Rechtsbegriffe aus Ihrem Rechtsbereich. Auslegungen verhindern die vollständige Automatisierung von Umsetzungsprozessen.',
  ];

  const prompt = `Analysiere den folgenden Gesetzestext basierend auf diesen Prinzipien der digitaltauglichen 
    Regelungsgestaltung:\n${principles.join('\n')}\nBitte identifiziere gut gestaltete Aspekte und Bereiche, 
    die verbessert werden könnten. Fasse dich kurz. Gib zuerst eine allgemeine Übersicht, dann spezifiziere die 
    Paragraphen, die verbessert werden können. Wenn der Gesetzestext an sich keinen Sinn ergibt, 
    dann antworte entsprechend ohne Prinzipienauswertung. Antworte in markdown`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: `Gesetzestext:\n${content}` },
    ],
  });

  return json({ analysis: response.choices[0].message.content });
};
