import { useLang } from "../utils/i18n";

interface TextProps {
  text: {
    title: string;
    desc: string;
  };
}

function Text({ text }: TextProps) {
  const { t } = useLang();
  const key = text.title.toLowerCase();
  return (
    <div className="text-compo">
      <h3> {t(`texts.${key}`)}</h3>
      <p> {t(`texts.${key}Desc`)}</p>
    </div>
  );
}

export default Text;