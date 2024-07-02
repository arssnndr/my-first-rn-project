import { View, Text } from "react-native";
import React from "react";
import ColorList from "@/components/ColorList";

export default function Home() {
    return (
        <View>
            <ColorList color="red" />
        </View>
    );
}
