import { LotteryData } from '../app/interface';

export class Game {
  public static readonly games: LotteryData[] = [
    {
      name: 'Random Winner',
      subtitle: 'Just buy a ticket and win the grand prize',
      description: `Choose the amount you want to play and send it to the smart contract. You can buy up to 9 tickets at once to increase your chances.
      Once all tickets are sold, the contract generates a random number and sends the grand prize to the winner.
      Immediately after that, the next round begins. So don't wait and try your luck!`,
      amounts: [10, 100, 1000],
      address: 'rHk9WmrF9cpiPosZE6Dytw1R9S8Dgy5Gjk',
      tickets: [100, 100, 100],
      availableTickets: [100, 100, 100],
      id: 0,
    },
    {
      name: 'Guess Number',
      subtitle: 'Guess the right number and win the grand prize',
      description: `Choose the amount you want to play and your lucky number and send it to the smart contract.
      Once all tickets are sold, the contract generates a random number and sends the grand prize to the winner.
      Immediately after that, the next round begins. So don't wait and try your luck!`,
      amounts: [10, 100, 1000],
      address: 'rGX4T9QjNizwARRaYYgtow3iH2Luat96XA',
      tickets: [100, 100, 100],
      availableTickets: [100, 100, 100],
      id: 1,
    },
    {
      name: 'Double or Nothing',
      subtitle: 'Double your money or get nothing',
      description: `Choose the amount you want to play and send it to the smart contract.
      The contract generates a random number between 0 and 9, if the number is higher than 5 you double your money.
      So don't wait and try your luck!`,
      amounts: [10, 100, 1000],
      address: 'rnHEfj1DGX7mxLo4o2BkuR7xNtM9SL38SB',
      tickets: [100, 100, 100],
      availableTickets: [100, 100, 100],
      id: 2,
    },
  ];
}
