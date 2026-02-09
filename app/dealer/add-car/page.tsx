"use client";
export default function AddCarPage() {
  return (
    <div>
      <form>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
