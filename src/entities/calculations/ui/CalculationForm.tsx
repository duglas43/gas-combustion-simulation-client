import React, { FC } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  BoxProps,
  Typography,
  InputAdornment,
} from "@mui/material";
import { CreateCalculationDto } from "../type";

export interface CalculationFormProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit: (data: CreateCalculationDto) => void;
}

const schema = yup.object().shape({
  fuelComposition: yup
    .object()
    .shape({
      methane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      ethane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      propane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      nButane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      isoButane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      pentane: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      hydrogen: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      ethylene: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      propylene: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      butylene: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      acetylene: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      hydrogenSulfide: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      carbonMonoxide: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      carbonDioxide: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      nitrogen: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      oxygen: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
    })
    .test(
      "sum",
      "The sum of all values must be 100",
      (value) =>
        Object.values(value).reduce((acc, curr) => acc + curr, 0) === 100
    ),
  externalConditions: yup.object().shape({
    boilerLoadPercentage: yup.number().required(),
    airMoistureContent: yup.number().required(),
    gasMoistureContent: yup.number().required(),
    feedWaterTemperature: yup.number().required(),
    boilerRoomAirTemperature: yup.number().required(),
    suppliedGasTemperature: yup.number().required(),
    flueGasPressure: yup.number().required(),
  }),
  burnerParameters: yup.object().shape({
    screenContaminationFactor: yup.number().required(),
  }),
  convectivePackagesParameters: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      wallBlacknessDegree: yup.number().required(),
    })
  ),
});

export const CalculationForm: FC<CalculationFormProps> = ({
  onSubmit,
  ...props
}) => {
  const formik = useFormik<CreateCalculationDto>({
    initialValues: {
      fuelComposition: {
        methane: 0,
        ethane: 0,
        propane: 0,
        nButane: 0,
        isoButane: 0,
        pentane: 0,
        hydrogen: 0,
        ethylene: 0,
        propylene: 0,
        butylene: 0,
        acetylene: 0,
        hydrogenSulfide: 0,
        carbonMonoxide: 0,
        carbonDioxide: 0,
        nitrogen: 0,
        oxygen: 0,
      },
      externalConditions: {
        boilerLoadPercentage: 0,
        airMoistureContent: 0,
        gasMoistureContent: 0,
        feedWaterTemperature: 0,
        boilerRoomAirTemperature: 0,
        suppliedGasTemperature: 0,
        flueGasPressure: 0,
      },
      burnerParameters: {
        screenContaminationFactor: 0,
      },
      convectivePackagesParameters: [
        {
          id: 0,
          wallBlacknessDegree: 0,
        },
        {
          id: 1,
          wallBlacknessDegree: 0,
        },
      ],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box
      component="form"
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          border: formik.errors.fuelComposition ? "2px solid red" : "none",
          p: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5">Fuel Composition</Typography>
        <TextField
          fullWidth
          id="methane"
          type="number"
          size="small"
          label="Methane (CH4)"
          value={formik.values.fuelComposition.methane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.methane"
          error={
            !!formik.touched.fuelComposition?.methane &&
            !!formik.errors.fuelComposition?.methane
          }
          helperText={
            formik.touched.fuelComposition?.methane &&
            formik.errors.fuelComposition?.methane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Ethane (C2H6)"
          value={formik.values.fuelComposition.ethane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.ethane"
          error={
            !!formik.touched.fuelComposition?.ethane &&
            !!formik.errors.fuelComposition?.ethane
          }
          helperText={
            formik.touched.fuelComposition?.ethane &&
            formik.errors.fuelComposition?.ethane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Propane (C3H8)"
          value={formik.values.fuelComposition.propane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.propane"
          error={
            !!formik.touched.fuelComposition?.propane &&
            !!formik.errors.fuelComposition?.propane
          }
          helperText={
            formik.touched.fuelComposition?.propane &&
            formik.errors.fuelComposition?.propane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="nButane (C4H10)"
          value={formik.values.fuelComposition.nButane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.nButane"
          error={
            !!formik.touched.fuelComposition?.nButane &&
            !!formik.errors.fuelComposition?.nButane
          }
          helperText={
            formik.touched.fuelComposition?.nButane &&
            formik.errors.fuelComposition?.nButane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="isoButane (C4H10)"
          value={formik.values.fuelComposition.isoButane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.isoButane"
          error={
            !!formik.touched.fuelComposition?.isoButane &&
            !!formik.errors.fuelComposition?.isoButane
          }
          helperText={
            formik.touched.fuelComposition?.isoButane &&
            formik.errors.fuelComposition?.isoButane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Pentane (C5H12)"
          value={formik.values.fuelComposition.pentane}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.pentane"
          error={
            !!formik.touched.fuelComposition?.pentane &&
            !!formik.errors.fuelComposition?.pentane
          }
          helperText={
            formik.touched.fuelComposition?.pentane &&
            formik.errors.fuelComposition?.pentane
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Hydrogen (H2)"
          value={formik.values.fuelComposition.hydrogen}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.hydrogen"
          error={
            !!formik.touched.fuelComposition?.hydrogen &&
            !!formik.errors.fuelComposition?.hydrogen
          }
          helperText={
            formik.touched.fuelComposition?.hydrogen &&
            formik.errors.fuelComposition?.hydrogen
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Ethylene (C2H4)"
          value={formik.values.fuelComposition.ethylene}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.ethylene"
          error={
            !!formik.touched.fuelComposition?.ethylene &&
            !!formik.errors.fuelComposition?.ethylene
          }
          helperText={
            formik.touched.fuelComposition?.ethylene &&
            formik.errors.fuelComposition?.ethylene
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Propylene (C3H6)"
          value={formik.values.fuelComposition.propylene}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.propylene"
          error={
            !!formik.touched.fuelComposition?.propylene &&
            !!formik.errors.fuelComposition?.propylene
          }
          helperText={
            formik.touched.fuelComposition?.propylene &&
            formik.errors.fuelComposition?.propylene
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Butylene (C4H8)"
          value={formik.values.fuelComposition.butylene}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.butylene"
          error={
            !!formik.touched.fuelComposition?.butylene &&
            !!formik.errors.fuelComposition?.butylene
          }
          helperText={
            formik.touched.fuelComposition?.butylene &&
            formik.errors.fuelComposition?.butylene
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Acetylene (C2H2)"
          value={formik.values.fuelComposition.acetylene}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.acetylene"
          error={
            !!formik.touched.fuelComposition?.acetylene &&
            !!formik.errors.fuelComposition?.acetylene
          }
          helperText={
            formik.touched.fuelComposition?.acetylene &&
            formik.errors.fuelComposition?.acetylene
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="HydrogenSulfide (H2S)"
          value={formik.values.fuelComposition.hydrogenSulfide}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.hydrogenSulfide"
          error={
            !!formik.touched.fuelComposition?.hydrogenSulfide &&
            !!formik.errors.fuelComposition?.hydrogenSulfide
          }
          helperText={
            formik.touched.fuelComposition?.hydrogenSulfide &&
            formik.errors.fuelComposition?.hydrogenSulfide
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="CarbonMonoxide (CO)"
          value={formik.values.fuelComposition.carbonMonoxide}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.carbonMonoxide"
          error={
            !!formik.touched.fuelComposition?.carbonMonoxide &&
            !!formik.errors.fuelComposition?.carbonMonoxide
          }
          helperText={
            formik.touched.fuelComposition?.carbonMonoxide &&
            formik.errors.fuelComposition?.carbonMonoxide
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="CarbonDioxide (CO2)"
          value={formik.values.fuelComposition.carbonDioxide}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.carbonDioxide"
          error={
            !!formik.touched.fuelComposition?.carbonDioxide &&
            !!formik.errors.fuelComposition?.carbonDioxide
          }
          helperText={
            formik.touched.fuelComposition?.carbonDioxide &&
            formik.errors.fuelComposition?.carbonDioxide
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Nitrogen (N2)"
          value={formik.values.fuelComposition.nitrogen}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.nitrogen"
          error={
            !!formik.touched.fuelComposition?.nitrogen &&
            !!formik.errors.fuelComposition?.nitrogen
          }
          helperText={
            formik.touched.fuelComposition?.nitrogen &&
            formik.errors.fuelComposition?.nitrogen
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Oxygen (O2)"
          value={formik.values.fuelComposition.oxygen}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.oxygen"
          error={
            !!formik.touched.fuelComposition?.oxygen &&
            !!formik.errors.fuelComposition?.oxygen
          }
          helperText={
            formik.touched.fuelComposition?.oxygen &&
            formik.errors.fuelComposition?.oxygen
          }
        />
        {formik.errors.fuelComposition && (
          <Typography color="error">
            The sum of all values must be 100
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">External Conditions</Typography>
        <TextField
          fullWidth
          label="Boiler Load Percentage"
          value={formik.values.externalConditions.boilerLoadPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.boilerLoadPercentage"
        />
        <TextField
          fullWidth
          label="Air Moisture Content"
          value={formik.values.externalConditions.airMoistureContent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.airMoistureContent"
        />
        <TextField
          fullWidth
          label="Gas Moisture Content"
          value={formik.values.externalConditions.gasMoistureContent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.gasMoistureContent"
        />
        <TextField
          fullWidth
          label="Feed Water Temperature"
          value={formik.values.externalConditions.feedWaterTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.feedWaterTemperature"
        />
        <TextField
          fullWidth
          label="Boiler Room Air Temperature"
          value={formik.values.externalConditions.boilerRoomAirTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.boilerRoomAirTemperature"
        />
        <TextField
          fullWidth
          label="Supplied Gas Temperature"
          value={formik.values.externalConditions.suppliedGasTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.suppliedGasTemperature"
        />
        <TextField
          fullWidth
          label="Flue Gas Pressure"
          value={formik.values.externalConditions.flueGasPressure}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="externalConditions.flueGasPressure"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Burner Parameters</Typography>
        <TextField
          fullWidth
          label="Screen Contamination Factor"
          value={formik.values.burnerParameters.screenContaminationFactor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="burnerParameters.screenContaminationFactor"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">Convective Package Parameters</Typography>
        {formik.values.convectivePackagesParameters.map(
          (convectivePackage, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6">
                Convective Package {index + 1}
              </Typography>
              <TextField
                fullWidth
                label="Wall Blackness Degree"
                value={convectivePackage.wallBlacknessDegree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={`convectivePackagesParameters[${index}].wallBlacknessDegree`}
              />
            </Box>
          )
        )}
      </Box>
      <Button type="submit" variant="contained" disabled={!formik.isValid}>
        Submit
      </Button>
    </Box>
  );
};
