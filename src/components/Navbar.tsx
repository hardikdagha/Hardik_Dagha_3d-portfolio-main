import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  useEffect(() => {
    smoother = null;

    const links = Array.from(document.querySelectorAll(".header ul a"));
    const handleNavClick = (e: Event) => {
      const activeLink = e.currentTarget as HTMLAnchorElement;
      const section = activeLink.getAttribute("data-href");
      if (!section) return;

      const target = document.querySelector(section) as HTMLElement | null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
      window.removeEventListener("resize", handleResize);
      smoother = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="#" className="navbar-title" data-cursor="disable">
          HD
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#expertise" href="#expertise">
              <HoverLinks text="EXPERTISE" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
