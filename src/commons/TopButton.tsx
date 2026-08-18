function TopButton() {
  function handleGo() {
    const refe = document.getElementById("navbar");

    if (refe) {
      refe.scrollIntoView({ behavior: "smooth" });
    }
  }

  return <button onClick={handleGo}>Go to Top</button>;
}

export default TopButton;