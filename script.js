let questaoAtual = 0;
let questoesAcertadas = 0;
mostrarQuestao()
function mostrarQuestao(){
    if(questions[questaoAtual]){
        let q = questions[questaoAtual]
        let pct = Math.floor((questaoAtual / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'
        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.questaoAtual').innerHTML = `Questao ${questaoAtual + 1} de ${questions.length}`
        document.querySelector('.acertos').innerHTML = `Acertou ${questoesAcertadas} de ${questions.length}`

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', opcaoClick)
        })
    } else {
        finalizarQuiz()
    }
}
function opcaoClick(e){
    let opcao = parseInt(e.target.getAttribute('data-op'));
    if(questions[questaoAtual].answer === opcao){
        questoesAcertadas++
        e.target.style.backgroundColor = 'green'
    } else {
        e.target.style.backgroundColor = 'red'
    }
    setTimeout(() => {
        questaoAtual++
        mostrarQuestao()
    }, 800)
}

function finalizarQuiz(){
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.acertos').style.display = 'none'
    document.querySelector('.questaoAtual').style.display = 'none'

    document.querySelector('.progress--bar').style.width = `100%`
    let pct = Math.floor((questoesAcertadas / questions.length) * 100)

    document.querySelector('.scorePct').innerHTML =  `Acertou ${pct}%`
    document.querySelector('.scoreText2').innerHTML =  `Você respondeu ${questions.length} e acertou ${questoesAcertadas}`

    let frase = pct <= 30 ? 'Estude mais' : pct <= 50 ? 'Bom!' : 'Parabéns'
    let cor = pct <= 30 ? 'red' : pct <= 50 ? 'yellow' : 'green'
    document.querySelector('.scoreText1').innerHTML =  frase
    document.querySelector('.scorePct').style.color =  cor
}

document.querySelector('.again').addEventListener('click', again)

function again(){
    document.querySelector('.questaoAtual').style.display = 'block'
    document.querySelector('.acertos').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'block'
    document.querySelector('.scoreArea').style.display = 'none'
    questaoAtual = 0
    questoesAcertadas = 0
    mostrarQuestao()
}