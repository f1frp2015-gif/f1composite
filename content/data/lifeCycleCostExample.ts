import type { LccInput } from "@/lib/lifeCycleCost";

/** Arithmetic example on a cost index, not a quotation or maintenance forecast. */
export const lifeCycleCostExample: LccInput = {
  studyYears: 30,
  discountPercent: 3,
  downtimePerEvent: 0,
  residualValue: true,
  frp: { label: "FRP", initial: 130, firstMaintenanceYear: 25, maintenanceInterval: 25, maintenanceCost: 10, annualCost: 0, serviceLife: 0 },
  steel: { label: "Steel", initial: 100, firstMaintenanceYear: 13, maintenanceInterval: 15, maintenanceCost: 40, annualCost: 0, serviceLife: 0 },
};
