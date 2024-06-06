import Facebook from "@/components/blog/icons/facebook";
import Linkedin from "@/components/blog/icons/linkedin";
import Twitter from "@/components/blog/icons/twitter";
import WhatsApp from "@/components/blog/icons/whatsapp";
import Image from "next/image";

export default function BlogDetail() {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src="/real-estate.jpg"
        width={1200}
        height={450}
        alt="Real Estate"
        className="object-cover w-full aspect-square lg:aspect-[16/6] rounded-2xl"
      />

      <div className="text-sub-title leading-sub-title font-bold text-center mt-8">
        Título de la entrada del blog (H1)
      </div>

      <div className="flex items-center gap-2 mt-8">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook width={24} height={24} className="text-[#0866FF]" />
        </a>

        <WhatsApp className="w-6 h-6 text-[#25D366]" />

        <Linkedin width={24} height={24} className="text-[#0A66C2]" />

        <Twitter width={24} height={24} className="text-[#1D9BF0]" />
      </div>

      <div className="text-xl font-bold mt-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>

      <section className="bg-gray-200 py-12 mt-24 w-full full-width">
        <div className="main_container">{/* <CallToAction /> */}</div>
      </section>
    </div>
  );
}
