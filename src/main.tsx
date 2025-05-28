import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { Bounce,ToastContainer} from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apollo/createApolloClient.ts';

const client = createApolloClient();
createRoot(document.getElementById("root")!).render(
    <ApolloProvider client={client}>
  <StrictMode>
    <ThemeProvider>
      <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
                  />
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
  </ApolloProvider>
);
