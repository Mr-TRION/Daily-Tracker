import React, { useState } from "react";
import {
  Comment,
  Icon,
  Modal,
  Segment,
  Menu,
  Container,
} from "semantic-ui-react";
import { deleteTodos } from "../../utils/listActions";
import EditTodo from "./EditTodo";
import Link from "next/link";

function PostTodo({ listId, list, todo, setTodo, user }) {
  const [disabled, setDisabled] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const addPropsToModal = () => ({
    todo,
    todo,
    listId,
    user,
    setTodo,
  });

  return (
    <>
      <Segment basic>
        <Menu id="menu" fluid borderless>
          <Container>
            <Link id="disabled" href="">
              <Menu.Item header>
                <h2 id="todo-head">{todo.text}</h2>
              </Menu.Item>
            </Link>
            <Menu.Menu position="right">
              {showModal && (
                <Modal
                  open={showModal}
                  closeIcon
                  closeOnDimmerClick
                  onClose={() => setShowModal(false)}
                >
                  <Modal.Content>
                    <EditTodo
                      key={todo._id}
                      todoId={todo._id}
                      todo={todo}
                      listId={listId}
                      user={user}
                      setTodo={setTodo}
                    />
                  </Modal.Content>
                </Modal>
              )}
              <Menu.Item onClick={() => setShowModal(true)}>
                <h5 id="edit-btn">Edit</h5>
              </Menu.Item>
              <Menu.Item
                onClick={async () => {
                  setDisabled(true);
                  await deleteTodos(listId, todo._id, setTodo);
                  setDisabled(false);
                }}
                header
              >
                <h5 id="del-btn">Delete</h5>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    </>
  );
}

export default PostTodo;
