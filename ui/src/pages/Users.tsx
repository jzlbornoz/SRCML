// pages/Users.tsx
import { Table, Group, Text, ActionIcon, Menu, Button, Avatar, Title, Modal, TextInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconTrash, IconPencil, IconPlus } from '@tabler/icons-react';

export function Users() {
    const [opened, { open, close }] = useDisclosure(false);

    // Mock data
    const users = [
        { id: 1, name: 'Ana Pérez', email: 'ana@empresa.com', role: 'Admin', avatar: null },
        { id: 2, name: 'Carlos Díaz', email: 'carlos@empresa.com', role: 'Editor', avatar: null },
    ];

    const rows = users.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar size={30} src={user.avatar} radius={30} />
                    <Text size="sm" fw={500}>{user.name}</Text>
                </Group>
            </Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>{user.role}</Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <Menu transitionProps={{ transition: 'pop' }} withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots size={16} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconPencil size={16} stroke={1.5} />}>Editar</Menu.Item>
                            <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red">Eliminar</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Administración de Usuarios</Title>
                <Button leftSection={<IconPlus size={18} />} onClick={open}>Nuevo Usuario</Button>
            </Group>

            <Modal opened={opened} onClose={close} title="Crear Usuario" centered>
                <TextInput label="Nombre Completo" placeholder="Ej. Juan Perez" mb="md" />
                <TextInput label="Email" placeholder="juan@empresa.com" mb="md" />
                <Select
                    label="Rol"
                    placeholder="Seleccionar rol"
                    data={['Admin', 'Editor', 'Viewer']}
                    mb="lg"
                />
                <Button fullWidth onClick={close}>Guardar Usuario</Button>
            </Modal>

            <Table.ScrollContainer minWidth={500}>
                <Table verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Usuario</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Rol</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
}