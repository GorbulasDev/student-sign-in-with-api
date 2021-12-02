<template>
    <div>
        <div class="alert alert-danger" v-if="errors.length > 0">
            <ul>
                <!-- Linting -->
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </div>

        <!-- Create the inputs -->
        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>

            <div class="form-group">
                <label for="starID">Star ID</label>
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <!-- Add a the submit button -->
            <button v-on:click="addStudent" class="btn btn-primary">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    // Create the child component, and emit to parent
    name: 'NewStudentForm',
    emits: ['student-added'],
    data() {
        return {
            // Local data to NewStudentForm
            newStudentName: '',
            newStarID: '',

            // Register any errors
            errors: []
        }
    },
    methods: {
        // Validate user input, and add a payload if we pass validation
        addStudent() {
            this.errors = [] // clear all of our errors

            if (!this.newStudentName) {
                this.errors.push('A student name must be entered!')
            }

            if (!this.newStarID) {
                this.errors.push('A student ID must be entered!')
            }

            // If we have no errors, populate the object with a payload
            if (this.errors.length == 0) {
                let student = { name: this.newStudentName, starID: this.newStarID, present: false }

                // Emits this data to our parent component
                this.$emit('student-added', student)
                this.newStarID = ''
                this.newStudentName = ''
            }
        }
    }
}
</script>
