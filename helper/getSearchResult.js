/** Fuction to get search result from api */
export const getSearchResult = async (companyName) => {
  try {
    const response = await fetch(
      `http://192.168.0.104:3000/company/${companyName}`
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
