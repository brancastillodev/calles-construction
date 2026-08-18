interface TextProps {
  text: {
    title: string;
    desc: string;
  };
}

function Text({ text }: TextProps) {
  return (
    <div className="text-compo">
      <h3> {text.title}</h3>
      <p> {text.desc}</p>
    </div>
  );
}

export default Text;