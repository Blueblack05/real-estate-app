import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";
import { AgentCard } from "../components";
import { useNavigate } from "react-router-dom";

const Agent = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({ resource: "users" });

  const allAgents = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isLoading) return <div>Error...</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agent List
      </Typography>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          bgcolor: "#fcfcfc",
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agent;
