import { withRouter } from "next/router";
import React from "react";

function TabsContent({ router, slug, tabs }) {
  const { query } = router;
  const link = query[slug];

  return <div>{!link ? tabs.default : tabs[link]}</div>;
}

export default withRouter(TabsContent);
