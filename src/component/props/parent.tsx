import ChildComponent from "../../component/props/chaild";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import { Box, Button,  Grid, Link } from "@mui/material";

const ParentComponent = () => {
  const items = [
    {
      title: "This is first card",
      img: image1,
      discrption: "This is first image",
    },
    {
      title: "This is second card",
      img: image2,
      discrption: "This is second image",
    },
    {
      title: "This is third card",
      img: image3,
      discrption: "This is third image",
    },
    {
      title: "This is fourth card",
      img: image4,
      discrption: "This is fourth image",
    },
    {
      title: "This is fourth card",
      img: image4,
      discrption: "This is fourth image",
    },
    {
      title: "This is fourth card",
      img: image4,
      discrption: "This is fourth image",
    },
    {
      title: "This is fourth card",
      img: image4,
      discrption: "This is fourth image",
    },
    {
      title: "This is fourth card",
      img: image4,
      discrption: "This is fourth image",
    },
  ];

  return (
    <>
    <Box sx={{ width: "100%", height: "100vh", padding: 2,}}>
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ChildComponent item={item} />
        </Grid>
      ))}
      
    </Grid>
 
   
    
  </Box>
  <Link href="/"><Button variant="outlined" sx={{background:"white"}}>Back</Button></Link>
  </>
  );
};

export default ParentComponent;
