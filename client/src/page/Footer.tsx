import { Facebook, Instagram, X as XIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-primary w-full py-6 mt-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center space-y-4">
        <p className="font-semibold text-orange-500 text-center">
          &#169; {new Date().getFullYear()} E-buy
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="text-orange-500 hover:text-orange-400 transition" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="text-orange-500 hover:text-orange-400 transition" />
          </a>
          <a
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <XIcon className="text-orange-500 hover:text-orange-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
