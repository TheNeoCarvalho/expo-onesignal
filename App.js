import React, { useEffect } from "react";
import { StyleSheet, Text, View, styleSheet } from "react-native";
import OneSignal from "react-native-onesignal";
import { StatusBar } from "expo-status-bar";
// import OneSignal from "react-native-onesignal";
// import OneSignal from "onesignal";
//1d3edfc0-967e-4e78-a8c4-6fbfd1941ac6

export default App = () => {
  useEffect(() => {
    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("1d3edfc0-967e-4e78-a8c4-6fbfd1941ac6");

    //END OneSignal Init Code

    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log("Prompt response:", response);
    });

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        console.log(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log("notification: ", notification);
        const data = notification.additionalData;
        console.log("additionalData: ", data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
    });
  }, []);

  const onOpened = (openResult) => {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Opa...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "#fff",
  },
});
