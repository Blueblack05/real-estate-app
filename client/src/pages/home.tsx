import { useList } from "@refinedev/core";

import { Typography, Box, Stack } from "@mui/material";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from "../components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "Properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>error...</div>;
  return (
    <>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Dashboard
        </Typography>

        <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
          <PieChart
            title="Properties for Sale"
            value={684}
            series={[75, 25]}
            colors={["#475BE8", "#e4e8f7"]}
          />
          <PieChart
            title="Properties for Rent"
            value={550}
            series={[60, 40]}
            colors={["#475BE8", "#e4e8f7"]}
          />
          <PieChart
            title="Total Customers"
            value={5684}
            series={[75, 25]}
            colors={["#475BE8", "#e4e8f7"]}
          />
          <PieChart
            title="Properties for Cities"
            value={555}
            series={[75, 25]}
            colors={["#475BE8", "#e4e8f7"]}
          />
        </Box>
        <Stack
          mt="25px"
          width="100%"
          direction={{ xs: "cloumn", lg: "row" }}
          gap={4}
        >
          <TotalRevenue />
          <PropertyReferrals />
        </Stack>
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
          mt="25px"
          minWidth="100%"
        >
          <Typography fontSize="18px" fontWeight={600} color="#11142d">
            Latest Properties
          </Typography>
          <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {latestProperties.map((property) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                photo={property.photo}
                price={property.price}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
