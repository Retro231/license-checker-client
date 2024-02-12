/**
 * Fuction to get Home Options Data from api
 * @param type - String, Value: active | newAdded | removed
 * @param pageIndex - Number
 * @param pageSize - Number (optional) default value: 20
 * */

export const getHomeOptionsData = async (type, pageIndex, pageSize) => {
  try {
    let url;
    if (type === "active") {
      url = `http://192.168.0.104:3000/activeOrg/${pageIndex}/${pageSize}?`;
    } else if (type === "newAdded") {
      url = `http://192.168.0.104:3000/newAddedOrg/${pageIndex}/${pageSize}?`;
    } else {
      url = `http://192.168.0.104:3000/removedOrg/${pageIndex}/${pageSize}?`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network request failed");
    }

    const data = await response.json();
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching dummy JSON:", error.message);
  }
};
