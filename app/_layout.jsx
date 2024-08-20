import { Stack } from "expo-router";
import {
  QueryClient,
  QueryClientProvider
} from "react-query";
export const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="transfer"
          options={{ title: "Transfer" }}
        />
        <Stack.Screen
          name="scan"
          options={{ title: "Scan" }}
        />
        <Stack.Screen
          name="fxrate"
          options={{ title: "Exchange Rate" }}
        />
        <Stack.Screen
          name="history"
          options={{ title: "History" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "Login" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, title: "Register" }}
        />
        <Stack.Screen
          name="welcome"
          options={{ headerShown: false, title: "welcome" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}

