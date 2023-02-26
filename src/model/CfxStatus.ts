import {
  AxiosOptions,
  CfxStatusComponentData,
  CfxSummary,
  CFX_STATUS_COMPONENTS,
} from "../typings";
import axios from "axios";

export default class CfxStatus {
  description: string;
  level: string;

  constructor(summary: CfxSummary) {
    this.description = summary.status.description;
    this.level = summary.status.indicator;
  }

  get everythingOk(): boolean {
    return this.level === "none";
  }

  async fetchComponents(): Promise<CfxStatusComponentData[]> {
    const response = await axios.get(CFX_STATUS_COMPONENTS, AxiosOptions);
    if (response.status !== 200)
      throw new Error("Cannot retrieve Cfx.re components status");
    return response.data["components"];
  }
}
