const methods = {
    transformer: function (str){
        let splitted = str.split(" ")
        let className = splitted.shift()
        let finishedStr = splitted.join(" ")
        return [finishedStr, className]
    },
    upperCase: function(str){
        if(str)return str[0].toUpperCase() + str.slice(1);
        else return ""
    },
    createLink: function(){

    }
}


export default methods