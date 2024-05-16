export default async function handler(req, res) {
  try {
    const response = await fetch("https://livestream.ardarmutcu.com/status.php");
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}