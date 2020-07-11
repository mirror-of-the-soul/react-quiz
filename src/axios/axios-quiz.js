import axios from 'axios'
// данный файл нужен для того что бы полностью не прописывать url адрес БД
export default axios.create({
    baseURL: 'https://react-quiz-c5488.firebaseio.com/'
    }
)