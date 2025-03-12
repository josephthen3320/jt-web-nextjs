import Image from "next/image";
import { AboutMe } from "./components/about-me";
import { IntroLinks } from "./components/intro-links";


export default function Home() {
  return (
    <>
        <section className="mb-12 flex flex-col items-center gap-x-12 xl:flex-row">
            <AboutMe />
            <IntroLinks />
        </section>

        <section>

        </section>
    </>
  );
}
