import axios from 'axios'

let base_url ='/api/students'

export default {
    // Retrieve all students in the table.
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },

    // Add a student row.
    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    // Update the student row.
    updateStudent(student) {
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    // Delete the student row.
    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}
