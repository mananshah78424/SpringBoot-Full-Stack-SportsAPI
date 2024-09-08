import F1PageHeading from "@/src/components/f1/f1Heading";
import Layout from "@/src/components/Layout";
import { Circuit } from "@/src/types/f1/circuitTypes";

interface CircuitsPageProps {
  circuits: Circuit[];
  error?: string;
}
const CircuitsPage: React.FC<CircuitsPageProps> = ({ circuits, error }) => {
  console.log(circuits);

  if (!circuits && error) {
    return (
      <div className="flex flex-col items-center mt-12 text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }
  return (
    <Layout>
      <div className="flex flex-col mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="min-h-screen mt-4">
          <div className="f1-option-bar container">
            <F1PageHeading
              title="Circuits"
              subtitle="2024 FIA FORMULA ONE WORLD CHAMPIONSHIP™ CIRCUITs"
            ></F1PageHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-10">
              {circuits &&
                circuits.map((circuit, index) => {
                  // const [firstName, lastName] = driver.driver.name.split(" ");
                  // const nameForlink =
                  //   firstName.slice(0, 3) +
                  //   lastName.slice(0, 3) +
                  //   "01" +
                  //   "_" +
                  //   firstName +
                  //   "_" +
                  //   lastName;

                  // const imageNameForlink =
                  //   firstName.slice(0, 3) +
                  //   lastName.slice(0, 3) +
                  //   "01" +
                  //   ".png";
                  // const imageLink = `https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${firstName.slice(
                  //   0,
                  //   1
                  // )}/${nameForlink}/${imageNameForlink}`;
                  // console.log(imageLink);

                  return (
                    <a
                      key={index}
                      className="outline outline-offset-4 outline-brand-black group outline-0 focus-visible:outline-2"
                      href=""
                    >
                      <div className="border-t-double border-r-double rounded-tr-s f1-utils-inner-padding-tr--half f1-driver-listing-card border-brand-black transition-all hover:-mt-xs hover:pt-l hover:border-current text-3671C6 group-focus-visible:outline group-focus-visible:outline-3671C6 group-focus-visible:transition-all group-focus-visible:border-current">
                        <div className="flex flex-col gap-xs">
                          <div className="flex align-center justify-between text-brand-black">
                            <p className="font-formulaOne tracking-normal font-black text-[42px] leading-none">
                              {circuit.laps}
                            </p>
                            <div className="flex flex-col gap-micro items-end">
                              <p className="font-formulaOneWide tracking-normal font-normal text-[18px] leading-none">
                                {circuit.length}
                              </p>
                              <p className="font-formulaOneWide tracking-normal font-normal text-[12px] leading-none uppercase px-xs py-micro rounded-xxs bg-brand-black text-brand-white">
                                kms
                              </p>
                            </div>
                          </div>
                          <hr className="my-xxs border-greyLight" />
                          <div className="flex relative items-center border-l pl-xs border-current">
                            <div className="flex flex-col gap-micro text-brand-black">
                              <div className="flex gap-xxs flex-col">
                                <p className="tracking-normal text-[12px] leading-tight uppercase font-normal font-formulaOne">
                                  {circuit.competition.name}
                                </p>
                                <p className="tracking-normal text-[18px] leading-tight uppercase font-bold font-formulaOne">
                                  {circuit.competition.location.city +
                                    "," +
                                    circuit.competition.location.country}
                                </p>
                              </div>
                            </div>
                            <img
                              alt="Netherlands"
                              src="https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/Netherlands.jpg"
                              className="h-[2em] ml-auto mr-0 border border-greyDark rounded-xxs"
                            />
                          </div>
                          <hr className="my-xxs border-greyLight" />
                          <p className="tracking-normal text-fs-12px leading-tight normal-case font-normal non-italic text-greyDark">
                            {circuit.name}
                          </p>
                          <div className="flex items-baseline">
                            <img
                              alt="Driver Racing Number 1"
                              src="https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/MAXVER01.png"
                              className="f1-utils-square-block text-[6rem]"
                            />
                            <img
                              alt=""
                              src={circuit.image}
                              className="ml-0 mr-0 pr-s max-w-3/4"
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// export async function getServerSideProps() {
//   try {
//     const data = await fetchCircuits();
//     console.log(data);

//     return { props: { circuits: data.response } };
//   } catch (error) {
//     return { props: { error: "Failed to fetch circuits" } };
//   }
// }

export default CircuitsPage;
