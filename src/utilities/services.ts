import logoDrywall from "../assets/dry-logo.svg";
import electricalLogo from "../assets/electricalLogo.svg";
import paintingLogo from "../assets/paintingLogo.svg";
import carpentryLogo from "../assets/carp-logo.svg";
import plumbingLogo from "../assets/plumbingLogo.svg";
import utilitysLogo from "../assets/utilitysLogo.svg";
import picDrywall from "../assets/dry-logo.svg";
import electricalPic from "../assets/electricalLogo.svg";
import paintingPic from "../assets/paintingLogo.svg";
import carpentryPic from "../assets/carp-logo.svg";
import plumbingPic from "../assets/plumbingLogo.svg";
import utilitysPic from "../assets/utilitysLogo.svg";

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  logo: string;
  description: string;
  image: string;
  side: string;
  date: string;
  category: string;
}

export const services: ServiceItem[] = [
  {
    id: 3,
    title: "Drywall",
    desc: "Quality ceiling installations, drywall, and partitions services.",
    logo: logoDrywall,
    description:
      "Drywall work involves installing, finishing, and repairing interior walls and ceilings using gypsum boards for construction.",
    image: picDrywall,
    side: "l",
    date: "1999-12-22T00:00:9999",
    category: "drywall",
  },
  {
    id: 4,
    title: "Electrical",
    desc: "House electrical installation: wiring and fixture setup.",
    logo: electricalLogo,
    description:
      "We install, maintain, and repair electrical systems, ensuring safe and efficient power distribution in residential and commercial settings.",
    image: electricalPic,
    side: "r",
    date: "1999-12-22T00:00:9999",
    category: "electrical",
  },
  {
    id: 5,
    title: "Painting",
    desc: "Professional painting for homes, spaces, or businesses.",
    logo: paintingLogo,
    description:
      "We prepare surfaces and apply paint on all types of materials and structures to enhance appearance and protect surfaces from damage.",
    image: paintingPic,
    side: "l",
    date: "1999-12-22T00:00:9999",
    category: "painting",
  },
  {
    id: 6,
    title: "Carpentry",
    desc: "Carpenter specializing in custom woodwork and renovations.",
    logo: carpentryLogo,
    description:
      "We construct, install, and repair structures and fixtures made from wood and other materials, ensuring precision and quality in our craftsmanship.",
    image: carpentryPic,
    side: "r",
    date: "1999-12-22T00:00:9999",
    category: "carpentry",
  },
  {
    id: 7,
    title: "Plumbing",
    desc: "Installation and maintenance of plumbing and water systems.",
    logo: plumbingLogo,
    description:
      "We install and repair pipes, fixtures, and plumbing systems to ensure proper water distribution, drainage, and sanitation in buildings.",
    image: plumbingPic,
    side: "l",
    date: "1999-12-22T00:00:9999",
    category: "plumbing",
  },
  {
    id: 8,
    title: "Utilities",
    desc: "Common premises maintenance and repairs.",
    logo: utilitysLogo,
    description:
      "We repair and maintain various services commonly needed in houses, buildings, and offices.",
    image: utilitysPic,
    side: "r",
    date: "1999-12-22T00:00:9999",
    category: "utilities",
  },
];