const getData = async (name) => {
  const encodedInput = encodeURIComponent(name);
  const apiEndPoint = `https://codebothub.com/company`;
  try {
    const response = await fetch(`${apiEndPoint}/companyhouse/${encodedInput}`);

    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching dummy JSON:", error.message);
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const capitalizeEachWord = (sentence) => {
  return sentence
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};

const getAdditoinalInfo = async (name) => {
  const response = await getData(name);
  const data = response?.data.items;
  let uppercase = name.toUpperCase();
  let lowercase = name.toLowerCase();
  let capitalizedSentence = capitalizeEachWord(name);

  // return response;
  for (let i = 0; i < data.length; i++) {
    let title = data[i].title;
    if (
      title === uppercase ||
      title === lowercase ||
      title === capitalizedSentence
    ) {
      const status = capitalizeEachWord(data[i].company_status);
      const address_snippet = data[i].address_snippet;

      return { status, address_snippet };
    }
  }
  return null;
};

export const companyHouseSearch = async (item) => {
  let additonalInfo = null;
  const name = item["Organisation Name"];
  const csvResult = item;
  additonalInfo = await getAdditoinalInfo(name);

  // expected types of json:
  // 1. csvResult.length === 1 , additonalInfo found / not found
  // 2. csvResult.length > 1, additonalInfo === null,
  // 3. csvResult.length === 0,additonalInfo === null

  if (csvResult) {
    if (additonalInfo === null) {
      // do something
      return {
        company_name: csvResult["Organisation Name"],
        address: `${csvResult["Town/City"]}, ${csvResult["County"]}`,
        license_tier: `${csvResult["Type & Rating"]}, ${csvResult["Route"]}`,
        status: null,
      };
    } else {
      //do something
      return {
        company_name: csvResult["Organisation Name"],
        address: additonalInfo["address_snippet"],
        license_tier: `${csvResult["Type & Rating"]}, ${csvResult["Route"]}`,
        status: additonalInfo["status"],
      };
    }
  }
};
