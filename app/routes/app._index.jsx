import {
  Page,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {

  return (
    <Page>
      <TitleBar title="Shopify Sections">
        
      </TitleBar>
    </Page>
  );
}