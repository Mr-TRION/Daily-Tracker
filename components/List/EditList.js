import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Form, Button, Image, Divider, Icon, Message } from "semantic-ui-react";
import { listUpdate } from "../../utils/listActions";

function EditList({ list, listId, setLists }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const [newList, setNewList] = useState({
    text: list.text,
  });

  console.log(newList.text);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewList((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await listUpdate(list, newList, setLoading, setErrorMsg);
        }}
      >
        <Message
          onDismiss={() => setErrorMsg(false)}
          error
          content={errorMsg}
          attached
          header="Oops!"
        />

        <Form.Group>
          <Form.TextArea
            placeholder=""
            name="text"
            value={newList.text}
            onChange={handleChange}
            rows={2}
            width={16}
          />
        </Form.Group>

        <Divider hidden />

        <Button
          circular
          disabled={newList.text === "" || loading}
          content={<strong>Update</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          loading={loading}
        />
      </Form>
    </>
  );
}

export default EditList;
