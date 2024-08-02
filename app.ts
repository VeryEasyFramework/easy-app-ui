import { EasyApp } from "@eveffer/easy-app";

const app = new EasyApp({
  appRootPath: ".",
  staticFilesOptions: {
    staticFilesRoot: "./client/dist",
  },
});

function runClientDev() {
  const command = new Deno.Command(Deno.execPath(), {
    args: ["task", "client-dev"],
  });
  const process = command.spawn();
  process.status.then(() => {
    console.error("Process exited");
  });
}

if (import.meta.main) {
  const dev = Deno.args[0] === "dev";
  switch (dev) {
    case true:
      runClientDev();
      app.run({
        clientProxyPort: 5174,
      });
      break;
    case false:
      app.run();
      break;
  }
}
