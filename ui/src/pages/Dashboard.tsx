// pages/Dashboard.tsx
import { Paper, Text, RingProgress, Group, SimpleGrid, Table, Badge } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../services/document';

export function Dashboard() {
    const stats = [
        { label: 'Archivos Totales', value: '1,240', diff: 12, color: 'teal' },
        { label: 'Almacenamiento', value: '45 GB', diff: -2, color: 'red' },
        { label: 'Usuarios Activos', value: '34', diff: 5, color: 'blue' },
    ];

    const files = [
        { name: 'Reporte_2023.pdf', size: '2.5 MB', type: 'PDF', status: 'Verificado' },
        { name: 'Backup_DB.sql', size: '150 MB', type: 'SQL', status: 'Pendiente' },
        { name: 'Logo_Final.png', size: '4.2 MB', type: 'Image', status: 'Rechazado' },
    ];

    const { data: documents } = useQuery({
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
            <Paper radius="md">
                <Text size="lg" fw={600} mb="md">Archivos Recientes</Text>
                <Table highlightOnHover verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nombre</Table.Th>
                            <Table.Th>Tamaño</Table.Th>
                            <Table.Th>Tipo</Table.Th>
                            <Table.Th>Estado</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {files.map((file) => (
                            <Table.Tr key={file.name}>
                                <Table.Td>{file.name}</Table.Td>
                                <Table.Td>{file.size}</Table.Td>
                                <Table.Td>{file.type}</Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={file.status === 'Verificado' ? 'green' : file.status === 'Rechazado' ? 'red' : 'yellow'}
                                    >
                                        {file.status}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </>
    );
}