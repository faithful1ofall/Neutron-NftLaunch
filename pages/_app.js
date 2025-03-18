import { useEffect, useState } from "react";
import GlobalStyles from "@assets/styles/GlobalStyles";
import { CosmosKitProvider } from "src/lib/cosmos-kit-provider";
import ContextProvider from "src/utils/ContextProvider";

const App = ({ Component, pageProps }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoids hydration mismatch errors

  return (
      <CosmosKitProvider>

    <ContextProvider>
         <GlobalStyles />
        <Component {...pageProps} />
    </ContextProvider>
      </CosmosKitProvider>
  );
};

export default App;
