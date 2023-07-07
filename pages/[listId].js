import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Container,
} from "semantic-ui-react";

import Link from "next/link";
import calculateTime from "../utils/calculateTime";
import baseUrl from "../utils/baseUrl";
import TodoInputField from "../components/List/TodoInputField";
import PostTodo from "../components/List/PostTodo";

function ListPage({ list, errorLoading, user }) {
  const [todo, setTodo] = useState(list.todo);

  return (
    <Segment basic>
      <Card color="teal" fluid>
        <Card.Content>
          <Card.Description
            style={{
              fontSize: "28px",
              fontWeight: "400px",
              letterSpacing: "0.1px",
              wordSpacing: "0.35px",
            }}
          >
            {list.text}
          </Card.Description>
          <Divider hidden />

          {/* <Card.Meta>{calculateTime(list.createdAt)}</Card.Meta> */}
        </Card.Content>

        <Card.Content extra>
          <TodoInputField user={user} listId={list._id} setTodo={setTodo} />

          <Divider hidden />
          {todo.length > 0 &&
            todo.map((todo) => (
              <PostTodo
                key={todo._id}
                todoId={todo._id}
                todo={todo}
                listId={list._id}
                user={user}
                setTodo={setTodo}
              />
            ))}

          <Divider hidden />
        </Card.Content>
      </Card>
    </Segment>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { listId } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/lists/${listId}`, {
      headers: { Authorization: token },
    });

    return { props: { list: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default ListPage;
