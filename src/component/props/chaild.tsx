import { Box, Typography } from "@mui/material";

const ChildComponent = ({ item }: { item: { title: string; img: string; discrption: string } }) => {
  return (
    <Box sx={{ padding: 2, border: "1px solid black", margin: 1, width: "250px" }}>
      <Typography variant="h6">{item.title}</Typography>
      <img src={item.img} alt={item.title} width="100%" height="150px" />
      <Typography>{item.discrption}</Typography>
    </Box>
  );
};

export default ChildComponent;
