import { createAction, EasyApp } from "@vef/easy-app";

const app = new EasyApp({
  appRootPath: ".",
  staticFilesOptions: {
    staticFilesRoot: "./client/dist",
  },
});

app.addAction(
  "app",
  createAction("ping", {
    description: "Ping the server",
    action: async () => {
      return "pong";
    },
  }),
);

if (import.meta.main) {
  const dev = Deno.args[0] === "dev";
  switch (dev) {
    case true:
      app.run({
        clientProxyPort: 5174,
      });
      break;
    case false:
      app.run();
      break;
  }
}
