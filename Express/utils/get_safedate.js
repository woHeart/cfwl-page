const get_safedata = ( data ) => {
    const safeDate = data.toObject()
    delete safeDate._id
    delete safeDate.password
    delete safeDate.__v
    return safeDate
}

export default get_safedata