import { useQuery } from "@tanstack/react-query";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();

  return responseBody;
}

export default function Status() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useQuery({
    queryKey: ["status"],
    queryFn: fetchAPI,
    refetchInterval: 2000,
  });

  let updatedAtText = "carregando";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <p>última atualização: {updatedAtText}</p>;
}
