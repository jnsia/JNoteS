import { View, Text } from "react-native";
import React from "react";

const Button = (props: any) => {
  const { text, clickEvent } = props;

  return (
    <View>
      <Text>Button</Text>
    </View>
  );
};

export default Button;
