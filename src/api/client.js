import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import axios from "axios";

const { initDataRaw } = retrieveLaunchParams();

// Init data, яку надає Telegram, фактично слугує для початкової ідентифікації 
// та авторизації користувача. Після валідації переконуємось, що це справді той 
// користувач, за якого він себе видає, і що дані не були підроблені. 

// Однак для забезпечення безпеки всіх наступних запитів і даних, що передаються, 
// необхідно ввести додатковий механізм валідації запитів, наприклад JWT.

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_API_PATH}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Authorization: `tma ${initDataRaw}`,
    },
});


// Error handle
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;
