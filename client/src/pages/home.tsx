import { useList } from "@refinedev/core";

import { Typography, Box, Stack } from "@mui/material";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from "../components";
import { wrap } from "module";

const Home = () => {
  return (
    <>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
          Dashboard
        </Typography>
      </Box>

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
    </>
  );
};

export default Home;
