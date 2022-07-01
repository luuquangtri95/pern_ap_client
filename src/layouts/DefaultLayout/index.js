import { Card, Layout, Page } from "@shopify/polaris";
import React from "react";
import Header from "../partials/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Page fullWidth>
        <Layout.Section>
          <div className="content">{children}</div>
        </Layout.Section>
      </Page>
    </>
  );
}

export default DefaultLayout;
