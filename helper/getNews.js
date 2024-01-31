export const getNews = async () => {
  try {
    const response = await fetch(`http://192.168.0.104:3000/newsfeed`);

    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching dummy JSON:", error.message);
  }
};
