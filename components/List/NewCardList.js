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
} from "semantic-ui-react";

import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import baseUrl from "../../utils/baseUrl";
import EditList from "./EditList";
import { deleteList } from "../../utils/listActions";

function CardList({ list, user, setLists, setShowToastr }) {
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
        <Card color="teal" fluid>
          <Card.Content>
            <Link href={`/${list._id}`}>
              <Card.Description
                style={{
                  fontSize: "17px",
                  letterSpacing: "0.1px",
                  wordSpacing: "0.35px",
                }}
              >
                {list.text}
              </Card.Description>
            </Link>
            <>
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

              <Button
                position="top right"
                color="red"
                icon="trash"
                content="Edit"
                onClick={() => setShowModal(true)}
              />

              <br />
              <Popup
                on="click"
                position="top right"
                trigger={
                  <Image
                    src="/deleteIcon.svg"
                    style={{ cursor: "pointer" }}
                    size="mini"
                    floated="right"
                  />
                }
              >
                <Header as="h4" content="Are you sure?" />
                <p>This action is irreversible!</p>

                <Button
                  color="red"
                  icon="trash"
                  content="Delete"
                  onClick={() => deleteList(list._id, setLists)}
                />
              </Popup>
            </>
            <Card.Meta>{calculateTime(list.createdAt)}</Card.Meta>
          </Card.Content>
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
}

export default CardList;
