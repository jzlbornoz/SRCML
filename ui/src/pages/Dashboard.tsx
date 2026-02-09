// pages/Dashboard.tsx
import { Paper, Text, RingProgress, Group, SimpleGrid, Table, Badge, Skeleton } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../services/document';

export function Dashboard() {
    const stats = [
        { label: 'Archivos Totales', value: '1,240', diff: 12, color: 'teal' },
        { label: 'Almacenamiento', value: '45 GB', diff: -2, color: 'red' },
        { label: 'Usuarios Activos', value: '34', diff: 5, color: 'blue' },
    ];

    const { data: documents, isPending } = useQuery({
        queryKey: [getDocuments.key],
        queryFn: getDocuments.fn
    })

    return (
        <>
            <Text size="xl" fw={700} mb="lg">Dashboard General</Text>

            {/* Tarjetas de Estadísticas */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
                {stats.map((stat) => (
                    <Paper key={stat.label} radius="md">
                        <Group justify="space-between">
                            <div>
                                <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                                    {stat.label}
                                </Text>
                                <Text fw={700} size="xl">
                                    {stat.value}
                                </Text>
                            </div>
                            <RingProgress
                                size={80}
                                roundCaps
                                thickness={8}
                                sections={[{ value: 70, color: stat.color }]}
                                label={
                                    <Group justify="center" gap={0}>
                                        {stat.diff > 0 ? <IconArrowUpRight size={16} color="green" /> : <IconArrowDownRight size={16} color="red" />}
                                    </Group>
                                }
                            />
                        </Group>
                    </Paper>
                ))}
            </SimpleGrid>

            {/* Tabla de Archivos Recientes */}
            <Skeleton visible={isPending} height={100} width="100%">
                <Paper radius="md">
                    <Text size="lg" fw={600} mb="md">Archivos Recientes</Text>
                    <Table highlightOnHover verticalSpacing="sm">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nombre</Table.Th>
                                <Table.Th>Fecha</Table.Th>
                                <Table.Th>Autor</Table.Th>
                                <Table.Th>Categoría</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {documents?.map((file) => (
                                <Table.Tr key={file.id}>
                                    <Table.Td>{file.title}</Table.Td>
                                    <Table.Td>{new Date(file.createdAt).toLocaleDateString()}</Table.Td>
                                    <Table.Td>{file.user.name}</Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={'yellow'}
                                        >
                                            {file.category}
                                        </Badge>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper >
            </Skeleton >
        </>
    );
}