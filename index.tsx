import axios from "axios";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";

interface AnalyticsProps {
  keyId: string; // Changed `key` to `keyId` to avoid conflicts with JS keywords
}

const Analytics = ({ keyId }: AnalyticsProps) => {
  useEffect(() => {
    const trackAnalytics = async () => {
      console.log("Analytics loaded");
      let sessionIdPresent=true;
      let sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        localStorage.setItem("sessionId", sessionId);
        sessionIdPresent=false;
      }

      const parser = new UAParser();
      const device = parser.getDevice().type || "desktop";

      try {
        const res = await axios.get("https://ipapi.co/json/");
        const country = res.data.country_code || "Unknown";
        const ip = res.data.ip || "Unknown";
         console.log(keyId, sessionId, device, country, ip, sessionIdPresent);
         const body ={
          keyId: keyId,
          sessionId: sessionId,
          device: device,
          country: country,
          sessionIdPresent: sessionIdPresent
         }
         const result= axios.post("https://analyticbackend.singhshivansh12may.workers.dev/track", body);
        console.log(result);
      } catch (error) {
        console.error("IP API failed, sending minimal data.");
        console.log(keyId, sessionId, device, sessionIdPresent);
        const body ={
          keyId: keyId,
          sessionId: sessionId,
          device: device,
          country: "Unknown",
          sessionIdPresent: sessionIdPresent
         }
      }
    };

    trackAnalytics();
  }, [keyId]); // Add keyId as a dependency to avoid issues

  return null;
};

export default Analytics;
