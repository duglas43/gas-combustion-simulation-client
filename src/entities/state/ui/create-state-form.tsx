import { FC } from "react";
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
import { CreateStateDto } from "../../../shared/api/openapi-generated";

export interface CreateStateFormProps extends Omit<BoxProps, "onSubmit"> {
  onSubmit: (data: CreateStateDto) => void;
}

const schema = yup.object().shape({
  fuelComposition: yup
    .object()
    .shape({
      methanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      ethanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      propanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      nButanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      isoButanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      pentanePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      hydrogenPercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      ethylenePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      propylenePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      butylenePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      acetylenePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      hydrogenSulfidePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      carbonMonoxidePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      carbonDioxidePercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      nitrogenPercentage: yup
        .number()
        .required()
        .max(100, "The value must be less than 100"),
      oxygenPercentage: yup
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
  boilerCharacteristics: yup.object().shape({
    loadPercentage: yup.number().required(),
    airHumidityForCombustion: yup.number().required(),
    gasHumidityForCombustion: yup.number().required(),
    feedWaterTemperature: yup.number().required(),
    roomAirTemperature: yup.number().required(),
    gasInletTemperature: yup.number().required(),
  }),
  furnaceCharacteristics: yup.object().shape({
    screenContaminationFactor: yup.number().required(),
  }),
  convectivePackagesParameters: yup.array().of(
    yup.object().shape({
      id: yup.number().required(),
      wallBlacknessDegree: yup.number().required(),
      tubesPerRow: yup.number().optional(),
      minCrossSectionDimension: yup.number().optional(),
    })
  ),
});

export const CreateStateForm: FC<CreateStateFormProps> = ({
  onSubmit,
  ...props
}) => {
  const formik = useFormik<CreateStateDto>({
    initialValues: {
      fuelComposition: {
        methanePercentage: 98.33,
        ethanePercentage: 0.3,
        propanePercentage: 0.12,
        nButanePercentage: 0.15,
        isoButanePercentage: 0,
        pentanePercentage: 0,
        hydrogenPercentage: 0,
        ethylenePercentage: 0,
        propylenePercentage: 0,
        butylenePercentage: 0,
        acetylenePercentage: 0,
        hydrogenSulfidePercentage: 0,
        carbonMonoxidePercentage: 0,
        carbonDioxidePercentage: 0.1,
        nitrogenPercentage: 1,
        oxygenPercentage: 0,
      },
      boilerCharacteristics: {
        loadPercentage: 97.86,
        airHumidityForCombustion: 13,
        gasHumidityForCombustion: 0,
        feedWaterTemperature: 85,
        roomAirTemperature: 25,
        gasInletTemperature: 16,
      },
      furnaceCharacteristics: {
        screenContaminationFactor: 0.65,
      },
      convectivePackagesParameters: [
        {
          id: 1,
          wallBlacknessDegree: 0.8,
          tubesPerRow: 16,
          minCrossSectionDimension: 1.64,
        },
        {
          id: 2,
          wallBlacknessDegree: 0.8,
          tubesPerRow: 11,
          minCrossSectionDimension: 1.08,
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
          id="methanePercentage"
          type="number"
          size="small"
          label="MethanePercentage (CH4)"
          value={formik.values.fuelComposition.methanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.methanePercentage"
          error={
            !!formik.touched.fuelComposition?.methanePercentage &&
            !!formik.errors.fuelComposition?.methanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.methanePercentage &&
            formik.errors.fuelComposition?.methanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Ethane (C2H6)"
          value={formik.values.fuelComposition.ethanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.ethanePercentage"
          error={
            !!formik.touched.fuelComposition?.ethanePercentage &&
            !!formik.errors.fuelComposition?.ethanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.ethanePercentage &&
            formik.errors.fuelComposition?.ethanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Propane (C3H8)"
          value={formik.values.fuelComposition.propanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.propanePercentage"
          error={
            !!formik.touched.fuelComposition?.propanePercentage &&
            !!formik.errors.fuelComposition?.propanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.propanePercentage &&
            formik.errors.fuelComposition?.propanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="nButanePercentage (C4H10)"
          value={formik.values.fuelComposition.nButanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.nButanePercentage"
          error={
            !!formik.touched.fuelComposition?.nButanePercentage &&
            !!formik.errors.fuelComposition?.nButanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.nButanePercentage &&
            formik.errors.fuelComposition?.nButanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="isoButanePercentage (C4H10)"
          value={formik.values.fuelComposition.isoButanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.isoButanePercentage"
          error={
            !!formik.touched.fuelComposition?.isoButanePercentage &&
            !!formik.errors.fuelComposition?.isoButanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.isoButanePercentage &&
            formik.errors.fuelComposition?.isoButanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Pentane (C5H12)"
          value={formik.values.fuelComposition.pentanePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.pentanePercentage"
          error={
            !!formik.touched.fuelComposition?.pentanePercentage &&
            !!formik.errors.fuelComposition?.pentanePercentage
          }
          helperText={
            formik.touched.fuelComposition?.pentanePercentage &&
            formik.errors.fuelComposition?.pentanePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Hydrogen (H2)"
          value={formik.values.fuelComposition.hydrogenPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.hydrogenPercentage"
          error={
            !!formik.touched.fuelComposition?.hydrogenPercentage &&
            !!formik.errors.fuelComposition?.hydrogenPercentage
          }
          helperText={
            formik.touched.fuelComposition?.hydrogenPercentage &&
            formik.errors.fuelComposition?.hydrogenPercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Ethylene (C2H4)"
          value={formik.values.fuelComposition.ethylenePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.ethylenePercentage"
          error={
            !!formik.touched.fuelComposition?.ethylenePercentage &&
            !!formik.errors.fuelComposition?.ethylenePercentage
          }
          helperText={
            formik.touched.fuelComposition?.ethylenePercentage &&
            formik.errors.fuelComposition?.ethylenePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Propylene (C3H6)"
          value={formik.values.fuelComposition.propylenePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.propylenePercentage"
          error={
            !!formik.touched.fuelComposition?.propylenePercentage &&
            !!formik.errors.fuelComposition?.propylenePercentage
          }
          helperText={
            formik.touched.fuelComposition?.propylenePercentage &&
            formik.errors.fuelComposition?.propylenePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Butylene (C4H8)"
          value={formik.values.fuelComposition.butylenePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.butylenePercentage"
          error={
            !!formik.touched.fuelComposition?.butylenePercentage &&
            !!formik.errors.fuelComposition?.butylenePercentage
          }
          helperText={
            formik.touched.fuelComposition?.butylenePercentage &&
            formik.errors.fuelComposition?.butylenePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Acetylene (C2H2)"
          value={formik.values.fuelComposition.acetylenePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.acetylenePercentage"
          error={
            !!formik.touched.fuelComposition?.acetylenePercentage &&
            !!formik.errors.fuelComposition?.acetylenePercentage
          }
          helperText={
            formik.touched.fuelComposition?.acetylenePercentage &&
            formik.errors.fuelComposition?.acetylenePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="HydrogenSulfide (H2S)"
          value={formik.values.fuelComposition.hydrogenSulfidePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.hydrogenSulfidePercentage"
          error={
            !!formik.touched.fuelComposition?.hydrogenSulfidePercentage &&
            !!formik.errors.fuelComposition?.hydrogenSulfidePercentage
          }
          helperText={
            formik.touched.fuelComposition?.hydrogenSulfidePercentage &&
            formik.errors.fuelComposition?.hydrogenSulfidePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="CarbonMonoxide (CO)"
          value={formik.values.fuelComposition.carbonMonoxidePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.carbonMonoxidePercentage"
          error={
            !!formik.touched.fuelComposition?.carbonMonoxidePercentage &&
            !!formik.errors.fuelComposition?.carbonMonoxidePercentage
          }
          helperText={
            formik.touched.fuelComposition?.carbonMonoxidePercentage &&
            formik.errors.fuelComposition?.carbonMonoxidePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="CarbonDioxide (CO2)"
          value={formik.values.fuelComposition.carbonDioxidePercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.carbonDioxidePercentage"
          error={
            !!formik.touched.fuelComposition?.carbonDioxidePercentage &&
            !!formik.errors.fuelComposition?.carbonDioxidePercentage
          }
          helperText={
            formik.touched.fuelComposition?.carbonDioxidePercentage &&
            formik.errors.fuelComposition?.carbonDioxidePercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Nitrogen (N2)"
          value={formik.values.fuelComposition.nitrogenPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.nitrogenPercentage"
          error={
            !!formik.touched.fuelComposition?.nitrogenPercentage &&
            !!formik.errors.fuelComposition?.nitrogenPercentage
          }
          helperText={
            formik.touched.fuelComposition?.nitrogenPercentage &&
            formik.errors.fuelComposition?.nitrogenPercentage
          }
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label="Oxygen (O2)"
          value={formik.values.fuelComposition.oxygenPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            },
          }}
          name="fuelComposition.oxygenPercentage"
          error={
            !!formik.touched.fuelComposition?.oxygenPercentage &&
            !!formik.errors.fuelComposition?.oxygenPercentage
          }
          helperText={
            formik.touched.fuelComposition?.oxygenPercentage &&
            formik.errors.fuelComposition?.oxygenPercentage
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
        <Typography variant="h5">Boiler Characteristics</Typography>
        <TextField
          fullWidth
          label="Boiler Load Percentage"
          value={formik.values.boilerCharacteristics.loadPercentage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.loadPercentage"
        />
        <TextField
          fullWidth
          label="Air Moisture Content"
          value={formik.values.boilerCharacteristics.airHumidityForCombustion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.airHumidityForCombustion"
        />
        <TextField
          fullWidth
          label="Gas Moisture Content"
          value={formik.values.boilerCharacteristics.gasHumidityForCombustion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.gasHumidityForCombustion"
        />
        <TextField
          fullWidth
          label="Feed Water Temperature"
          value={formik.values.boilerCharacteristics.feedWaterTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.feedWaterTemperature"
        />
        <TextField
          fullWidth
          label="Boiler Room Air Temperature"
          value={formik.values.boilerCharacteristics.roomAirTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.roomAirTemperature"
        />
        <TextField
          fullWidth
          label="Supplied Gas Temperature"
          value={formik.values.boilerCharacteristics.gasInletTemperature}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="boilerCharacteristics.gasInletTemperature"
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
          value={formik.values.furnaceCharacteristics.screenContaminationFactor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="number"
          name="furnaceCharacteristics.screenContaminationFactor"
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
                type="number"
                type="number"
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
