// components/MainLayout.tsx
import { SignOutButton } from '@clerk/clerk-react';
import { AppShell, Burger, Group, NavLink, Text, ActionIcon, useMantineColorScheme, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconUsers, IconUser, IconSun, IconMoon, IconFiles, IconDoor } from '@tabler/icons-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function MainLayout() {
    const [opened, { toggle }] = useDisclosure();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const navigate = useNavigate();
    const location = useLocation();

    const data = [
        { link: '/', label: 'Dashboard', icon: IconHome },
        { link: '/library', label: 'Biblioteca', icon: IconFiles },
        { link: '/users', label: 'Administrar Usuarios', icon: IconUsers },
        { link: '/profile', label: 'Mi Perfil', icon: IconUser },
    ];

    const links = data.map((item) => (
        <NavLink
            key={item.label}
            active={location.pathname === item.link}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => {
                navigate(item.link);
                if (opened) toggle(); // Cerrar menú en móvil al navegar
            }}
        />
    ));

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <IconFiles size={30} color="var(--mantine-color-indigo-6)" />
                        <Text fw={700} size="lg">SRCML</Text>
                    </Group>
                    <Flex gap={'sm'}>
                        <SignOutButton>
                            <ActionIcon variant="default"
                                size="lg">
                                <IconDoor size={18} />
                            </ActionIcon>
                        </SignOutButton>
                        <ActionIcon
                            onClick={() => toggleColorScheme()}
                            variant="default"
                            size="lg"
                            aria-label="Toggle color scheme"
                        >
                            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
                        </ActionIcon>
                    </Flex>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Text size="xs" fw={500} c="dimmed" mb="sm">GENERAL</Text>
                {links}
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}