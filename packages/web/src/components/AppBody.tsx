import {
  Card,
  Text,
  Container,
  Textarea,
  Button,
  Grid,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useFormik } from "formik";

import { trpc } from "../hooks/trpc";
interface IFormFields {
  content: string;
}

const AppBody = () => {
  const utils = trpc.useContext();
  const getNotes = trpc.useQuery(["getNotes"]);
  const createNote = trpc.useMutation(["createNote"]);
  const deleteNote = trpc.useMutation(["deleteNote"]);

  const formik = useFormik<IFormFields>({
    initialValues: {
      content: "",
    },
    onSubmit: async (values) => {
      await createNote.mutateAsync(
        {
          text: values.content,
        },
        {
          onSuccess: () => {
            utils.invalidateQueries(["getNotes"]);
            formik.resetForm();
          },
        }
      );
    },
  });

  const handleNoteRemoval = useCallback(async (id: number) => {
    await deleteNote.mutateAsync(
      {
        id,
      },
      {
        onSuccess: () => {
          utils.invalidateQueries(["getNotes"]);
        },
      }
    );
  }, []);

  return (
    <Container>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 50,
        }}
      >
        <Textarea
          underlined
          color="primary"
          labelPlaceholder="Type something..."
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          css={{ width: 350 }}
        />
        <Button
          shadow
          color="primary"
          auto
          css={{ marginLeft: 25 }}
          size="lg"
          type="submit"
        >
          Create
        </Button>
      </form>
      <Grid.Container gap={2}>
        {getNotes.data?.map((note) => (
          <Grid xs={4} key={note.id} onClick={() => handleNoteRemoval(note.id)}>
            <Card isHoverable variant="bordered" css={{ cursor: "pointer" }}>
              <Card.Body>
                <Text
                  h4
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                  weight="bold"
                >
                  {note.text}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
};

export default AppBody;
