"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function BackendTest() {
  useEffect(() => {
    api
      .get("/health")
      .then((res) => {
        console.log("✅ Backend connected:", res.data);
      })
      .catch((err) => {
        console.error("❌ Backend error:", err);
      });
  }, []);

  return null; // renders nothing
}
