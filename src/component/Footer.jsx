import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-base-content p-4 fixed bottom-0">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by campus partner</p>
  </aside>
</footer>
  )
}

export default Footer;