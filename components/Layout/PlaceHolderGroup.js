import React from "react";
import { Placeholder, Divider } from "semantic-ui-react";
import { range } from "lodash";

export const PlaceHolderPosts = () =>
  range(1, 3).map((item) => (
    <>
      <Placeholder key={item} fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <Divider hidden />
    </>
  ));
