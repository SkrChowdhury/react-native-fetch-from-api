import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";

const HookEffects = () => {
  const [myUserData, setMyUserData] = useState();
  const [isLoaded, setIsLoaded] = useState(true);

  const getUserdata = async () => {
    try {
      const response = await fetch(
        "https://thapatechnical.github.io/userapi/users.json"
      );
      const myData = await response.json();
      setMyUserData(myData);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 10 }}>
        List of Students
      </Text>
      {isLoaded
        ? <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        : <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={myUserData}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <View style={styles.imgContainer}>
                      <Image
                        style={styles.imgStyles}
                        resizeMode="cover"
                        source={{ uri: item.image }}
                      />
                    </View>

                    <View>
                      <View style={styles.bioDataContainer}>
                        <Text style={styles.bioData}>Bio-Data</Text>
                        <Text style={styles.idNumber}>
                          {item.id}
                        </Text>
                      </View>

                      <View style={{ padding: 20 }}>
                        <Text style={styles.myname}>
                          Name: {item.name}
                        </Text>
                        <Text style={styles.myname}>
                          Email: {item.email}
                        </Text>
                        <Text style={styles.myname}>
                          Mobile: {item.mobile}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>}
    </View>
  );
};

export default HookEffects;

const styles = StyleSheet.create({
  loader: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  mainContainer: {
    width: "100%",
    paddingTop: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "60%",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#708090",
    borderWidth: 1,
    borderColor: "#3cb371",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.56,
    shadowRadius: 3.84,
    elevation: 5
  },
  imgStyles: {
    width: "100%",
    height: 200
  },
  bioDataContainer: {
    width: "100%",
    display: "flex",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    fontFamily: "JosefinSans_400Regular"
  },
  myname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
});
