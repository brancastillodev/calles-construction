import Service from "../commons/Service";
import { services } from "../utilities/services";
import { useNavigate } from "react-router-dom";

function Services({ takeValue }: { takeValue: (value: string) => void }) {
  const navigation = useNavigate();

  const getService = (value: string) => {
    takeValue(value);
    navigation("/jobs");
  };

  return (
    <section id="services" className="home">
      <div className="services-mobile">
        <h2>Services</h2>
        {services.map((service, i) => (
          <Service getTitle={getService} key={i} element={service} />
        ))}
      </div>
      <div className="services-desktop">
        <h2>Services</h2>
        <div className="grid-services">
          {services.map((service, i) => (
            <Service getTitle={getService} key={i} element={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;