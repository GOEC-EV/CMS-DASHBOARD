import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stack, Box } from "@mui/material";
import StyledSelectField from "../../ui/styledSelectField";
import StyledButton from "../../ui/styledButton";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../ui/styledInput";
import CalendarInput from "../../ui/CalendarInput";
import { getChargingPointsListOfStation, getListOfChargingStation } from "../../services/stationAPI";


export default function Filter({ onSubmited }) {
  const [locationList, setLocationList] = useState([])
  const [machineList, setMachineList] = useState([])
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();
  const onSubmit = (data) => {
    // Handle form submission with data
    console.log(data);
    if (data.startDate && !data.endDate) {
      setError("endDate", { type: "custom", message: "select End Date" })
      return
    }
    // if (data.startDate == data.endDate) {
    //   setError("endDate", { type: "custom", message: "end date not able to same as start date" })
    //   return
    // }
    if (Date.parse(data.startDate) > Date.parse(data.endDate)) {
      setError("endDate", { type: "custom", message: "end date should greater than start date" })
      return
    }
    if (data.location && !data.cpid) {
      setError("cpid", { type: "custom", message: "select cpid" })
      return
    }

    let dt = {}
    for (const [key, value] of Object.entries(data)) {
      if (key === 'location') {
        if (value) {
          dt[key] = value.value;
          continue;
        }
      }
      if (key === 'cpid') {
        if (value) {
          dt[key] = value.label;
          continue;
        }
      }
      dt[key] = value
    }
    localStorage.setItem("filter", JSON.stringify(dt))
    onSubmited && onSubmited(dt)

    // Close your form or perform other actions
  };

  const handleDateChangeInParent = (date) => {
    setValue("startDate", date); // Assuming you have 'expiryDate' in your form state
    clearErrors("startDate");

  };
  const startDate = watch("startDate", ""); // Watching the value for 'expiryDate'


  const handleEndDateChangeInParent = (date) => {
    setValue("endDate", date); // Assuming you have 'expiryDate' in your form state
    clearErrors("endDate");

  };
  const endDate = watch("endDate", ""); // Watching the value for 'expiryDate'


  useEffect(() => {
    getListOfChargingStation().then((res) => {
      console.log(res);
      if (res.status) {
        setLocationList(res.result.map((dt) => ({ label: dt.name, value: dt._id })))
      }
    })
    if (localStorage.getItem("filter") !== null) {
      console.log(JSON.parse(localStorage.getItem("filter")));
      reset(JSON.parse(localStorage.getItem("filter")))
      getMachineList(JSON.parse(localStorage.getItem("filter")).location)
    }
  }, [])

  const getMachineList = (value) => {
    getChargingPointsListOfStation(value).then((res) => {
      if (res.result) {
        setMachineList(res.result.map((dt) => ({ label: dt.evMachines.CPID, value: dt.evMachines })))
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={modalStyle}>
          <Stack direction={"column"} spacing={2} sx={{ background: '' }}>
            <Label>Start date</Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={startDate}
                    readOnly

                  />
                  {errors.startDate && (
                    <span style={errorMessageStyle}>
                      {errors.startDate.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "StartDate is required" }}
            />
            <Label>End date</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}

                    iconright={
                      <CalendarInput
                        onDateChange={handleEndDateChangeInParent}
                      />}
                    placeholder={"mm/dd/yyyy"}
                    value={endDate}
                    readOnly

                  />
                  {errors.endDate && (
                    <span style={errorMessageStyle}>
                      {errors.endDate.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "endDate is required" }}
            />
            <Label>Payment Status</Label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    style={{ maxwidth: 200 }}
                    {...field}
                    placeholder={"Search Payment Status"}
                    options={locationList}
                  />
                  {errors.location && (
                    <span style={errorMessageStyle}>
                      {errors.location.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "Location is required" }}
            />
            <Label>Transaction type</Label>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder={"Select Transaction Type"}
                    options={locationList}
                  />
                  {errors.cpid && (
                    <span style={errorMessageStyle}>
                      {errors.cpid.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "CPID is required" }}
            />

            <Label>Transaction</Label>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    {...field}
                    placeholder={"Select Transaction Type"}
                    options={locationList}
                  />
                  {errors.cpid && (
                    <span style={errorMessageStyle}>
                      {errors.cpid.message}
                    </span>
                  )}
                </>
              )}
            // rules={{ required: "CPID is required" }}
            />


            <Stack direction={"row"} spacing={1} sx={{ justifyContent: 'center' }}>
            <StyledButton width={150} variant="primary" type="submit">
                Apply
              </StyledButton>
              <StyledButton variant="secondary" width={120} type="button"
                onClick={() => { reset({}); onSubmited(); localStorage.removeItem("filter") }}>
                Reset
              </StyledButton>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
}

export const FormContainer = styled.div`
  display: inline-flex;
  padding: 30px 20px;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 4px;
  background: #1c1d22;
`;

export const Heading = styled.h1`
  color: var(--Grey, #b5b8c5);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
`;

export const Label = styled.label`
  color: var(--white, #f7f8fc);
  text-align: start;
  width: 100%;
  height: 16px;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.3px;
  text-transform: capitalize;
`;

// Modal style
const modalStyle = {
  //position: "absolute",
  top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  maxwidth: "auto", // Adjust width to fit your content or screen
  boxShadow: 2,
  p: 4,
  color: "#fff", // White text for better visibility on dark background
  outline: "none", // Remove the focus ring
  height: '100%',
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
};

// Styled table container
export const TableContainer = styled.div`
background: #27292f; // Dark background for the table
overflow-x: auto; // Allows table to be scrollable horizontally
border-radius: 8px; // Rounded corners
margin: 20px 0; // Margin for spacing, adjust as needed
`;

const errorMessageStyle = {
  color: "red",
  // margin: '1px 0',
};
