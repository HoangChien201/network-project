import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NetworkRootBottomTabParams, NetworkRootBottomTabScreens } from "./NetworkRootBottomTabParams";
import { Keyboard, Animated, Easing } from 'react-native';

const Tab = createBottomTabNavigator<NetworkRootBottomTabParams>();

export default function NetworkBottomTab(): React.JSX.Element {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const tabBarAnimation = useRef(new Animated.Value(1)).current; // Initial opacity 1 (visible)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            Animated.timing(tabBarAnimation, {
                toValue: 0, // animate to opacity 0 (hidden)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            Animated.timing(tabBarAnimation, {
                toValue: 1, // animate to opacity 1 (visible)
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: '#1F1F2F',
                    margin: 20,
                    borderRadius: 15,
                    opacity: tabBarAnimation,
                    transform: [{
                        translateY: tabBarAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0], // move tab bar off screen when hidden
                        }),
                    }],
                },
                headerShown: false,
            }}
        >
            {NetworkRootBottomTabScreens.map((item) => (
                <Tab.Screen
                    key={item.id}
                    component={item.component}
                    name={item.name}
                    options={item.options}
                />
            ))}
        </Tab.Navigator>
    );
}
