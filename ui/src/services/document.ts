import { axiosInstance } from "../helpers/axios-config"

// @route GET /document
export const getDocuments = {
    key: 'document/getDocuments',
    fn: async () => {
        const response = await axiosInstance.get('/document')
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
        files: File[];
    }) => {

        const formData = new FormData();

        for (const key in data) {

            const typedKey = key as keyof typeof data;
            if (data[typedKey] && typedKey !== 'files') {
                formData.append(typedKey, data[typedKey] as string | Blob);
            }
        }

        if (data.files) {
            for (const file of data.files) {
                formData.append('files', file);
            }
        }

        const response = await axiosInstance.post('/document', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}