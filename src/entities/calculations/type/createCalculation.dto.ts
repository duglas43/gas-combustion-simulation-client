export interface FuelComposition {
  methane: number; // CH4
  ethane: number; // C2H6
  propane: number; // C3H8
  nButane: number; // C4H10
  isoButane: number; // C4H10
  pentane: number; // C5H12
  hydrogen: number; // H2
  ethylene: number; // C2H4
  propylene: number; // C3H6
  butylene: number; // C4H8
  acetylene: number; // C2H2
  hydrogenSulfide: number; // H2S
  carbonMonoxide: number; // CO
  carbonDioxide: number; // CO2
  nitrogen: number; // N2
  oxygen: number; // O2
}

export interface ExternalConditions {
  boilerLoadPercentage: number; // ηк.а
  airMoistureContent: number; // dв
  gasMoistureContent: number; // dг
  feedWaterTemperature: number; // tп.в
  boilerRoomAirTemperature: number; // tо.в
  suppliedGasTemperature: number; // tг
  flueGasPressure: number; // Pт
}
export interface BurnerParameters {
  screenContaminationFactor: number; // ζ
}

export interface ConvectivePackageParameters {
  id: number;
  wallBlacknessDegree: number; // aз
}
export interface CreateCalculationDto {
  fuelComposition: FuelComposition;
  externalConditions: ExternalConditions;
  burnerParameters: BurnerParameters;
  convectivePackagesParameters: ConvectivePackageParameters[];
}
