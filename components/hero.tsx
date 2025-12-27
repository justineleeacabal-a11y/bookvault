import Image from "next/image";
import UstpLogo from "@/assets/ustp.png";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-8 py-12">
      {/* Logo */}
      <a
        href="https://www.ustp.edu.ph/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={UstpLogo}
          alt="Book Vault Logo"
          width={140}
          height={140}
          className="rounded-xl shadow-md"
        />
      </a>

      {/* Title */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Book Vaults
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your next <span className="font-semibold text-primary">adventure, mystery,</span> or{" "}
          <span className="font-semibold text-primary">classic</span> — all in one curated collection.
        </p>
        <p className="mt-2 text-sm sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          A premium digital library and community that <span className=" text-xl font text-primary">connects readers</span> with their favorite authors, hidden gems, and a world of knowledge.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent my-6" />
    
      <Button className=""> Hello </Button>
    </section>
  );
}