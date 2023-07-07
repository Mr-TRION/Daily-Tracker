import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Nav() {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  let show;

  if (router.pathname === "/signup") {
    show = (
      <Menu.Item header>
        <Link href="/login">
          <h5 id="auth-link">Login</h5>
        </Link>
      </Menu.Item>
    );
  } else {
    show = (
      <Menu.Item header>
        <Link href="/signup">
          <h5 id="auth-link">Sign Up</h5>
        </Link>
      </Menu.Item>
    );
  }

  return (
    <Menu id="menu" fluid borderless>
      <Container id="container-id">
        <Link href="/login">
          <Menu.Item header>
            <h2 id="brand-name">Eubrics</h2>
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">{show}</Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Nav;
