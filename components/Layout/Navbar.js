import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logoutUser } from "../../utils/authUser";

function Navbar({ user }) {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;

  return (
    <Menu id="menu" fluid borderless>
      <Container id="container-id">
        <Menu.Item header>
          <Link href="/login">
            <h2 id="brand-name">Eubrics</h2>
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item onClick={() => logoutUser(user.email)} header>
            <h5 id="auth-link">Logout?</h5>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Navbar;
