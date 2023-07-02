"use client";

import { useState } from "react";
import { Galaxy } from "@prisma/client";
import NewGalaxy from "./NewGalaxy";
import OwnedGalaxies from "./OwnedGalaxies";

export default function Galaxies() {
    const [ownedGalaxies, setOwnedGalaxies] = useState<Galaxy[]>([]);

    return (
        <div className="flex gap-4">
            <NewGalaxy setGalaxies={setOwnedGalaxies} />
            <OwnedGalaxies galaxies={ownedGalaxies} setGalaxies={setOwnedGalaxies} />
        </div>
    );
}
