export interface FuelComposition {
  methanePercentage: number; // CH4
  ethanePercentage: number; // C2H6
  propanePercentage: number; // C3H8
  nButanePercentage: number; // C4H10
  isoButanePercentage: number; // C4H10
  pentanePercentage: number; // C5H12
  hydrogenPercentage: number; // H2
  ethylenePercentage: number; // C2H4
  propylenePercentage: number; // C3H6
  butylenePercentage: number; // C4H8
  acetylenePercentage: number; // C2H2
  hydrogenSulfidePercentage: number; // H2S
  carbonMonoxidePercentage: number; // CO
  carbonDioxidePercentage: number; // CO2
  nitrogenPercentage: number; // N2
  oxygenPercentage: number; // O2
}

export interface ExternalConditions {
  boilerLoadPercentage: number; // ηк.а
  airHumidityForCombustion: number; // dв
  gasHumidityForCombustion: number; // dг
  feedWaterTemperature: number; // tп.в
  boilerRoomAirTemperature: number; // tо.в
  gasInletTemperature: number; // tг
  flueGasPressure: number; // Pт
}
export interface FurnanceCharacteristics {
  screenContaminationFactor: number; // ζ
}

export interface ConvectivePackageParameters {
  id: number;
  wallBlacknessDegree: number; // aз
}
export interface CreateCalculationDto {
  fuelComposition: FuelComposition;
  externalConditions: ExternalConditions;
  furnanceCharacteristics: FurnanceCharacteristics;
  convectivePackagesParameters: ConvectivePackageParameters[];
}
