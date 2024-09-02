import { fetchCircuits } from "@/services/f1/circuitService";
import { Circuit } from "@/types/f1/circuitTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const CircuitsPage = () => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCircuits = async () => {
      try {
        const data = await fetchCircuits();
        setCircuits(data.response);
      } catch (error) {
        setError("Failed to fetch circuits");
      } finally {
        setLoading(false);
      }
    };
    getCircuits();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center mt-12">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
        <p className="mt-4 text-lg">Loading circuits...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center mt-12 text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">F1 Circuits</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {circuits.map((circuit) => (
          <div
            key={circuit.id}
            className="border border-gray-300 p-4 rounded-lg w-72 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2 text-center">
              {circuit.name}
            </h2>
            <div className="flex justify-center mb-2 mt-4">
              <Image
                src={circuit.image}
                alt={circuit.name}
                width={300}
                height={200}
                className="rounded-md"
              />
            </div>
            <p className="mt-2">
              <strong>Competition:</strong> {circuit.competition.name}
            </p>
            <p>
              <strong>Location:</strong> {circuit.competition.location.city},{" "}
              {circuit.competition.location.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircuitsPage;
