import Layout from "@/src/components/Layout";
import Image from "next/image";
import MainScreenImage from "../../images/f1-main-screen.webp";
import "../../styles/f1.css";

type Props = {};

export default function Index({}: Props) {
  return (
    <Layout>
      <div className="pt-16">
        <div className="mx-auto items-center justify-center flex">
          <div className="rounded-lg shadow-lg">
            <Image
              src={MainScreenImage}
              width={800}
              height={800}
              alt="Main screen image"
            ></Image>
          </div>
        </div>
      </div>
    </Layout>
  );
}
