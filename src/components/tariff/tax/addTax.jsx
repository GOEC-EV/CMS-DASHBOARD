import { Grid, Typography, Container, Stack } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import StyledButton from "../../../ui/styledButton";
import StyledSwitch from "../../../ui/styledSwitch";
import { Controller, useForm } from "react-hook-form";
import { createTax, editTax } from "../../../services/taxAPI";
import { toast } from "react-toastify";
import StyledInput from "../../../ui/styledInput";

export default function AddTax({ action, data, onIsChange, isChange,onClose }) {
  const defaultValues = useMemo(() => {
    return action === "edit"
      ? {
          name: data.Name,
          percentage: data.Description,
          status: ["ACTIVE","TRUE"].includes(data.Status.toUpperCase())
        }
      : { status: true };
  }, [action, data]);

  const { register, handleSubmit, control,reset } = useForm({ defaultValues });

  useEffect(() => {
    if (action === "edit") {
      reset(defaultValues);
    }
  }, [action, defaultValues, reset]);

  const onSubmit = async (formData) => {
    try {
      const res = action === "add" ? await createTax(formData) : await editTax(data._id, formData);
      if (res) {
        toast.success(`Tax ${action === "add" ? "created" : "updated"} successfully`, { position: "top-right" });
        onIsChange(!isChange);
        reset();
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  return (
    <TableContainer>
      <Container fixed>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Name</Typography>
              <StyledInput placeholder={"Enter Name"} {...register("name")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Percentage (per kWH)</Typography>
              <StyledInput placeholder={"Enter Percentage"} {...register("percentage")} />
            </Grid>
            <Grid sx={{ marginBottom: 1, marginTop: 3 }} item xs={12} md={12}>
              <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography>Activate Tax</Typography>
                <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <StyledSwitch
                  onChange={(e) => field.onChange(e.target.checked)}
                  defaultChecked={field.value}
                  />
                )}
              />
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <StyledButton type="button" variant={"secondary"} width="103" onClick={onClose}>
                  Cancel
                </StyledButton>
                <StyledButton variant={"primary"} type="submit" width="160">
                  Save
                </StyledButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </TableContainer>
  );
}

//! STYLINGS

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
`;
