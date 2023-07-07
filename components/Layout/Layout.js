import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Nav from "./Nav";
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Divider,
  Segment,
} from "semantic-ui-react";
import nprogress from "nprogress";
import Router from "next/router";
import Navbar from "./Navbar";

function Layout({ children, user }) {
  const contextRef = createRef();

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      {user ? (
        <>
          <Navbar user={user} />
          <div>
            <Ref innerRef={contextRef}>
              <Grid>
                <div id="home-layout" style={{ paddingTop: "2rem" }}>
                  {children}
                </div>
              </Grid>
            </Ref>
          </div>
        </>
      ) : (
        <>
          <Nav />
          <Container text style={{ paddingTop: "1rem" }}>
            {children}
          </Container>
        </>
      )}
    </>
  );
}

export default Layout;
