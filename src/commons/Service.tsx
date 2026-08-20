import { useLang } from "../utils/i18n";

interface ServiceElement {
  id?: number;
  title: string;
  desc: string;
  logo: string;
  description: string;
  image: string;
  side: string;
  date: string;
  category: string;
}

interface ServiceProps {
  element: ServiceElement;
  getTitle: (title: string) => void;
}

function Service({ element, getTitle }: ServiceProps) {
  const { t } = useLang();
  const key = `services.${element.title.toLowerCase()}`;

  return (
    <div className="service">
      <figure>
        <img src={element.logo} alt={element.title} />
      </figure>
      <a
        tabIndex={0}
        onClick={() => getTitle(element.category)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            getTitle(element.category);
          }
        }}
      >
        {t(key)}
      </a>
      <p>{t(`${key}Desc`)}</p>
    </div>
  );
}

export default Service;