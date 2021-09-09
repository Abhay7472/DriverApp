import React from 'react';
import { Dimensions } from "react-native";
export const phoneHeight = () => {
    const height = Dimensions.get("screen").height;
    return height;
}