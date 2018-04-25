import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./containers/Root";
import { configureStore, history } from "./store/configureStore";
import { ipcRenderer } from "electron";

ipcRenderer.on("getMachineId-reply", (event, arg) => {
  window.meta = {
    machineId: arg
  };

  const store = configureStore({
    auth: {
      status: false,
      email: ""
    }
  });

  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById("root")
  );

  if (module.hot) {
    module.hot.accept("./containers/Root", () => {
      const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        document.getElementById("root")
      );
    });
  }
});
ipcRenderer.send("getMachineId");
