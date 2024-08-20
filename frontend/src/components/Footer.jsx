import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#023E8A] text-gray-200 py-10 px-5 mt-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <FooterSection title={"About Us"}>
          <Paragraf
            content={
              "NETFISH merupakan platform e-commerce yang inovatif dalam bidang perikanan, yang menghubungkan suplier dengan konsumen secara langsung. Platform ini menawarkan kemudahan dalam mengakses informasi terkini dan praktik terbaik mengenai pemasaran ikan yang berkelanjutan, dengan fokus pada penjualan ikan segar dan ikan olahan."
            }
          />
          <Paragraf
            content={
              "Visi kami adalah menjadi pelopor dalam menciptakan sistem pemasaran ikan modern dengan pemanfaatan Platform e-commerce sebagai technopreneurship guna mendorong perekonomian yang berkelanjutan, efisien, dan inovatif."
            }
          />
        </FooterSection>

        <FooterSection title={"Quick Links"}>
          <FooterLinks />
        </FooterSection>

        <FooterSection title={"Contact Us"}>
          <Paragraf content="Email: info@netfish.com" />
          <Paragraf content="Phone: +62 812-3456-7890" />
        </FooterSection>

        <FooterSection title={"Follow Us"}>
          <FooterSocials />
        </FooterSection>
      </div>
      <FooterBottom />
    </footer>
  );
};

const Paragraf = ({ content }) => {
  return <p className="text-sm mt-4">{content}</p>;
};

const FooterSocials = () => {
  return (
    <ul className="flex space-x-4 mt-4">
      <FooterLink
        href="https://facebook.com"
        label={<FaFacebookF className="text-xl text-gray-300 hover:text-white" />}
      />
      <FooterLink
        href="https://instagram.com"
        label={<FaInstagram className="text-xl text-gray-300 hover:text-white" />}
      />
      <FooterLink
        href="https://twitter.com"
        label={<FaTwitter className="text-xl text-gray-300 hover:text-white" />}
      />
      <FooterLink
        href="https://linkedin.com"
        label={<FaLinkedinIn className="text-xl text-gray-300 hover:text-white" />}
      />
    </ul>
  );
};

const FooterBottom = () => {
  return (
    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
      <p className="text-gray-400">
        Credit by{" "}
        <a
          href="https://www.instagram.com/ahmdmichael?igsh=NXdqcmoycGVyZHF4"
          className="hover:text-blue-500 transition"
        >
          Achmad Michael Mushoharoin
        </a>{" "}
        | &copy; 2024
      </p>
      <p className="text-gray-400">
        &copy; 2024 Heavy Equipment Co. All rights reserved.
      </p>
      <p className="text-gray-400">
        <a
          href="https://policies.google.com/privacy?hl=en-US"
          className="hover:text-blue-500 transition"
        >
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          href="https://policies.google.com/terms?hl=en"
          className="hover:text-blue-500 transition"
        >
          Terms of Service
        </a>
      </p>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <ul className="space-y-2">
      <List>
        <FooterLink href="/" label={"Home"} />
      </List>
      <List>
        <FooterLink href="/about" label={"About Us"} />
      </List>
      <List>
        <FooterLink href="/contact" label={"Contact Us"} />
      </List>
      <List>
        <FooterLink href="/faq" label={"FAQ"} />
      </List>
      <List>
        <FooterLink href="/terms" label={"Terms & Conditions"} />
      </List>
      <List>
        <FooterLink href="/privacy" label={"Privacy Policy"} />
      </List>
    </ul>
  );
};

const List = ({ children }) => {
  return <li>{children}</li>;
};

const FooterLink = ({ href, label }) => {
  return (
    <Link
      className="text-gray-300 hover:text-white no-underline transition"
      to={href}
    >
      {label}
    </Link>
  );
};

const FooterSection = ({ title, children }) => {
  return (
    <div className="flex-1 min-w[200px] mb-4 py-0 px-4">
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Footer;
