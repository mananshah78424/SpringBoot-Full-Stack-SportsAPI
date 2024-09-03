import Layout from "@/src/components/Layout";
import { fetchCircuits } from "@/src/services/f1/f1Service";
import { Circuit } from "@/src/types/f1/circuitTypes";
import Image from "next/image";

interface CircuitsPageProps {
  circuits: Circuit[];
  error?: string;
}
const CircuitsPage: React.FC<CircuitsPageProps> = ({ circuits, error }) => {
  if (!circuits && error) {
    return (
      <div className="flex flex-col items-center mt-12 text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <Layout>
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
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetchCircuits();
    console.log(data);

    return { props: { circuits: data.response } };
  } catch (error) {
    return { props: { error: "Failed to fetch circuits" } };
  }
}

export default CircuitsPage;
