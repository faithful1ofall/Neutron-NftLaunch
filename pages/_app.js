import { useEffect, useState } from "react";
import GlobalStyles from "@assets/styles/GlobalStyles";
import { CosmosKitProvider } from "src/lib/cosmos-kit-provider";

const App = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoids hydration mismatch errors

  return (
    <>
      <GlobalStyles />
      <CosmosKitProvider>
        <Component {...pageProps} />
      </CosmosKitProvider>
    </>
  );
};

export default App;
