'use client'

import React, { useState } from "react";
import { Navigation } from "./components/nav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [teamLogic, setTeamLogic] = useState<"lane" | "legis" | "Asuza">("lane");

  return (
    <body
      className={`bg-black ${
        process.env.NODE_ENV === "development" ? "debug-screens" : undefined
      }`}
    >
      <Navigation teamLogic={teamLogic} setTeamLogic={setTeamLogic} />
      {children}
    </body>
  );
}