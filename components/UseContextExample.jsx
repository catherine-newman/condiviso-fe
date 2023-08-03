import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../contexts/User";


const contextExample = () => {
    const { user } = useContext(UserContext); 
 
    return (
      <View>
    
          <Text>Hello {user}!</Text>
   
      </View>
    );
  };
  
  export default contextExample;
  