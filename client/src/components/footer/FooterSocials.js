import React from "react";
import Github from "../../assets/github.svg";
import Linkedin from "../../assets/linkedin.svg";
import Website from "../../assets/portfolio.png";

const socials = [
  {
    id: 1,
    href: "https://www.google.com",
    img: Github,
    name: Github
  },
  {
    id: 2,
    href: "https://www.google.com",
    img: Linkedin,
    name: Linkedin
  },
  {
    id: 3,
    href: "https://www.google.com",
    img: Website,
    name: Website
  }
];

export default class FooterSocials extends React.Component {
  render() {
    return (
      <ul className="socials">
        {socials.map(social =>
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}>
              <span aria-hidden="true">{social.name}</span>
              <img src={social.img} alt="" aria-hidden="true" />
            </a>
          </li>
        )}
      </ul>
    )
  }
}