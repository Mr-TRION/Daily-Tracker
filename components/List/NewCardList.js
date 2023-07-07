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
// import PostComments from "./PostComments";
// import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import baseUrl from "../../utils/baseUrl";
import EditList from "./EditList";
import { deleteList } from "../../utils/listActions";

// import { deletePost, likePost } from "../../utils/postActions";
function CardList({ list, user, setLists, setShowToastr }) {
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
      {/* {showModal && (
        <Modal
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
        >
          <Modal.Content>
            {post.picUrl ? (
              <ImageModal {...addPropsToModal()} />
            ) : (
              <NoImageModal {...addPropsToModal()} />
            )}
          </Modal.Content>
        </Modal>
      )} */}

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

            {/* {post.location && <Card.Meta content={post.location} />} */}
          </Card.Content>

          {/* <Card.Content extra> */}
          {/* <Icon
              name={isLiked ? "heart" : "heart outline"}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() =>
                likePost(post._id, user._id, setLikes, isLiked ? false : true)
              }
            /> */}

          {/* <LikesList
              postId={post._id}
              trigger={
                likes.length > 0 && (
                  <span className="spanLikesList">
                    {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
                  </span>
                )
              }
            /> */}

          {/* <Icon
              name="comment outline"
              style={{ marginLeft: "7px" }}
              color="blue"
            /> */}

          {/* {comments.length > 0 &&
              comments.map(
                (comment, i) =>
                  i < 3 && (
                    <PostComments
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
                  )
              )} */}

          {/* {comments.length > 3 && (
              <Button
                content="View More"
                color="teal"
                basic
                circular
                onClick={() => setShowModal(true)}
              />
            )} */}

          {/* <Divider hidden /> */}

          {/* <CommentInputField
              user={user}
              postId={post._id}
              setComments={setComments}
            /> */}
          {/* </Card.Content> */}
        </Card>
      </Segment>
      <Divider hidden />
    </>
  );
}

export default CardList;
