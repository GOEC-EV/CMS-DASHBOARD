import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  Rating,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Card,
  CardMedia,
} from "@mui/material";
import { styled } from '@mui/material/styles';

import Pump from "../../../assets/images/pump.jpg";
import { Star } from "@mui/icons-material";


export default function ChargingSummary({ datas }) {
  const [data,setData] = useState([])

  useEffect(() => {
    console.log(datas);
    setData([
      { label: "Customer name", value: datas["Username"] },
      { label: "Vehicle number", value: "-" },
      { label: "Vehicle model", value: "Oberon Mall, Ernakulam" },
      { label: "Chargepoint", value: datas["Chargepoint ID"] },
      { label: "Connector type", value: "-" },
      { label: "Connector ID", value: datas["Connector ID"] },
      { label: "Charging start", value: "-" },
      { label: "Charging End", value: "-" },
      { label: "Duration", value: datas["Duration (hh:mm:ss)"] },
      { label: "Delivered Energy", value: datas["Units Consumed"] },
      { label: "Session ID", value: "-" },
      { label: "Tariff", value: "-" },
      { label: "Meter start", value: "-" },
      { label: "Meter stop", value: "-" },
      { label: "Initial Soc", value: "-" },
      { label: "Last Soc", value: "-" },
      { label: "Tax Type", value: "-" },
      { label: "Tax Rate", value: "-" },
      { label: "Total Tax amount", value: "-" },
    ])
  }, [datas])
  
  return (
    <Box >
      <Stack spacing={4} direction="row" sx={{ p: 2, backgroundColor: '#212326' }}>
        <Grid item xs={4}>
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Card sx={{ maxWidth: 100 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="100"
                image={Pump}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item xs={4}>
              <Stack direction={"row"}>
                <Star sx={{ color: '#F2994A', fontSize: '18px' }} />
                <Typography
                  sx={{ flexGrow: 1, textAlign: "start", color: '#F2994A' }}
                  variant="subtitle2"
                >
                  4.5
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1">
                Oberon Mall, Ernakulam
              </Typography>
              <Typography variant="caption">
                NH Bypass, Oberon Mall
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
      {data.map((item, index) => (
        <Stack direction={"row"} key={index} wrap="nowrap"
          sx={{ backgroundColor: index % 2 === 0 ? '#2B2930' : '#211F26', justifyContent: 'space-between', px: 2, py: 0.5 }}
        >
          <Typography variant="caption" align="left">{item.label}</Typography>
          <Typography variant="caption" align="center">{item.value}</Typography>
        </Stack>
      ))}

      <Stack direction={"row"} wrap="nowrap"
        sx={{ backgroundColor: '#212326', justifyContent: 'space-between', p: 2 }}
      >
        <Typography variant="subtitle2" align="left">Total Amount</Typography>
        <Typography variant="h6" align="center" color={'#6FCC60'}>₹{datas["Total Amount"]}</Typography>
      </Stack>
    </Box>
  );
}