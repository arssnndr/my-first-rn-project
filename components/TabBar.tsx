import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function TabBar({ state, descriptors, navigation }) {
    const primaryColor = "#0891b2";
    const greyColor = "#737373";

    const icons = {
        index: (props) => (
            <AntDesign name="home" size={24} color={greyColor} {...props} />
        ),
        create: (props) => (
            <AntDesign
                name="pluscircleo"
                size={24}
                color={greyColor}
                {...props}
            />
        ),
        explore: (props) => (
            <Feather name="home" size={24} color={greyColor} {...props} />
        ),
        profile: (props) => (
            <AntDesign name="user" size={24} color={greyColor} {...props} />
        ),
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                if (["_sitemap", "+not-found"].includes(route.name))
                    return null;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                        style={styles.tabBarItem}
                    >
                        {icons[route.name]({
                            color: isFocused ? primaryColor : greyColor,
                        })}
                        <Text
                            style={{
                                color: isFocused ? primaryColor : greyColor,
                                fontSize: 11,
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        width: "90%",
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: "5%",
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: "continuous",
        elevation: 10,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
    },
});
