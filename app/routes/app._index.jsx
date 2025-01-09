import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(
    `#graphql
      query shopInfo {
        shop {
          shopOwnerName
          name
        }
      }`
    );
  const responseJson = await response.json();
  //console.log(responseJson);
  return json(responseJson.data?.shop);
  
};

export default function Index() {
  const data = useLoaderData();
  console.log(data);
  return (
    <Page>
      <TitleBar title="Shopify Sections">
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Hi {data.shopOwnerName}, 
                  </Text>
                  <Text as="p" variant="headingMd">
                  Your store has added Shopify sections. Please go to the theme customization section and choose the section you want. 
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}