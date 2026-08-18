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
  return (
    <div className="service">
      <figure>
        <img src={element.logo} alt={element.title} />
      </figure>
      <a onClick={() => getTitle(element.title)}>{element.title}</a>
      <p>{element.desc}</p>
    </div>
  );
}

export default Service;