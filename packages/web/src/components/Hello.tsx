import { trpc } from "../hooks/trpc";

const Hello = () => {
  const result = trpc.useQuery(["getUserById", { id: "1" }]);

  return <div>Hello</div>;
};

export default Hello;
