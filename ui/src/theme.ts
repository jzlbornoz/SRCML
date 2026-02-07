// theme.ts
import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
    primaryColor: 'indigo',
    fontFamily: 'Inter, sans-serif',
    headings: {
        fontFamily: 'Greycliff CF, sans-serif',
    },
    // Personalización de componentes globales
    components: {
        Button: {
            defaultProps: { size: 'md' },
        },
        Paper: {
            defaultProps: { shadow: 'xs', p: 'md', withBorder: true },
        },
    },
    // Espaciados personalizados si es necesario
    spacing: {
        xs: rem(4),
        sm: rem(8),
        md: rem(16),
        lg: rem(24),
        xl: rem(32),
    },
});