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

// 1. Definición de Tipos
interface DocumentItem {
    id: string;
    title: string;
    type: 'pdf' | 'xlsx' | 'jpg' | 'docx';
    size: string;
    date: string;
    author: string;
    status: 'active' | 'archived';
}

// 2. Mock Data (Datos de prueba)
const mockDocs: DocumentItem[] = [
    { id: '1', title: 'Contrato_Servicios_2024', type: 'pdf', size: '2.4 MB', date: '2024-01-15', author: 'Ana Pérez', status: 'active' },
    { id: '2', title: 'Reporte_Financiero_Q1', type: 'xlsx', size: '1.2 MB', date: '2024-02-10', author: 'Carlos Díaz', status: 'active' },
    { id: '3', title: 'Evidencia_Pago_001', type: 'jpg', size: '4.5 MB', date: '2024-02-12', author: 'Ana Pérez', status: 'archived' },
    { id: '4', title: 'Propuesta_Comercial', type: 'docx', size: '800 KB', date: '2024-03-01', author: 'Luis M.', status: 'active' },
    { id: '5', title: 'Manual_Usuario_v2', type: 'pdf', size: '5.1 MB', date: '2024-03-05', author: 'Soporte', status: 'active' },
    { id: '6', title: 'Inventario_Bodega', type: 'xlsx', size: '3.2 MB', date: '2024-03-10', author: 'Carlos Díaz', status: 'active' },
];

// Helper para iconos según tipo de archivo
const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf': return <IconFileTypePdf color="var(--mantine-color-red-6)" />;
        case 'xlsx': return <IconFileTypeXls color="var(--mantine-color-green-6)" />;
        case 'jpg': return <IconPhoto color="var(--mantine-color-blue-6)" />;
        default: return <IconFileDescription color="var(--mantine-color-gray-6)" />;
    }
};

export function Library() {
    // 3. Estados para filtros y vista
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

    // 4. Lógica de Filtrado
    const filteredDocs = mockDocs.filter((doc) => {
        const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = typeFilter ? doc.type === typeFilter : true;
        return matchesSearch && matchesType;
    });

    // Renderizado: Vista de Lista (Tabla)
    const rows = filteredDocs.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                <Group gap="sm">
                    {getFileIcon(element.type)}
                    <Text size="sm" fw={500}>{element.title}</Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="light"
                    color={element.type === 'pdf' ? 'red' : element.type === 'xlsx' ? 'green' : 'blue'}
                >
                    {element.type.toUpperCase()}
                </Badge>
            </Table.Td>
            <Table.Td>{element.size}</Table.Td>
            <Table.Td>{element.date}</Table.Td>
            <Table.Td>{element.author}</Table.Td>
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
    const gridItems = filteredDocs.map((element) => (
        <Card key={element.id} padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <Badge variant="light">{element.type.toUpperCase()}</Badge>
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
                {getFileIcon(element.type)}
                <Text fw={600} truncate w="100%" ta="center">{element.title}</Text>
            </Stack>

            <Group justify="space-between" mt="md">
                <Text size="xs" c="dimmed">{element.date}</Text>
                <Text size="xs" fw={500}>{element.size}</Text>
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
                <Button>Subir Archivo</Button>
            </Group>

            {/* --- Barra de Filtros --- */}
            <Card withBorder padding="sm" radius="md">
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
                                    <Table.Th>Tamaño</Table.Th>
                                    <Table.Th>Fecha Subida</Table.Th>
                                    <Table.Th>Autor</Table.Th>
                                    <Table.Th />
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                    {filteredDocs.length === 0 && (
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
        </Stack>
    );
}