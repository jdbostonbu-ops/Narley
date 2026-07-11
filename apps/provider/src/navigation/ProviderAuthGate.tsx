import { Pressable, Text } from "react-native";

import { useAuth } from "../auth/useAuth";

export const ProviderAuthGate = () => {
  const { user, loading } = useAuth();

  if (loading || user !== null) {
    return null;
  }

  return (
    <Pressable accessibilityLabel="Log In" accessibilityRole="button">
      <Text>Log In</Text>
    </Pressable>
  );
};
