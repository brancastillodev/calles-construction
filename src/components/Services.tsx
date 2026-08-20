import Service from "../commons/Service";
import { services } from "../utilities/services";
import { useNavigate } from "react-router-dom";
import { tlink } from "../utils/tenant";
import { useLang } from "../utils/i18n";

function Services({ takeValue }: { takeValue: (value: string) => void }) {
  const navigation = useNavigate();
  const { t } = useLang();

  const getService = (value: string) => {
    takeValue(value);
    navigation(tlink("/jobs"));
  };

  return (
    <section id="services" className="home">
      <div className="services-mobile">
        <h2>{t("nav.services")}</h2>
        {services.map((service) => (
          <Service getTitle={getService} key={service.title} element={service} />
        ))}
      </div>
      <div className="services-desktop">
        <h2>{t("nav.services")}</h2>
        <div className="grid-services">
          {services.map((service) => (
            <Service getTitle={getService} key={service.title} element={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;