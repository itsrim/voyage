import Papa from 'papaparse';
interface TransportDataItem {
  Category: string;
  Subcategory: string;
  Item: string;
  Details: string;
}
export const readTripData = async () : Promise<TransportDataItem[]>=> {
  try {
    const basePath = process.env.NODE_ENV === 'production' ? '/trip' : '';
    const response = await fetch(`${basePath}/trip-data.csv`);
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