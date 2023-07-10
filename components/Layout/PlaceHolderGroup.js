import React from "react";
import { Placeholder, Divider, Container, Icon } from "semantic-ui-react";
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

export const EndMessage = () => (
  <Container textAlign="center">
    <Icon name="refresh" size="large" />
    <Divider hidden />
  </Container>
);
