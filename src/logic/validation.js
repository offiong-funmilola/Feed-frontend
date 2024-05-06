export const validate = (values) => {
    const error = {}
    if (!values.title) {
        error.title = 'Title field is required'
    }
    else if (values.title.length < 5){
        error.title = 'The minimum character is 5'
    }
    if(!values.content) {
        error.content = 'This field id required'
    }
    else if (values.content.length < 5) {
        error.comntent = 'The minimum character is 5'
    }
    return error
}
export const validateUser = (values) => {
    const error = {}
    if (!values.name) {
        error.name = 'Name field is required'
    }
    else if (values.name.length < 5){
        error.title = 'The minimum character is 5'
    }
    if(!values.content) {
        error.content = 'This field id required'
    }
    else if (values.content.length < 5) {
        error.comntent = 'The minimum character is 5'
    }
    return error
}