import { Stack } from "expo-router";
import { Text, Box, Link } from "../src/components";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Home Page" }} />
      <Box variant="page">
        <Text variant="heading1">Apollo Client Issue #11138</Text>
        <Text variant="heading2">InMemoryCache</Text>
        <Box flexGrow={1} marginTop="xl" padding="m">
          <Text variant="heading2">Repro Steps</Text>
          <Text variant="step">1. View launches (A) w/ `no-cache` option</Text>
          <Text variant="observe">Observe: navigation is instant</Text>
          <Text />
          <Text variant="step">2. Come back to this Home Page</Text>
          <Text />
          <Text variant="step">3. View launches (B) w/ any cache option</Text>
          <Text variant="observe">
            - Navigation is instant, screen transitions
          </Text>
          <Text variant="observe">
            - Loading is displayed (hitting network)
          </Text>
          <Text />
          <Text variant="step">4. Come back to this Home Page</Text>
          <Text />
          <Text variant="step">5. View launches (B) a second time</Text>
          <Text variant="observe">- Navigation is delayed</Text>
          <Text variant="observe">
            - Link stays in pressed state while cache being read
          </Text>
          <Text variant="observe">- Screen then transitions</Text>
          <Text variant="observe">
            - No loading message displayed (cache hit)
          </Text>
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
            href={{ pathname: `/launch`, params: { fetchPolicy: "no-cache" } }}
          >
            (A) View launches (no cache)
          </Link>
          <Link
            href={{
              pathname: `/launch`,
              params: { fetchPolicy: "cache-first" },
            }}
          >
            (B) View launches (cache look up)
          </Link>
        </Box>
      </Box>
    </>
  );
}
