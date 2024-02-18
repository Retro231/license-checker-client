/** Fuction to get search result from api */
export const getSearchResult = async (companyName) => {
  const encodedInput = encodeURIComponent(companyName);
  const apiEndPoint = `https://codebothub.com/company`;
  try {
    const response = await fetch(`${apiEndPoint}/${encodedInput}`);

    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching dummy JSON:", error.message);
  }
};
