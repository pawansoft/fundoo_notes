class Datalayer {
    currentNoteKey = 0
    currentUserId = 0
    loggedInUserId = null
    Noteadata = []
    Signupdetails = [{ firstname: 'pawan', lastname: 'kumar', email: 'pawan1', password: 'pawan1', user_id: this.currentUserId }]


    getLoggedUserId = () => {
        return this.loggedInUserId
    }

    setLoggedUserId = (user_id) => {
        this.loggedInUserId = user_id
    }

    AddNote = (key, Title, Notes, isDeleted, isArchive, Labels, Reminder) => {
        this.currentNoteKey = this.currentNoteKey + 1;

        this.Noteadata.push({ NoteKey: this.currentNoteKey, Title: Title, Notes: Notes, isDeleted: isDeleted, isArchive: isArchive,  user_id: this.loggedInUserId })
        console.log(this.Noteadata);
    }

    UpdateNoteService = (key, Title, Notes, isDeleted, isArchive, Labels, Reminder) => {
        this.Noteadata.map((eachNote, index) => {

            if (eachNote.NoteKey === key) {
                console.log(key, Title, Notes, isDeleted, isArchive, Labels, Reminder, eachNote, 'Note details to be updated');
                this.Noteadata[index] = { NoteKey: key, Title: Title, Notes: Notes, isDeleted: isDeleted, isArchive: isArchive, user_id: this.loggedInUserId }
            }
           
        })

    }

    handleIsArchive = (key) => {
        this.Noteadata.map((eachNote, index) => {
            if (eachNote.NoteKey = key) {
                this.Noteadata[index] = { ...this.Noteadata[index], isArchive: true }

                return 'success'
            }
            else {
                return 'error'
            }
        })
    }

    handleRestoreNote = (key) => {
        this.Noteadata.map((eachNote, index) => {
            if (eachNote.NoteKey = key) {
                this.Noteadata[index] = { ...this.Noteadata[index], isDeleted: false }

                return 'success'
            }
            else {
                return 'error'
            }
        })
    }

    handleMoveToRecyclebin = (key) => {
        this.Noteadata.map((eachNote, index) => {
            if (eachNote.NoteKey = key) {
                this.Noteadata[index] = { ...this.Noteadata[index], isDeleted: true }

                return 'success'
            }
            else {
                return 'error'
            }
        })
    }

    DeleteNoteService = (key) => {
        this.Noteadata.map((eachNote, index) => {
            if (eachNote.NoteKey === key) {
                this.Noteadata.slice(index, 1)

                return 'success'
            }
            else {
                return 'error'
            }
        })
    }

    getNoteByUser = () => {
        const FilteredNote = this.Noteadata.filter(eachNote => eachNote.user_id == this.loggedInUserId && eachNote.isDeleted !== true)
        return FilteredNote
    }

    getNoteByUserArchived = () => {
        const FilteredNote = this.Noteadata.filter(eachNote => eachNote.user_id == this.loggedInUserId && eachNote.isArchive === true && eachNote.isDeleted !== true)
        console.log(FilteredNote, this.Noteadata, 'filtered data to be checked');
        return FilteredNote
    }

    getNoteByUserDelete = () => {
        const FilteredNote = this.Noteadata.filter(eachNote => eachNote.user_id == this.loggedInUserId && eachNote.isDeleted === true)
        console.log(FilteredNote, this.Noteadata, 'filtered data to be checked');
        return FilteredNote
    }

    AddSignupdetails = (firstname, lastname, email, password,) => {
        this.currentUserId = this.currentUserId + 1
        this.Signupdetails.push({ firstname: firstname, lastname: lastname, email: email, password: password, user_id: this.currentUserId })
        console.log(this.Signupdetails);
        return 'Success'
    }

    LoginHandler = (userName, password) => {
        let filteredUser = this.Signupdetails.filter(eachUser => eachUser.email === userName && eachUser.password === password)
        if (filteredUser.length >= 1) {
            return filteredUser
        } else {
            return false
        }
    }

}

export default new Datalayer