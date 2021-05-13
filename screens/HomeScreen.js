import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { onChange } from "react-native-reanimated";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { backgroundColor: "black" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 15 }}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar
                rounded
                source={{
                  uri:
                    "https://cencup.com/wp-content/uploads/2019/07/avataer-placeholder.png" ||
                    auth?.currentUser?.photoUrl,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddChat");
              }}
              activeOpacity={0.5}
            >
              <SimpleLineIcons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    console.log(id)
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
