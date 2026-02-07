import { Paper, Title, Text, Avatar, Grid, TextInput } from '@mantine/core';
import { useUser } from '@clerk/clerk-react';

export function Profile() {

    const { user } = useUser();

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper h="100%">
                    <Avatar size={120} radius={120} mx="auto" color="indigo" mb="md">{`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}</Avatar>
                    <Text size="xl" fw={700}>{user?.firstName} {user?.lastName}</Text>
                    <Text c="dimmed" size="sm">Administrador del Sistema</Text>
                </Paper>
            </Grid.Col>

            {/* Columna Derecha: Formulario de Datos */}
            <Grid.Col span={{ base: 12, md: 8 }}>
                <Paper title="Información Personal">
                    <Title order={4} mb="md">Editar Perfil</Title>
                    <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <TextInput label="Nombre" defaultValue={user?.firstName || ''} disabled />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                            <TextInput label="Apellido" defaultValue={user?.lastName || ''} disabled />
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <TextInput label="Email Corporativo" defaultValue={user?.primaryEmailAddress?.emailAddress || ''} disabled />
                        </Grid.Col>
                        {/* <Grid.Col span={12}>
                            <FileInput
                                label="Foto de Perfil"
                                placeholder="Subir imagen"
                                leftSection={<IconUpload size={14} />}
                            />
                        </Grid.Col> */}
                        {/* <Grid.Col span={12}>
                            <Textarea label="Bio" placeholder="Escribe algo sobre ti..." autosize minRows={3} />
                        </Grid.Col> */}
                    </Grid>

                    {/* <Group justify="flex-end" mt="xl">
                        <Button variant="default">Cancelar</Button>
                        <Button>Guardar Cambios</Button>
                    </Group> */}
                </Paper>
            </Grid.Col>
        </Grid>
    );
}