import { ProjectData, TicketData } from '../app/interface';

export class Ticket {
  public static readonly tickets: TicketData[] = [
    {
      name: 'NFL Playoffs',
      business: 'SEC-Vultures vs. RIP-Tigers',
      website: 'https://www.nflplfs.com',
      categories: ['Basic', 'First Row', 'VIP-Lounge'],
      shares: [5000, 500, 50],
      maxShares: [5000, 500, 50],
      price: [50, 150, 500],
      closeTime: (725842799 + 946684800) * 1000,
      address: 'r3G4JgpWRRaYpENr2RvKfq5G4L56opBdVR',
    },
    {
      name: 'Austrian Airlines',
      business: 'Flight A710850U - Vienna to San Francisco',
      website: 'https://www.austrian-flight.com',
      categories: ['Coach', 'Business Class', 'First Class'],
      shares: [200, 30, 20],
      maxShares: [200, 30, 20],
      price: [50, 250, 750],
      closeTime: (725842799 + 946684800) * 1000,
      address: 'rJxQvj5Hp828eeGHT6ihGbHwcg42HqsNsU',
    },
  ];
}
