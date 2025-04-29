const inputFieldsDiv = document.getElementById('input-fields');
const generateButton = document.getElementById('generate-button');
const storyOutputDiv = document.getElementById('story-output');
const storyParagraph = document.getElementById('story');
const resetButton = document.getElementById('reset-button');

const storyTemplate = "Um dia, o [NOME] estava trabalhando em um projeto super  [ADJETIVO] . De repente, o computador começou a  [VERBO]  sozinho! Sem  pensar duas vezes, o(a) [NOME] pegou seu [OBJETO] e começou a digitar comandos com um(a) verdadeiro(a) [PROFISSAO] Preciso consertar isso antes que o sistema fique  [ADJETIVO] '!' exclamou o(a) [NOME]. Depois de [NUMERO] tentativas, finalmente o computador respondeu: o problema foi causado por um [ANIMAL] que estava no sistema! Com isso, o problema foi resolvido, e o(a) [NOME] ganhou o prêmio de [OBJETO] mais inovador do ano. Moral da historia: sempre leve seu [OBJETO] para o escritorio, porque nunca se sabe quando você vai precisar!";

function generateInputs() {
    const wordsToReplace = storyTemplate.match(/\[(.*?)\]/g);
    inputFieldsDiv.innerHTML = '';

    if (wordsToReplace) {
        wordsToReplace.forEach(word => {
            const placeholder = word.slice(1, -1).toLowerCase().replace('_', ' ');
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');

            const label = document.createElement('label');
            label.textContent = `Digite um(a) ${placeholder}:`;

            const input = document.createElement('input');
            input.type = 'text';
            input.dataset.placeholder = word;

            inputGroup.appendChild(label);
            inputGroup.appendChild(input);
            inputFieldsDiv.appendChild(inputGroup);
        });
    } else {
        inputFieldsDiv.textContent = 'Nenhuma palavra para substituir encontrada no modelo.';
    }
}

function generateStory() {
    const inputs = inputFieldsDiv.querySelectorAll('input[type="text"]');
    let generatedStory = storyTemplate;
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
            }, 1000);
        } else {
            const placeholder = input.dataset.placeholder;
            const value = input.value;
            generatedStory = generatedStory.replace(placeholder, value);
        }
    });

    if (allFilled) {
        storyParagraph.textContent = generatedStory;
        storyOutputDiv.classList.remove('hidden');
        inputFieldsDiv.classList.add('hidden');
        generateButton.classList.add('hidden');
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function resetGame() {
    storyOutputDiv.classList.add('hidden');
    inputFieldsDiv.classList.remove('hidden');
    generateButton.classList.remove('hidden');
    generateInputs();
}

generateButton.addEventListener('click', generateStory);
resetButton.addEventListener('click', resetGame);

generateInputs();