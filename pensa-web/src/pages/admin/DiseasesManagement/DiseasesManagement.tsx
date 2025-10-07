import { useState } from "react";
import {
  Box,
  Title,
  Button,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Modal,
  Stack,
  Textarea,
  Select,
} from "@mantine/core";
import { IconPlus, IconPencil, IconTrash, IconStar } from "@tabler/icons-react";
import { useQuery } from "react-query";
import { diseasesService } from "../../../services/diseases.service";

import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export function DiseasesManagement() {
  const [modalOpened, setModalOpened] = useState(false);
  const [editingDisease, setEditingDisease] = useState<any>(null);

  const { data, refetch } = useQuery("adminDiseases", () =>
    diseasesService.getAll(0, 100)
  );

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      symptoms: "",
      treatment: "",
      prevention: "",
      category: "",
    },
  });

  const handleOpenModal = (disease?: any) => {
    if (disease) {
      setEditingDisease(disease);
      form.setValues(disease);
    } else {
      setEditingDisease(null);
      form.reset();
    }
    setModalOpened(true);
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      // Aqui você chamaria a API para criar/atualizar
      notifications.show({
        title: "Sucesso!",
        message: editingDisease ? "Doença atualizada" : "Doença criada",
        color: "green",
      });
      setModalOpened(false);
      refetch();
    } catch {
      notifications.show({
        title: "Erro",
        message: "Não foi possível salvar",
        color: "red",
      });
    }
  };

  const handleSetFeatured = async (
    diseaseId: number,
    type: "week" | "month"
  ) => {
    try {
      // Chamar API para definir como destaque
      notifications.show({
        title: "Sucesso!",
        message: `Doença definida como destaque da ${
          type === "week" ? "semana" : "mês"
        }`,
        color: "green",
      });
      refetch();
    } catch {
      notifications.show({
        title: "Erro",
        message: "Não foi possível definir como destaque",
        color: "red",
      });
    }
  };

  const rows = data?.data?.content?.map((disease: any) => (
    <Table.Tr key={disease.id}>
      <Table.Td>{disease.name}</Table.Td>
      <Table.Td>
        <Badge color="cyan" variant="light">
          {disease.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        {disease.isFeatured && (
          <Badge color="yellow" leftSection={<IconStar size={14} />}>
            Destaque
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => handleOpenModal(disease)}
          >
            <IconPencil size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="red">
            <IconTrash size={16} />
          </ActionIcon>
          <Button
            size="xs"
            variant="light"
            onClick={() => handleSetFeatured(disease.id, "week")}
          >
            Semana
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() => handleSetFeatured(disease.id, "month")}
          >
            Mês
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Gestão de Doenças</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => handleOpenModal()}
        >
          Nova Doença
        </Button>
      </Group>

      <TextInput placeholder="Pesquisar doenças..." mb="md" size="md" />

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nome</Table.Th>
            <Table.Th>Categoria</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* Modal de Criação/Edição */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editingDisease ? "Editar Doença" : "Nova Doença"}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Nome"
              placeholder="Nome da doença"
              required
              {...form.getInputProps("name")}
            />

            <Select
              label="Categoria"
              placeholder="Selecione uma categoria"
              data={[
                { value: "INFECTIOUS_DISEASES", label: "Doenças Infecciosas" },
                { value: "CHRONIC_DISEASES", label: "Doenças Crônicas" },
                { value: "CARDIOVASCULAR", label: "Cardiovascular" },
                { value: "RESPIRATORY", label: "Respiratório" },
                { value: "MENTAL_HEALTH", label: "Saúde Mental" },
              ]}
              {...form.getInputProps("category")}
            />

            <Textarea
              label="Descrição"
              placeholder="Descrição da doença"
              minRows={3}
              {...form.getInputProps("description")}
            />

            <Textarea
              label="Sintomas"
              placeholder="Sintomas da doença"
              minRows={3}
              {...form.getInputProps("symptoms")}
            />

            <Textarea
              label="Tratamento"
              placeholder="Como tratar"
              minRows={3}
              {...form.getInputProps("treatment")}
            />

            <Textarea
              label="Prevenção"
              placeholder="Como prevenir"
              minRows={3}
              {...form.getInputProps("prevention")}
            />

            <Group justify="flex-end">
              <Button variant="light" onClick={() => setModalOpened(false)}>
                Cancelar
              </Button>
              <Button type="submit" color="cyan">
                Salvar
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}

