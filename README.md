# Gesetzesanalyse-Projekt mit Remix

🚧 **Work in Progress** 🚧  
Dieses Projekt dient zur Verwaltung und Analyse von Gesetzestexten auf Grundlage der Prinzipien der digitalen Regelungsgestaltung. Mit der OpenAI API werden Gesetze analysiert, um ihre Tauglichkeit für die digitale Anwendung zu bewerten.

## Zweck

Die Anwendung ermöglicht:
- **Speicherung** von Gesetzen in einer MongoDB-Datenbank.
- **Analyse** eines ausgewählten Gesetzes basierend auf Prinzipien wie Barrierefreiheit, Datenwiederverwendung und Automatisierbarkeit.
- **Präsentation** der Analyse direkt in der Benutzeroberfläche, um gut gestaltete und verbesserungswürdige Bereiche des Gesetzestextes aufzuzeigen.

## Installation

1. **Repository klonen**
   ```shell
   git clone <repository-url>
   cd <project-directory>

2. **Repository klonen**
Erstelle eine .env-Datei und füge die Datenbank-URL und den OpenAI-API-Schlüssel hinzu:
   ```shell
    DATABASE_URL="your-mongodb-url"
    OPENAI_API_KEY="your-openai-api-key"

3. **Abhängigkeiten installieren und Prisma konfigurieren**
    ```shell
    npm install
    npx prisma generate
4.  **Entwicklungsserver starten**
    ```shell
    npm run dev

## Nutzung

- **Gesetz hinzufügen**: Über die Oberfläche können neue Gesetze hinzugefügt und in der Datenbank gespeichert werden.
- **Analyse durchführen**: Wählen Sie ein Gesetz aus und klicken Sie auf "Analysieren", um die Bewertung basierend auf digitaltauglichen Prinzipien anzuzeigen.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
