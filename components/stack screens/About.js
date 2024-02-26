import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderNavigate from "../HeaderNavigate";

const About = () => {
  return (
    <View style={styles.container}>
      <HeaderNavigate />
      <Text style={styles.title}>About Us: </Text>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Welcome to our app, your comprehensive guide to navigating the world
          of UK work permits and sponsor licenses. Whether you're an employee
          seeking information about your company's sponsorship status and
          updates or a prospective job seeker exploring opportunities in the UK
          job market and want to learn more about your company, we've got you
          covered.
        </Text>
        <Text style={styles.contentText}>
          With our app, you can effortlessly access up-to-date information on
          all UK companies and their sponsor license status, location and so on.
          Stay informed about the latest news and updates regarding UK work
          permits and job market, ensuring you're always in the know about
          changes that may affect your employment status.
        </Text>
        <Text style={styles.contentText}>
          Creating a profile in our app allows you to personalize your
          experience further. Simply provide your company name, and unlock a
          wealth of information tailored specifically to your workplace. From
          company details to visa extension and expiry reminders, managing your
          immigration status has never been easier. Download now and take
          control of your UK work permit journey with ease.
        </Text>
        <Text style={styles.contentText}>Thank You.❤</Text>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    color: "#039EBD",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
  content: {
    gap: 10,
  },
  contentText: {
    textAlign: "justify",
    marginHorizontal: 10,
    fontWeight: "400",
    color: "black",
    fontSize: 14,
  },
});
