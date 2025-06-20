const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');

const choicesArray = ['rock', 'paper', 'scissors'];

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    const userChoice = choice.getAttribute('data-choice');
    const computerChoice = choicesArray[Math.floor(Math.random() * 3)];
    const result = getResult(userChoice, computerChoice);
    resultDiv.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
  });
});

function getResult(user, computer) {
  if (user === computer) return 'It\'s a draw!';
  if (
    (user === 'rock' && computer === 'scissors') ||
    (user === 'paper' && computer === 'rock') ||
    (user === 'scissors' && computer === 'paper')
  ) {
    return 'You win!';
  }
  return 'You lose!';
}