import { defineCliConfig } from "sanity/cli";

import { sanityEnv } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId || "your-project-id",
    dataset: sanityEnv.dataset || "production",
  },
});
