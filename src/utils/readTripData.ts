import Papa from 'papaparse';

const GOOGLE_SHEETS_URL_CRYPTED = 'aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMUx5eU1vT0hlRlI1TDFDMmdSZlZGNkMzcmdNdFB1ME5IaGR1TkQ4OVBNZU0vZXhwb3J0P2Zvcm1hdD1jc3Y=';
const DEFAULT_CSV_PATH = '/voyage/trip-data.csv';

const decrypt = (encrypted: string): string => {
  try {
    return atob(encrypted);
  } catch (error) {
    console.error('Erreur de déchiffrement:', error);
    return '';
  }
};

export const readTripData = async () => {
  try {
    // Déchiffrement et tentative de lecture depuis Google Sheets
    const GOOGLE_SHEETS_URL_UNCRYPTED = decrypt(GOOGLE_SHEETS_URL_CRYPTED);
    const response = await fetch(GOOGLE_SHEETS_URL_UNCRYPTED);
    if (response.ok) {
      const csvData = await response.text();
      return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (error: any) => reject(error)
        });
      });
    }
  } catch (error) {
    console.log('Impossible de lire Google Sheets, utilisation du CSV local');
  }

  // Fallback vers le fichier CSV local
  try {
    const response = await fetch(DEFAULT_CSV_PATH);
    const csvData = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error: any) => reject(error)
      });
    });
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier CSV:', error);
    throw error;
  }
};