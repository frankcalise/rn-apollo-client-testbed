import { Stack } from "expo-router";
import { Text, Box, Link } from "../src/components";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen options={{ title: "Home Page" }} />
      <Box variant="page">
        <Text variant="heading1">Apollo Client Issue #11138</Text>
        <Text variant="heading2">InMemoryCache</Text>
        <Box flexGrow={1} marginTop="l" padding="m">
          <Text variant="heading2">Repro Steps</Text>
          <Text variant="step">1. Tap (A) `no-cache` option</Text>
          <Text variant="observe">Observe: navigation is instant</Text>
          <Text />
          <Text variant="step">2. Return to this Home Page</Text>
          <Text />
          <Text variant="step">3. Tap (B) `cache-first` with ScrollView</Text>
          <Text variant="observe">
            - Navigation is instant, screen transitions
          </Text>
          <Text variant="observe">
            - Loading is displayed (hitting network)
          </Text>
          <Text />
          <Text variant="step">4. Return to this Home Page</Text>
          <Text />
          <Text variant="step">5. Tap (B) `cache-first` for the 2nd time</Text>
          <Text variant="observe">- Navigation is delayed</Text>
          <Text variant="observe">
            - Link stays in pressed state while cache being read
          </Text>
          <Text variant="observe">- Screen then transitions</Text>
          <Text variant="observe">
            - No loading message displayed (cache hit)
          </Text>
          <Text />
          <Text variant="step">6. Come back to this Home Page</Text>
          <Text />
          <Text variant="step">5. Tap (C) `cache-first` with FlatList</Text>
          <Text variant="observe">
            - Navigation is instant, screen transitions
          </Text>
          <Text variant="observe">- Cache data loaded</Text>
        </Box>

        <Box
          flexGrow={1}
          justifyContent="flex-end"
          marginBottom="xl"
          alignItems="center"
        >
          <Text variant="observe" marginBottom="l">
            Press `R` to reload app and reset cache
          </Text>
          <Link
            href={{
              pathname: `/launch`,
              params: { fetchPolicy: "no-cache", flatList: false },
            }}
          >
            (A) no-cache
          </Link>
          <Link
            href={{
              pathname: `/launch`,
              params: { fetchPolicy: "cache-first", flatList: false },
            }}
          >
            (B) cache-first (ScrollView)
          </Link>
          <Link
            href={{
              pathname: `/launch`,
              params: { fetchPolicy: "cache-first", flatList: true },
            }}
          >
            (C) cache-first (FlatList)
          </Link>
        </Box>
      </Box>
    </>
  );
}
