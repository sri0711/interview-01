const objectMethods = {
    getSystemName:()=>{
        return "sample"
    },
    getSample:() => {
        let data = objectMethods.getSystemName()
        return  "hai "+ data
    }
}

module.exports = objectMethods