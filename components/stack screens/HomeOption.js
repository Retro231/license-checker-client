import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderNavigate from "../HeaderNavigate";
import HomeOptionCard from "../HomeOptionCard";
import Pagination from "../utils/Pagination";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveOrg,
  setNewAddedOrg,
  setRemovedOrg,
} from "../../slices/appSlice";
import Loading from "../utils/Loading";
import { getHomeOptionsData } from "../../helper/getHomeOptionsData";

const HomeOption = () => {
  const route = useRoute();
  const { caption } = route.params;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("active");
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (caption === "active") {
        const activeOrg = await getHomeOptionsData("active", pageIndex);
        setTitle("Active Organaizations");
        setData(activeOrg.activeOrganaizations);
        setPageIndex(activeOrg.pageIndex);
        setTotalPages(activeOrg.totalPages);
      } else if (caption === "new") {
        const newAddedOrg = await getHomeOptionsData("newAdded", pageIndex);
        setTitle("New Added Organaizations");
        setData(newAddedOrg.newAddedOrganizations);
        setPageIndex(newAddedOrg.pageIndex);
        setTotalPages(newAddedOrg.totalPages);
      } else {
        const removedOrg = await getHomeOptionsData("removed", pageIndex);
        setTitle("License Removed");
        setData(removedOrg.removedOrganizations);
        setStatus("removed");
        setPageIndex(removedOrg.pageIndex);
        setTotalPages(removedOrg.totalPages);
      }
      setLoading(false);
      return;
    };
    getData();
  }, [pageIndex]);

  const handlePrev = () => {
    if (pageIndex > 1) setPageIndex(pageIndex - 1);
  };
  const handleNext = () => {
    if (pageIndex < totalPages) setPageIndex(pageIndex + 1);
  };

  return (
    <View style={styles.container}>
      <HeaderNavigate />
      <View style={styles.news_area}>
        <Text style={styles.title}>{title}</Text>
        <Pagination
          pageIndex={pageIndex}
          totalPages={totalPages}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        {!loading ? (
          data.length !== 0 ? (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <HomeOptionCard data={item} status={status}></HomeOptionCard>
              )}
              keyExtractor={(_, index) => index}
              keyboardShouldPersistTaps="always"
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <Pagination
                  pageIndex={pageIndex}
                  totalPages={totalPages}
                  handlePrev={handlePrev}
                  handleNext={handleNext}
                />
              }
            />
          ) : (
            <View>
              <Text style={{ textAlign: "center" }}>No Data Found!</Text>
            </View>
          )
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
};

export default HomeOption;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  news_area: {
    flex: 7,
    marginHorizontal: 10,
  },
  title: {
    color: "#039EBD",
    fontSize: 20,
    margin: 10,
    marginTop: 0,
    fontWeight: "bold",
  },
});
