import { useState } from 'react';
import {
    Title,
    TextInput,
    Select,
    Button,
    Group,
    Stack,
    Table,
    Badge,
    ActionIcon,
    Menu,
    Pagination,
    Text,
    Card,
    SimpleGrid,
    Center,
    Skeleton,
} from '@mantine/core';
import {
    IconSearch,
    IconFilter,
    IconLayoutGrid,
    IconList,
    IconDotsVertical,
    IconDownload,
    IconTrash,
    IconEye,
    IconFileTypePdf,
    IconFileTypeXls,
    IconPhoto,
    IconFileDescription
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import RegisterDocumentModal from '../components/RegisterDocumentModal';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../services/document';

const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf': return <IconFileTypePdf color="var(--mantine-color-red-6)" />;
        case 'xlsx': return <IconFileTypeXls color="var(--mantine-color-green-6)" />;
        case 'jpg': return <IconPhoto color="var(--mantine-color-blue-6)" />;
        default: return <IconFileDescription color="var(--mantine-color-gray-6)" />;
    }
};

export function Library() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    const [opened, { open, close }] = useDisclosure(false);

    const { data: documents, isPending: isDocumentsPending } = useQuery({
        queryKey: [getDocuments.key],
        queryFn: getDocuments.fn
    })

    const filteredDocs = documents?.filter((doc) => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter ? doc.category === typeFilter : true;
        return matchesSearch && matchesType;
    });

    const rows = documents?.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <Group gap="sm">
                    {getFileIcon(element.category)}
                    <Text size="sm" fw={500}>{element.title}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="light"
                    color={element.category === 'pdf' ? 'red' : element.category === 'xlsx' ? 'green' : 'blue'}
                >
                    {element.category.toUpperCase()}
                </Badge>
            </Table.Td>
            <Table.Td>{new Date(element.createdAt).toLocaleDateString()}</Table.Td>
            <Table.Td>{element.user.name}</Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: 'pop' }} withArrow position="bottom-end" shadow="md">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconEye size={16} />}>Previsualizar</Menu.Item>
                            <Menu.Item leftSection={<IconDownload size={16} />}>Descargar</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item leftSection={<IconTrash size={16} />} color="red">Eliminar</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    // Renderizado: Vista de Grid (Tarjetas)
    const gridItems = filteredDocs?.map((element) => (
        <Card key={element.id} padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Badge variant="light">{element.category.toUpperCase()}</Badge>
                    <Menu position="bottom-end" shadow="md">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray" size="sm"><IconDotsVertical size={14} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconDownload size={14} />}>Descargar</Menu.Item>
                            <Menu.Item leftSection={<IconTrash size={14} />} color="red">Eliminar</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card.Section>

            <Stack align="center" mt="md" mb="md" gap="xs">
                {getFileIcon(element.category)}
                <Text fw={600} truncate w="100%" ta="center">{element.title}</Text>
            </Stack>

            <Group justify="space-between" mt="md">
                <Text size="xs" c="dimmed">{new Date(element.createdAt).toLocaleDateString()}</Text>
                <Text size="xs" fw={500}>{element.user.name}</Text>
            </Group>
        </Card>
    ));

    return (
        <Stack gap="lg">
            {/* --- Header y Controles Superiores --- */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Biblioteca de Archivos</Title>
                    <Text c="dimmed" size="sm">Gestiona y organiza la documentación del sistema</Text>
                </div>
                <Button onClick={open}>Subir Archivo</Button>
            </Group>
            <Skeleton visible={isDocumentsPending} height={150} width="100%">
                {/* --- Barra de Filtros --- */}
                <Card withBorder padding="sm" radius="md" mb={'md'}>
                    <Group justify="space-between">
                        <Group gap="md" style={{ flexGrow: 1 }}>
                            <TextInput
                                placeholder="Buscar archivo..."
                                leftSection={<IconSearch size={16} />}
                                value={search}
                                onChange={(event) => setSearch(event.currentTarget.value)}
                                style={{ flexGrow: 1, maxWidth: '300px' }}
                            />
                            <Select
                                placeholder="Tipo de archivo"
                                leftSection={<IconFilter size={16} />}
                                data={[
                                    { value: 'pdf', label: 'Documentos PDF' },
                                    { value: 'xlsx', label: 'Excel / Hojas de Cálculo' },
                                    { value: 'jpg', label: 'Imágenes' },
                                ]}
                                value={typeFilter}
                                onChange={setTypeFilter}
                                clearable
                                w={200}
                            />
                        </Group>

                        {/* Toggle de Vista (Lista / Grid) */}
                        <Group gap={5}>
                            <ActionIcon
                                variant={viewMode === 'list' ? 'filled' : 'light'}
                                onClick={() => setViewMode('list')}
                                size="lg"
                            >
                                <IconList size={18} />
                            </ActionIcon>
                            <ActionIcon
                                variant={viewMode === 'grid' ? 'filled' : 'light'}
                                onClick={() => setViewMode('grid')}
                                size="lg"
                            >
                                <IconLayoutGrid size={18} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card>
                {/* --- Área de Contenido --- */}
                {viewMode === 'list' ? (
                    <Card withBorder radius="md" p={0}>
                        <Table.ScrollContainer minWidth={800}>
                            <Table verticalSpacing="sm" highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Nombre del Archivo</Table.Th>
                                        <Table.Th>Tipo</Table.Th>
                                        {/* <Table.Th>Tamaño</Table.Th> */}
                                        <Table.Th>Fecha Subida</Table.Th>
                                        <Table.Th>Autor</Table.Th>
                                        <Table.Th />
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rows}</Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                        {documents?.length === 0 && (
                            <Center h={100}>
                                <Text c="dimmed">No se encontraron documentos.</Text>
                            </Center>
                        )}
                    </Card>
                ) : (
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                        {gridItems}
                    </SimpleGrid>
                )}

                {/* --- Paginación --- */}
                <Group justify="center" mt="xl">
                    <Pagination total={5} color="indigo" />
                </Group>
            </Skeleton>
            <RegisterDocumentModal opened={opened} close={close} />
        </Stack>
    );
}