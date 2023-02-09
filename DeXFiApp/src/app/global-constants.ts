import * as xrpl from 'xrpl';
import { Action, Currency, Role } from './interface';

export class GlobalConstants {
  public static readonly hookAddress = 'rQNKcVLoH291HrvNWPkpUg3Ydf2vuTfC9s';
  public static readonly hookNamespace = 'loan';

  public static readonly borrowerText = 'Borrower (Pay Interst)';
  public static readonly lenderText = 'Lender (Earn Interst)';
  public static readonly termsTooltip =
    'Make sure this is exactly what you want.';
  public static readonly currencyLabel = 'Currency';
  public static readonly currencyTooltip =
    'Choose the currency you want to receive';
  public static readonly currencyHint =
    'Choose the currency you want to receive';
  public static readonly collateralLabel = 'Collateral';
  public static readonly collateralTooltip = 'Choose the collateral you want';
  public static readonly collateralHint = 'Choose the collateral you want';
  public static readonly amountPlaceholder = '10550.90';
  public static readonly amountPattern = /^[0-9]{1,8}(\.[0-9]{0,2})?$/;
  public static readonly amountLabel = 'Amount';
  public static readonly amountTooltip = 'Choose the amount you want';
  public static readonly invalidAmountMsg = `Invalid amount!`;
  public static readonly amountHint = `1 - 8 digits [0-9], 0 - 2 decimals [0-9]`;
  public static readonly payInterestTooltip =
    'You pay interest to the other party.';
  public static readonly earnInterestTooltip =
    'You receive interest from the other party.';
  public static readonly ratePlaceholder = '3.75';
  public static readonly ratePattern = /^[0-9]{1,2}(\.[0-9]{0,2})?$/;
  public static readonly rateLabel = 'Interest Rate in % (APR)';
  public static readonly rateTooltip = 'Choose your interest rate in % (APR)';
  public static readonly invalidRateMsg = `Invalid input!`;
  public static readonly rateHint = `1 - 2 digits [0-9], 0 - 2 decimals [0-9]`;
  public static readonly daysPlaceholder = '30';
  public static readonly daysPattern = /^[1-9]\d{0,2}$/;
  public static readonly daysLabel = 'Loan term in days';
  public static readonly daysTooltip = 'Choose the loan term in days';
  public static readonly invalidDaysMsg = `Invalid input!`;
  public static readonly daysHint = `1 - 3 digits [0-9]`;
  public static readonly tooltipShowDelay = 500;
  public static readonly tooltipHideDelay = 0;
  public static readonly targets = [
    'currencyInput',
    'amountInput',
    'rateInput',
    'daysInput',
  ];
  public static readonly checkDataText =
    'Make sure the following information is correct:';
  public static readonly loanCheckBoxText =
    'Yes, this is exactly the loan I want!';

  public static readonly nextButton = 'Next';
  public static readonly backButton = 'Back';
  public static readonly createLoanButton = 'Create Loan';

  public static readonly actions: Action[] = [
    {
      name: 'make',
      id: 1,
    },
    {
      name: 'cancel',
      id: 2,
    },
    {
      name: 'take',
      id: 3,
    },
    {
      name: 'repay',
      id: 4,
    },
    {
      name: 'close',
      id: 5,
    },
  ];
  public static readonly currencies: Currency[] = [
    {
      name: 'XRP',
      id: 0,
      address: '',
    },
    {
      name: 'GBP',
      id: 1,
      address: 'rMZC8eoTsdr8f5yyBG47pwtpWdebT7BLeY',
    },
    {
      name: 'EUR',
      id: 2,
      address: 'r43MzJE8EPcb2hLJjh1aGR2pFwjc6T9czo',
    },
    {
      name: 'USD',
      id: 3,
      address: 'rajuXb5NwEyRZSKUzNLaevMwo8hmzVQQNS',
    },
    {
      name: 'CHF',
      id: 4,
      address: 'rDsb8uKJ4k4kygjPud2pYA9qApdCvkRVa2',
    },
    {
      name: 'CNH',
      id: 5,
      address: 'rHxAKPGPwqtgewEfcevVTUT6MghRGWwGFb',
    },
  ];

  public static readonly roles: Role[] = [
    {
      name: 'Borrower',
      id: 1,
    },
    {
      name: 'Lender',
      id: 2,
    },
  ];
}
