import { trpc } from "../hooks/trpc";

const Hello = () => {
  const result = trpc.useQuery(["getNotes"]);

  return <div>Hello</div>;
};

export default Hello;
