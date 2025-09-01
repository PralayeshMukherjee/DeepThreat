import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 text-gray-400 py-6 text-center">
      <p>&copy; {new Date().getFullYear()} SecureNet. All rights reserved.</p>
      <p className="mt-2">
        Contact us:{" "}
        <a
          href="mailto:support@securenet.com"
          className="text-cyan-400 hover:underline"
        >
          rajmukherjeegcp@gmail.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
