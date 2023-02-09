import { IFAQ } from '../app/interfaces/interface';
export class Faq {
  public static readonly names = ['P2P-Loan', 'Launchpad', 'Lottery', 'Ticket'];
  public static readonly generalFaqs: Faq[] = [
    {
      title: 'What the heck is a Hook?',
      description: 'A hint: Other Blockchains call it Smart Contract ;)',
      answer: `
      Shamelessly stolen straight from the Hooks documentation.
      Hooks add smart contract functionality to the XRP Ledger: 'layer one' custom code to influence the behaviour and flow of transactions. Hooks are small, efficient pieces of code being defined on an XRPL account, allowing logic to be executed before and/or after XRPL transactions.`,
    },
    {
      title: 'Who controls the Hook account?',
      description: 'Who do you need to trust when using P2P-Loans',
      answer: `
      No one. The Hook account is blackholed and therefore no one has access to it.

      WHILE ON TESTNET: IT IS NOT BLACKHOLED AND I COULD STEAL ANY TEST-FUNDS SENT TO THE HOOK AT ANY TIME! BUT I WON'T WHILE I HAVE ENOUGH MYSELF.`,
    },
    {
      title: 'Is this Hook safe to use?',
      description: 'No, but you can use it anyway ;)',
      answer: `
      Every effort has been made to make it bulletproof, but some residual risk is and always will be.
      The Hook is open source and can and should be reviewed by everyone. I really appreciate any feedback!!

      WHILE ON TESTNET: IT HAS NOT BEEN PUBLISHED YET BUT WILL BE MONTHS BEFORE MAINNET LAUNCH.`,
    },
    {
      title: 'Failed transaction?',
      description: 'You did not get your funds back',
      answer: `
      Don't worry, everything will be fine!
      Unlike most EVM-based smart contracts, this Hook can handle failed transactions. The transaction is stored on the XRPL and can be reinitiated at any time and as often as it takes to complete.
      Just hit me up on Twitter and I'll do that.`,
    },
    {
      title: 'Sort and filter?',
      description: 'Find whatever you are looking for',
      answer: `
      When viewing the open offers or current loans, you can sort each row in ascending or descending order.
      All rows and columns can be filtered by what you are looking for. For example, hover over one of the test accounts and enter parts of the displayed address into the filter field. You will only be shown offers/loans in which this address is involved.`,
    },
    {
      title: 'What if I break anything?',
      description: 'What to do and what not to do',
      answer: `
      You should break the Hook as well as the entire testnet. It's the best and probably only way to enhance these new features on the XRPL. So follow this simple rule: Just do it!`,
    },
    {
      title: 'How to reach out',
      description: 'Time for feedback and improvements',
      answer: `
      Just hit me up on Twitter. The link is at the bottom of the page. I'm always happy about feedback and ideas for improvement!`,
    },
  ];
  public static readonly specificFaqs: IFAQ[][] = [
    [
      // P2P-Loan
      {
        title: 'How do P2P-Loans work?',
        description: 'A quick walk through the whole process of P2P-Loans',
        answer: `
        I highly recommend watching the video above which explains the whole process of lending/borrowing money on the XRPL.

        Here are some important details:
        1. You can choose to be the borrower (pay interest) or rhe lender (earn interest).
        2. You can accept existing offers or create your own one.
        3. You will be charged a fee for creating an offer. See below for details.
        4. You can close your offer at any time.
        5. You can repay a loan at any time.

        Questions and feedback are always welcome! Just use the Twitter link at the bottom of the page.`,
      },
      {
        title: 'Borrower vs. Lender?',
        description: 'A guide to choosing the right side',
        answer: `
        A borrower pays interest and a lender earns interest - so it's all clear which side to choose... No it's not.
        It all depends on your needs.

        Here are two examples:

        1. You need/want a stablecoin. Your collateral is a volatile asset and the market is in a downtrend.
        So when you create an offer, you might want to be the borrower to find a counterpart who will actually accept the offer.
        In case you are not sure why you should do this - There are services that offer x% interest on a stablecoin. Now if you create an offer that pays less than x% interest on this stablecoin, you will earn a fixed amount of money.

        2.You need/want a stablecoin. Your collateral is a volatile asset and the market is in an uptrend.
        So when you create an offer, you might want to be the lender as there will be many counterparties looking for such an offer.
        `,
      },
      {
        title: 'Open Offers vs. Current Loans?',
        description: 'Differences and what you can do',
        answer: `
        Open Offers:
        These are offers that anyone can accept. You can choose between offers looking for a lender or a borrower. If you are the creator of the offer or it has already expired, you can close it by sending 1 Drop to the Hook. Once the offer is accepted, it becomes a Current Loan.

        Current Loans:
        These are, as the name suggests, current loans. If the loan is repaid within the agreed period, it will be automatically closed and the borrower will receive the collateral amount minus the interest and the lender will receive the loan amount plus the interest. If the loan is not repaid within the agreed period, the lender receives all of the collateral.`,
      },
      {
        title: 'How much is it?',
        description: 'Check out all the costs associated with P2P-Loans',
        answer: `
        Not only is it easy to get a loan, it's also cheap.
        Creating an offer costs 0.1% of the amount sent to the Hook, but at least 10 units of the asset sent.
        For the borrower, this is the collateral currency and for the lender, it is the loan currency.
        Accepting an offer, on the other hand, is completely free.
        Of course, you have to pay the transaction fee. But since we are on the XRPL these are close to zero.`,
      },
      {
        title: 'Why do I have to pay a fee?',
        description: 'Check out why you there is a fee',
        answer: `
        There are two main reasons for this fee.

        1. Creating an offer consumes storage space and the fee is to prevent people from spamming the XRPL.

        2. It should cover the costs of this service.`,
      },
      {
        title: 'Cancel an offer?',
        description: 'When and why to close it',
        answer: `
        An offer can be canceled either by the creator or after it has expired.
        The creator can cancel the offer at any given time.
        31 days after creation an offer expires and can be canceled by sending 1 Drop to the Hook.
        The expiry date is necessary to remove offers that are not attractive enough to be accepted.`,
      },
      {
        title: 'Close a loan?',
        description: 'When and why to close it',
        answer: `
        A loan can be closed either by paying it back or upon expiry.
        Once the loan is repaid, the borrower gets back his collateral minus the interest and the lender gets back the loan amount plus the interest.
        If the loan is not repaid within the agreed period, it can be closed by sending 1 Drop to the Hook. In this case, the lender receives all of the collateral.`,
      },
      {
        title: 'Why a memo?',
        description: 'Nothing works without a proper memo',
        answer: `
        The memo "tells" the Hook what to do. In case the memo is missing or incorrect the Hook will reject the transaction.`,
      },
      {
        title: 'Interest?',
        description: 'Know what you get/pay',
        answer: `
        When you create or accept an offer, you will be shown the exact amount and asset you will pay/receive as interest.
        It doesn't matter whether the loan is repaid earlier than the originally agreed term or not, the amount is fixed.`,
      },
      {
        title: 'Loan term?',
        description: 'Fixed but not really',
        answer: `
        When you create or accept an offer, you will be shown the exact loan term in days.
        However, this does not mean that the loan ends exactly on this date. It just means that the loan can be closed from that day.
        The loan can be closed at any time by paying back or after expiry by sending 1 Drop to the Hook.`,
      },
      {
        title: 'Repaid or not?',
        description: 'What if the borrower keeps the loan',
        answer: `
        Like any other loans there can be two different outcomes.

        1. The loan will be repaid within the agreed period. In this case, the borrower gets back his collateral minus the interest and the lender gets back the loan amount plus the interest.

        2. The loan will not be repaid within the agreed period. In this case, the lender receives all of the collateral by sending 1 Drop to the Hook.`,
      },
      {
        title: 'Refresh offers?',
        description: 'What to do if your offer/loan does not appear',
        answer: `
        If someone else created an offer while you're on the P2P-Loans page, it won't appear automatically. There is a refresh button right above the listings that will change that.`,
      },
    ],
    [
      // Launchpad
      {
        title: 'How does the Launchpad work?',
        description: 'A quick walk through the whole process of the Launchpad',
        answer: `
        I highly recommend watching the video above which explains the whole process of either raising money for your XRPL based project or investing in one.

        Here are some important details:
        1. You can invest in a project and in return receive an NFT representing ownership of the project.
        2. You can only make one investment per project, choose wisely the stake you want to hold.
        3. You get your money back if the project doesn't reach its funding goal in the specified time.
        4. You can always sell or buy these NFTs on the open market.
        5. Your funds are safe at all times as the smart contract is the only one able to move them.

        Questions and feedback are always welcome! Just use the Twitter link at the bottom of the page.`,
      },
      {
        title: 'Are all these project legit?',
        description: 'A guide to choosing the right project',
        answer: `
        It's YOUR job to find out. Any project can use this smart contract to raise funds.
        To do this, it needs to provide some information that you can verify.
        A website, LinkedIn accounts of team members, a funding goal, and some additional information are required to be listed here.
        However, verification of this information is entirely up to YOU.
        `,
      },
      {
        title: 'What if the funding goal is reached?',
        description: 'Can I get my money back, ...',
        answer: `
        If the funding goal is met within the specified time, the project will be paid the full amount for its offered shares.
        There is no way to get your money back - only invest in projects you truly believe in!`,
      },
      {
        title: 'What if the funding goal is NOT reached?',
        description: 'Can I get my money back, ...',
        answer: `
        If the funding goal is not reached within the specified time, nothing will be paid out for the project.
        All investors get their money back!`,
      },
      {
        title: 'How much is it?',
        description: 'Check out all the costs associated with the Launchpad',
        answer: `
        Not only is it easy and safe to invest in projects, it's also free.
        The only fee you have to pay is the transaction fee. But since we are at the XRPL these are close to zero.`,
      },
      {
        title: 'How can I benefit from these investments??',
        description: 'There are multiple ways you can benefit',
        answer: `
        There are many ways to profit from investing in projects.
        Here are some examples:
        1. You can empower projects to shape the future the way you want to see it.
        2. You can get a share of the profit of the project if the project offer it.
        1. You can always sell your NFTs on the open market and maybe make some profit.

        But remember, nothing is without risk!`,
      },
    ],
    [
      // Lottery
      {
        title: 'How does the Lottery work?',
        description: 'A quick walk through the the Lottery',
        answer: `
        It's really simple and each game has its own description. Just click on the game you want to play and see for yourself.`,
      },
    ],
    [
      // Ticket
      {
        title: 'How do Tickets work?',
        description: 'A quick walk through the whole process of Tickets',
        answer: `
        I highly recommend watching the video above which explains the whole process of buying tickets.

        Here are some important details:
        1. You can buy a ticket and in return receive an NFT representing ownership of the ticket.
        2. You can always sell or buy these NFTs on the open market.
        3. Your funds are safe at all times as the smart contract is the only one able to move them.

        Questions and feedback are always welcome! Just use the Twitter link at the bottom of the page.`,
      },
      {
        title: 'Are all these tickets legit?',
        description: 'A guide to choosing the right ticket',
        answer: `
        It's YOUR job to find out. Anyone can use this smart contract to sell tickets.
        To do this, they need to provide some information that you can verify.
        A website and some additional information are required to be listed here.
        However, verification of this information is entirely up to YOU.
        `,
      },
      {
        title: 'Can I return my ticket?',
        description: 'Can I get my money back, ...',
        answer: `
        No, tickets can not be returned. But you can sell them at any time on the open market.`,
      },
      {
        title: 'How much is it?',
        description: 'Check out all the costs associated with the ticket',
        answer: `
        Not only is it easy and safe to buy a ticket, it's also free.
        The only fee you have to pay is the transaction fee. But since we are at the XRPL these are close to zero.`,
      },
    ],
  ];
}
