import { ProjectData } from '../app/interface';

export class Project {
  public static readonly projects: ProjectData[] = [
    {
      name: 'AI-Memes Inc.',
      business: 'AI powered meme generator for Twitter',
      team: [
        {
          name: 'Brad Schwartz',
          role: 'CEO',
          linkedIn: 'https://www.linkedin.com/',
          about: 'The best and humblest CEO the world has ever seen.',
        },
        {
          name: 'David Garlinghouse',
          role: 'CTO',
          linkedIn: 'https://www.linkedin.com/',
          about: 'The best and humblest CTO the world has ever seen.',
        },
      ],
      vision:
        'Vision Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      website: 'https://www.aipoweredmemes.com',
      more: 'More Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      percent: [1, 3, 5],
      shares: [20, 10, 10],
      maxShares: [20, 10, 10],
      price: [100, 270, 400],
      closeTime: (725842799 + 946684800) * 1000,
      address: 'rHjHg9tmTzasMpKKdqVnGVPF7wmP6wTiJY',
    },
    {
      name: 'Security Offering Inc.',
      business: 'Selling unregistered securities',
      team: [
        {
          name: 'Chris Britto',
          role: 'CEO',
          linkedIn: 'https://www.linkedin.com/',
          about: 'The best and humblest CEO the world has ever seen.',
        },
        {
          name: 'Arthur Larsen',
          role: 'CTO',
          linkedIn: 'https://www.linkedin.com/',
          about: 'The best and humblest CTO the world has ever seen.',
        },
      ],
      vision:
        'Vision Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      website: 'https://www.unregisteredsecurites.com',
      more: 'More Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      percent: [5, 10],
      shares: [10, 5],
      maxShares: [10, 5],
      price: [500, 950],
      closeTime: (725842799 + 946684800) * 1000,
      address: 'r4tx34zCwNCLvUs5KD92YKewemFfWUSxsy',
    },
  ];
}
