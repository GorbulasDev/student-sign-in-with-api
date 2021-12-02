<template>
  <div class="app">
    <h1>Student Sign In</h1>
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table v-bind:students="students" v-on:student-arrived-or-left="studentArrivedOrLeft" v-on:delete-student="studentDeleted"></student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      // Store the result of our students in the parent list
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // Make a request to the API when we load the app.
    this.updateStudents()
  },

  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then(students => {
        this.students = students
        console.log(students)
      }).catch( () => alert('Unable to fetch students list'))
    },

    newStudentAdded(student) { 
      this.$student_api.addStudent(student).then(() => {
        this.updateStudents()
      }).catch(err => {
        let msg = err.response.data.join(',')
        alert('Error adding student\n' + msg)
      })
    },

    studentArrivedOrLeft(student, present) { 
      student.present = present // update our current value
      this.$student_api.updateStudent(student).then(() => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () => alert('Unable to update student'))
    },

    studentDeleted(student) { 
      this.$student_api.deleteStudent(student.id).then(() => {
        this.updateStudents()
        this.mostRecentStudent = {} // clear the hello/goodbye message
      }).catch( () => alert('Unable to delete student'))
    },
  }
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

  h1 {
    padding: 10px;
  }
</style>
