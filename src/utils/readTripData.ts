import Papa from 'papaparse';
interface TransportDataItem {
  Category: string;
  Subcategory: string;
  Item: string;
  Details: string;
}
export const readTripData = async () : Promise<TransportDataItem[]>=> {
  try {
    // const basePath = import.meta.env.MODE === 'production' ? '/voyage' : '';
    // const response = await fetch(`${basePath}/trip-data.csv`);
    // const response = await fetch(`voyage/trip-data.csv`);// ok prod
    const response = await fetch(`${import.meta.env.BASE_URL}trip-data.csv`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    const { data } = Papa.parse(csvText, { header: true });
    return data as TransportDataItem[];;
  } catch (error) {
    console.error('Error loading trip data:', error);
    throw error;
  }
};