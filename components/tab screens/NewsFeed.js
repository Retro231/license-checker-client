import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import NewsCard from "../NewsCard";
import { getNews } from "../../helper/getNews";
import Loading from "../utils/Loading";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getNews();
      setNews(data);
      setLoading(false);

      return;
    };
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.news_area}>
        <Text style={styles.title}>Latest News: </Text>
        {!loading && news ? (
          <FlatList
            data={news}
            renderItem={({ item }) => (
              <NewsCard
                title={item.title}
                link={item.link}
                summary={item.summary}
              />
            )}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{ flex: 7, justifyContent: "center", alignItems: "center" }}
          >
            <Loading />
          </View>
        )}
      </View>
    </View>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  news_area: {
    flex: 7,
    margin: 10,
  },
  title: {
    color: "#039EBD",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
});
