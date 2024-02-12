/** Fuction to get search result from api */
export const getSearchResult = async (companyName) => {
  const encodedInput = encodeURIComponent(companyName);
  try {
    const response = await fetch(
      `http://192.168.0.104:3000/company/${encodedInput}`
    );

    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching dummy JSON:", error.message);
  }
};
