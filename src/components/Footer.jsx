function Footer() {
  return (
    <footer className="bg-red-600 text-white text-center py-4 mt-auto">
      <p className="text-sm">
        PokéWiki — Data from{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-yellow-400"
        >
          PokéAPI
        </a>
      </p>
    </footer>
  );
}

export default Footer;
