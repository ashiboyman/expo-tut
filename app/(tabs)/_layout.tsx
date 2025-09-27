import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{ tabBarActiveTintColor: "coral" }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Homed",
                        tabBarIcon: ({ color, focused }) => {
                            return focused ? (
                                <FontAwesome
                                    name="home"
                                    size={24}
                                    color={color}
                                />
                            ) : (
                                <Feather
                                    name="home"
                                    size={24}
                                    color={color}
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="login"
                    options={{
                        title: "Login",
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons
                                name="login"
                                size={24}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
