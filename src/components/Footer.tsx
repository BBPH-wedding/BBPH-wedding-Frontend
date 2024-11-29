import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-auto px-10 py-5 text-center bg-cover bg-primaryGreen"
    style={{
      backgroundImage: `url('/BEKKY WALL .png')`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >
      <div className="flex flex-col items-center justify-center">
        <p className="max-w-lg mx-auto text-sm md:text-lg md:max-w-5xl">
          © 2024 - 2025 All rights reserved.
        </p>
<Link
href="https://bbphstudio.com/"
target="_blank"
>

<img src="/BBPH_logo.png" alt="BBPH logo" className="w-32 mt-5" />
</Link>
        
      </div>
    </footer>
  );
};

export default Footer;
