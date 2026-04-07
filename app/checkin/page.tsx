"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckIn() {
  const router = useRouter();

  const [data, setData] = useState({
    mood: 5,
    sleep: 6,
    energy: 5,
    stress: 5,
  });

  const handleChange = (key: string, value: number) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem("mentalData", JSON.stringify([data]));
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md w-full max-w-md">
        
        <h1 className="text-xl font-semibold mb-4">Daily Check-In</h1>

        {["mood", "sleep", "energy", "stress"].map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{key}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={(data as any)[key]}
              onChange={(e) =>
                handleChange(key, Number(e.target.value))
              }
              className="w-full"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-xl"
        >
          Submit
        </button>
      </div>
    </div>
  );
}