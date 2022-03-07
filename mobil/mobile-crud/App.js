import React from "react";
// import {Text} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen"
import AddScreen from "./screens/AddScreen"

const Stack = createStackNavigator()

const App = ()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App