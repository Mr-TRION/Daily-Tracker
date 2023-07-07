import React, { useState } from "react";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Button,
  Popup,
  Header,
  Modal,
  Menu,
  Container,
} from "semantic-ui-react";

import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import baseUrl from "../../utils/baseUrl";
import EditList from "./EditList";
import { deleteList } from "../../utils/listActions";

// import { deletePost, likePost } from "../../utils/postActions";
function CardList({ listId, list, user, setLists, setShowToastr }) {
  //   const [likes, setLikes] = useState(post.likes);

  //   const isLiked =
  //     likes.length > 0 &&
  //     likes.filter((like) => like.user === user._id).length > 0;

  const [todo, setTodo] = useState(list.todo);

  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const addPropsToModal = () => ({
    list,
    user,
    todo,
    setTodo,
  });

  return (
    <>
      <Segment basic>
        <Menu id="menu" fluid borderless>
          <Container>
            <Link href={`/${listId}`}>
              <Menu.Item header>
                <h2 id="list-head">{list.text}</h2>
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
                    <EditList
                      list={list}
                      listId={list._id}
                      user={user}
                      setLists={setLists}
                    />
                  </Modal.Content>
                </Modal>
              )}
              <Menu.Item onClick={() => setShowModal(true)}>
                <h5 id="edit-btn">Edit</h5>
              </Menu.Item>
              <Menu.Item onClick={() => deleteList(listId, setLists)} header>
                <h5 id="del-btn">Delete</h5>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    </>
  );
}

export default CardList;
