import { useQuery } from "@apollo/client";
import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Box, Link, Pressable, Text } from "../../src/components";
import { LaunchListDocument } from "../../src/queries";
import { isDefined } from "../../src/utils";
import { ScrollView, FlatList } from "react-native";

export default function Missions() {
  // either "cache-first" or "no-cache" coming from index
  const { fetchPolicy, flatList } = useLocalSearchParams();
  const result = useQuery(LaunchListDocument, { fetchPolicy });
  const launches = useMemo(() => {
    const launchData = (result.data?.launches ?? [])
      .filter(isDefined)
      .map((launch) => ({
        ...launch,
        launch_date_unix: new Date(
          launch.launch_date_unix * 1000
        ).toLocaleDateString(),
      }));

    // make a bunch of data to exaggerate
    return [...launchData, ...launchData, ...launchData];
  }, [result.data?.launches]);

  // display loading message while hitting network
  if (result.loading) {
    return (
      <Box variant="centered">
        <Text>loading</Text>
      </Box>
    );
  }

  const renderFlatList = flatList === "true";

  if (renderFlatList) {
    return (
      <>
        <Stack.Screen options={{ title: "Launch Overview" }} />
        <FlatList
          data={launches}
          refreshing={result.loading}
          onRefresh={() => result.refetch()}
          renderItem={({ item, index }) => {
            return (
              <Link
                asChild
                href={`/launch/${item.id}`}
                key={`${item.id}-${index}`}
              >
                <Pressable
                  flexDirection="row"
                  alignItems="baseline"
                  justifyContent="space-between"
                  borderTopWidth={index ? 1 : 0}
                  padding="s"
                >
                  <Text fontSize={16}>{item.mission_name}</Text>
                  <Text>{item.launch_date_unix}</Text>
                </Pressable>
              </Link>
            );
          }}
        />
      </>
    );
  }

  // ScrollView version experiencing more lag
  return (
    <>
      <Stack.Screen options={{ title: "Launch Overview" }} />
      <ScrollView>
        {launches.map((item, index) => {
          return (
            <Link
              asChild
              href={`/launch/${item.id}`}
              key={`${item.id}-${index}`}
            >
              <Pressable
                flexDirection="row"
                alignItems="baseline"
                justifyContent="space-between"
                borderTopWidth={index ? 1 : 0}
                padding="s"
              >
                <Text fontSize={16}>{item.mission_name}</Text>
                <Text>{item.launch_date_unix}</Text>
              </Pressable>
            </Link>
          );
        })}
      </ScrollView>
    </>
  );
}
