const CaseConvert = (text: string) => {
    return text.split('_').map((word: string) => {
        return word.charAt(0).toUpperCase().concat(word.slice(1))
    }).reduce((prev: string, next: string) => {
        return prev + ' ' + next
    })
}

export default CaseConvert;

