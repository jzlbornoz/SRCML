import { axiosInstance } from "../helpers/axios-config"

// @route GET /document
export const getDocuments = {
    key: 'document/getDocuments',
    fn: async () => {
        const response = await axiosInstance.get<Array<{
            id: string
            userId: string
            title: string
            location: string
            url: string
            category: string
            isPublic: boolean
            createdAt: string
            updatedAt: string
            deletedAt?: string
            user: {
                name: string
            }
        }>>('/document')
        return response.data
    }
}

// @route POST /document
export const createDocument = {
    key: 'document/createDocument',
    fn: async (data: {
        title: string;
        category: string;
        userId: string;
        location: string;
        file: File | null;
    }) => {

        const formData = new FormData();

        for (const key in data) {

            const typedKey = key as keyof typeof data;
            if (data[typedKey] && typedKey !== 'file') {
                formData.append(typedKey, data[typedKey] as string | Blob);
            }
        }

        if (data.file) {
            formData.append('files', data.file);
        }

        const response = await axiosInstance.post('/document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}