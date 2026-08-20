import { useState } from "react";
import emailjs from "emailjs-com";
import { alerts } from "../utils/alerts";
import ReactLoading from "react-loading";
import { useLang } from "../utils/i18n";

function Estimate() {
  const { t } = useLang();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const USER_ID = import.meta.env.VITE_USER_ID;

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSending(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      number: number,
      message: message,
      reply_to: email,
    };

    try {
      const res = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        USER_ID
      );

      if (res) {
        alerts(t("estimate.thanks"), t("estimate.thanksMsg"), "success");

        setNumber("");
        setEmail("");
        setName("");
        setMessage("");
        setSending(false);
      } else {
        alerts("Sorry!", "Please contact me in another way!", "warning");
      }
    } catch (e) {
      alerts("Sorry!", "Please contact me in another way!", "warning");
    }
    setSending(false);
  };

  return (
    <section id="estimate" className="estimate-compo home">
      <h2>{t("estimate.title")}</h2>

      <form onSubmit={handleForm}>
        <div className="field">
          <label htmlFor="name">{t("estimate.name")}</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            maxLength={25}
          />
        </div>
        <div className="field">
          <label htmlFor="email">{t("estimate.email")}</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            maxLength={30}
          />
        </div>
        <div className="field">
          <label htmlFor="number">{t("estimate.phone")}</label>
          <input
            id="number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            type="number"
            max={999999999999999}
            min={1111}
          />
        </div>
        <div className="field">
          <label htmlFor="message">{t("estimate.message")}</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            maxLength={400}
          />
        </div>
        <div className="estimate-button">
          {sending ? (
            <div style={{ margin: "0 auto" }}>
              <ReactLoading
                type="spin"
                color="var(--principal)"
                height={50}
                width={50}
              />
            </div>
          ) : (
            <button type="submit">{t("home.estimate")}</button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Estimate;