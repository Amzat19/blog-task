export default function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  // Extract date components
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day: string = String(date.getDate()).padStart(2, "0");
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");

  // Create the formatted timestamp string
  const formattedTimestamp: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTimestamp;
}
