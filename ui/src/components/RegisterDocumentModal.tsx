import { Button, FileInput, Modal, Select, TextInput } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createDocument } from '../services/document'

const RegisterDocumentModal = ({
    opened,
    close,
}: {
    opened: boolean
    close: () => void
}) => {

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        category: '',
        file: null as File | null,
    });

    const registerDocumentMutation = useMutation({
        mutationFn: createDocument.fn,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: [getUserByClerkId.key] });
            // navigate('/');
            // toast.success('Se actualizó el perfil con éxito!');
        },
        onError: () => {
            // toast.error('Error al actualizar el perfil');
        }
    });


    return (
        <Modal opened={opened} onClose={close} title="Registrar Documento" centered>
            <TextInput label="Título" mb="md" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <TextInput label="Ubicación" mb="md" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            <Select
                label="Categoría"
                placeholder="Seleccionar"
                data={['Leyes', 'Gacetas', 'Libros']}
                value={formData.category}
                onChange={(value) => setFormData({ ...formData, category: value || '' })}
                mb="md"
            />
            <FileInput
                label="Adjuntar Documento"
                leftSection={<IconUpload size={14} />}
                mb="lg"
                value={formData.file}
                onChange={(files) => files && setFormData({ ...formData, file: files })}
            />
            <Button fullWidth onClick={() => registerDocumentMutation.mutate(formData)}>Subir Archivo</Button>
        </Modal>
    )
}

export default RegisterDocumentModal