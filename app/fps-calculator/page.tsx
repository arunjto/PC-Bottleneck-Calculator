import { Metadata } from "next";
import FpsCalculatorClient from "./FpsCalculatorClient";

export const metadata: Metadata = {
  title: "FPS Estimator Calculator - Gaming Performance Predictor",
  description:
    "Estimate the Frames Per Second (FPS) you will get in popular games. Select your CPU, GPU, and a game to see your expected gaming performance.",
  keywords: [
    "FPS calculator",
    "gaming performance",
    "frame rate estimator",
    "PC gaming",
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
