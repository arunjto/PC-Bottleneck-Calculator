import { Metadata } from "next";
import FpsCalculatorClient from "./FpsCalculatorClient";

export const metadata: Metadata = {
  title: "FPS Calculator | Estimate Gaming Performance & Frame Rates Online",
  description:
    "Estimate game FPS based on your CPU and GPU. Instantly predict gaming performance and frame rates for popular titles before you build or upgrade your PC.",
  keywords: [
  "FPS calculator",
  "FPS estimator",
  "gaming performance predictor",
  "frame rate calculator",
  "PC FPS benchmark"
  ],
  alternates: {
    canonical: "https://www.pcbuildcheck.com/fps-calculator",
  },
};

// ✅ The ONLY thing inside this file is the metadata + default export
// (Client logic and schema go inside FpsCalculatorClient.tsx)
export default function FpsCalculatorPage() {
  return <FpsCalculatorClient />;
}
