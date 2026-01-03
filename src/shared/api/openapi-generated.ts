import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = [
  "App",
  "observations",
  "runtime",
  "state",
  "recommendations",
  "warnings",
  "simulation",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      appControllerGetHello: build.query<
        AppControllerGetHelloApiResponse,
        AppControllerGetHelloApiArg
      >({
        query: () => ({ url: `/` }),
        providesTags: ["App"],
      }),
      observationsControllerFind: build.query<
        ObservationsControllerFindApiResponse,
        ObservationsControllerFindApiArg
      >({
        query: (queryArg) => ({
          url: `/observations`,
          params: {
            from: queryArg["from"],
            to: queryArg.to,
          },
        }),
        providesTags: ["observations"],
      }),
      runtimeControllerGetCurrentRuntime: build.query<
        RuntimeControllerGetCurrentRuntimeApiResponse,
        RuntimeControllerGetCurrentRuntimeApiArg
      >({
        query: () => ({ url: `/runtime` }),
        providesTags: ["runtime"],
      }),
      stateControllerGetCurrentState: build.query<
        StateControllerGetCurrentStateApiResponse,
        StateControllerGetCurrentStateApiArg
      >({
        query: () => ({ url: `/state` }),
        providesTags: ["state"],
      }),
      recommendationsControllerGetRecommendations: build.query<
        RecommendationsControllerGetRecommendationsApiResponse,
        RecommendationsControllerGetRecommendationsApiArg
      >({
        query: () => ({ url: `/recommendations` }),
        providesTags: ["recommendations"],
      }),
      warningsControllerGetWarnings: build.query<
        WarningsControllerGetWarningsApiResponse,
        WarningsControllerGetWarningsApiArg
      >({
        query: () => ({ url: `/warnings` }),
        providesTags: ["warnings"],
      }),
      simulationControllerCreate: build.mutation<
        SimulationControllerCreateApiResponse,
        SimulationControllerCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/simulation`,
          method: "POST",
          body: queryArg.createSimulationDto,
        }),
        invalidatesTags: ["simulation"],
      }),
      simulationControllerUpdate: build.mutation<
        SimulationControllerUpdateApiResponse,
        SimulationControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/simulation`,
          method: "PATCH",
          body: queryArg.updateSimulationDto,
        }),
        invalidatesTags: ["simulation"],
      }),
      simulationControllerStart: build.mutation<
        SimulationControllerStartApiResponse,
        SimulationControllerStartApiArg
      >({
        query: () => ({ url: `/simulation/start`, method: "POST" }),
        invalidatesTags: ["simulation"],
      }),
      simulationControllerStop: build.mutation<
        SimulationControllerStopApiResponse,
        SimulationControllerStopApiArg
      >({
        query: () => ({ url: `/simulation/stop`, method: "POST" }),
        invalidatesTags: ["simulation"],
      }),
      simulationControllerPause: build.mutation<
        SimulationControllerPauseApiResponse,
        SimulationControllerPauseApiArg
      >({
        query: () => ({ url: `/simulation/pause`, method: "POST" }),
        invalidatesTags: ["simulation"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type AppControllerGetHelloApiResponse = unknown;
export type AppControllerGetHelloApiArg = void;
export type ObservationsControllerFindApiResponse =
  /** status 200  */ ObservationsListDto;
export type ObservationsControllerFindApiArg = {
  from: number;
  to: number;
};
export type RuntimeControllerGetCurrentRuntimeApiResponse =
  /** status 200  */ RuntimeDto;
export type RuntimeControllerGetCurrentRuntimeApiArg = void;
export type StateControllerGetCurrentStateApiResponse = unknown;
export type StateControllerGetCurrentStateApiArg = void;
export type RecommendationsControllerGetRecommendationsApiResponse =
  /** status 200  */ RecommendationDto[];
export type RecommendationsControllerGetRecommendationsApiArg = void;
export type WarningsControllerGetWarningsApiResponse =
  /** status 200  */ WarningDto[];
export type WarningsControllerGetWarningsApiArg = void;
export type SimulationControllerCreateApiResponse = unknown;
export type SimulationControllerCreateApiArg = {
  createSimulationDto: CreateSimulationDto;
};
export type SimulationControllerUpdateApiResponse = unknown;
export type SimulationControllerUpdateApiArg = {
  updateSimulationDto: UpdateSimulationDto;
};
export type SimulationControllerStartApiResponse = unknown;
export type SimulationControllerStartApiArg = void;
export type SimulationControllerStopApiResponse = unknown;
export type SimulationControllerStopApiArg = void;
export type SimulationControllerPauseApiResponse = unknown;
export type SimulationControllerPauseApiArg = void;
export type ObservationDto = {
  time: string;
  timestamp: number;
  load: number;
  efficiency: number;
  adiabaticCombustionTemperature: number;
  furnaceExitTemperature: number;
  firstConvectivePackageExitTemperature: number;
  secondConvectivePackageExitTemperature: number;
  economizerExitTemperature: number;
  flueGasTemperature: number;
  fuelConsumption: number;
  lossesWithFlueGasPercentage: number;
  lossesThroughWallsPercentage: number;
  totalLosses: number;
  furnaceImbalance: number;
  firstConvectivePackageImbalance: number;
  secondConvectivePackageImbalance: number;
  economizerImbalance: number;
};
export type ObservationsListDto = {
  historical: ObservationDto[];
  current: ObservationDto;
  forecast: ObservationDto[];
};
export type RuntimeDto = {
  status: Status;
  currentTime: number;
  speedUpFactor: number;
};
export type RecommendationDto = {
  message: string;
  effect: string;
};
export type WarningDto = {
  code: Code;
  message: string;
  timestamp: string;
};
export type CreateFuelCompositionDto = {
  methanePercentage: number;
  ethanePercentage: number;
  propanePercentage: number;
  nButanePercentage: number;
  isoButanePercentage: number;
  pentanePercentage: number;
  hydrogenPercentage: number;
  ethylenePercentage: number;
  propylenePercentage: number;
  butylenePercentage: number;
  acetylenePercentage: number;
  hydrogenSulfidePercentage: number;
  carbonMonoxidePercentage: number;
  carbonDioxidePercentage: number;
  nitrogenPercentage: number;
  oxygenPercentage: number;
};
export type CreateBoilerCharacteristicDto = {
  loadPercentage: number;
  airHumidityForCombustion: number;
  gasHumidityForCombustion: number;
  feedWaterTemperature: number;
  roomAirTemperature: number;
  gasInletTemperature: number;
};
export type CreateFurnaceCharacteristicDto = {
  screenContaminationFactor: number;
};
export type CreateConvectivePackageDto = {
  id: number;
  wallBlacknessDegree: number;
  tubesPerRow: number;
  minCrossSectionDimension: number;
};
export type CreateStateDto = {
  fuelComposition: CreateFuelCompositionDto;
  boilerCharacteristics: CreateBoilerCharacteristicDto;
  furnaceCharacteristics: CreateFurnaceCharacteristicDto;
  convectivePackagesParameters: CreateConvectivePackageDto[];
};
export type CreateRuntimeDto = {
  speedUpFactor?: number;
};
export type CreateSimulationDto = {
  state: CreateStateDto;
  runtime: CreateRuntimeDto;
};
export type UpdateStateDto = {
  fuelComposition?: CreateFuelCompositionDto;
  boilerCharacteristics?: CreateBoilerCharacteristicDto;
  furnaceCharacteristics?: CreateFurnaceCharacteristicDto;
  convectivePackagesParameters?: CreateConvectivePackageDto[];
};
export type UpdateRuntimeDto = {
  speedUpFactor?: number;
};
export type UpdateSimulationDto = {
  state?: UpdateStateDto;
  runtime?: UpdateRuntimeDto;
};
export enum Status {
  Idle = "IDLE",
  Running = "RUNNING",
  Transitioning = "TRANSITIONING",
  Paused = "PAUSED",
  Completed = "COMPLETED",
}
export enum Code {
  LowEfficiency = "LOW_EFFICIENCY",
  HighPressure = "HIGH_PRESSURE",
  Overheating = "OVERHEATING",
}
export const {
  useAppControllerGetHelloQuery,
  useLazyAppControllerGetHelloQuery,
  useObservationsControllerFindQuery,
  useLazyObservationsControllerFindQuery,
  useRuntimeControllerGetCurrentRuntimeQuery,
  useLazyRuntimeControllerGetCurrentRuntimeQuery,
  useStateControllerGetCurrentStateQuery,
  useLazyStateControllerGetCurrentStateQuery,
  useRecommendationsControllerGetRecommendationsQuery,
  useLazyRecommendationsControllerGetRecommendationsQuery,
  useWarningsControllerGetWarningsQuery,
  useLazyWarningsControllerGetWarningsQuery,
  useSimulationControllerCreateMutation,
  useSimulationControllerUpdateMutation,
  useSimulationControllerStartMutation,
  useSimulationControllerStopMutation,
  useSimulationControllerPauseMutation,
} = injectedRtkApi;
