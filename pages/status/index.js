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
      <Database />
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

function Database() {
  const { isLoading, data } = useQuery({
    queryKey: ["status"],
    queryFn: fetchAPI,
    refetchInterval: 2000,
  });

  let databaseStatusInformation = "carregando";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <div>
        <div>
          <span>Versão:</span> {data.dependecies.database.version}
        </div>
        <div>
          <span>Conexões abertas:</span>{" "}
          {data.dependecies.database.open_connections}
        </div>
        <div>
          <span>Conexões máximas:</span>{" "}
          {data.dependecies.database.max_connections}
        </div>
      </div>
    );
  }

  return (
    <>
      <h2>Banco de Dados</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
