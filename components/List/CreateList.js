import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import { submitNewList } from "../../utils/listActions";

function CreateList({ user, setLists }) {
  const [newList, setNewList] = useState({ text: "", url: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  //   const [media, setMedia] = useState(null);
  //   const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "media") {
    //   setMedia(files[0]);
    //   setMediaPreview(URL.createObjectURL(files[0]));
    // }

    setNewList((prev) => ({ ...prev, [name]: value }));
    console.log(value);
  };

  //   const addStyles = () => ({
  //     textAlign: "center",
  //     height: "150px",
  //     width: "150px",
  //     border: "dotted",
  //     paddingTop: media === null && "60px",
  //     cursor: "pointer",
  //     borderColor: highlighted ? "green" : "black"
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // let picUrl;

    await submitNewList(newList.text, setLists, setNewList, setError);

    // setMedia(null);
    // setMediaPreview(null);
    setLoading(false);
  };

  return (
    <>
      <Form error={error !== null} onSubmit={handleSubmit}>
        <Message
          error
          onDismiss={() => setError(null)}
          content={error}
          header="Oops!"
        />

        <Form.Group>
          <Form.TextArea
            placeholder="ADD NEW SECTION ? Type here..."
            name="text"
            value={newList.text}
            onChange={handleChange}
            rows={2}
            width={16}
          />
        </Form.Group>

        <Form.Group>
          {/* <Form.Input
            value={newList.url}
            name="url"
            onChange={handleChange}
            label="Image URL"
            icon="map marker alternate"
            placeholder="Image url"
          /> */}

          {/* <input
            ref={inputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          /> */}
        </Form.Group>

        {/* <div
          onClick={() => inputRef.current.click()}
          style={addStyles()}
          onDrag={e => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={e => {
            e.preventDefault();
            setHighlighted(true);

            const droppedFile = Array.from(e.dataTransfer.files);

            setMedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}>
          {media === null ? (
            <Icon name="plus" size="big" />
          ) : (
            <>
              <Image
                style={{ height: "150px", width: "150px" }}
                src={mediaPreview}
                alt="PostImage"
                centered
                size="medium"
              />
            </>
          )}
        </div> */}
        {/* <Divider hidden /> */}

        <Button
          circular
          id="add-btn"
          disabled={newList.text === "" || loading}
          content={<strong>Add</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          loading={loading}
        />
      </Form>
      <Divider />
    </>
  );
}

export default CreateList;
