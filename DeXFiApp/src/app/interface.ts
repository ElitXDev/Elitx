import * as xrpl from 'xrpl';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

export interface VideoParams {
  videoId: string;
  width: number;
  height: number;
  startSeconds: number;
  endSeconds: number;
  suggestedQuality: YT.SuggestedVideoQuality;
  playerVars: YT.PlayerVars;
  showBeforeIframeApiLoads: boolean;
}

export interface FAQ {
  title: string;
  description: string;
  answer: string;
}

export interface Theme {
  name: string;
  icon: string;
}

export interface Video {
  title: string;
  link: string;
}

export interface Trade {
  time: number;
  side: number;
  price: number;
  tradingBalance: number;
  marketBalance: number;
  counter: number;
}

export interface Accs {
  name: string;
  id: number;
  balances: number[];
  nfts?: xrpl.AccountNFTsResponse['result']['account_nfts'];
  nftSellOffers?: xrpl.NFTSellOffersResponse['result']['offers'];
  tickets?: number[][];
  numbers?: number[][];
  wallet?: xrpl.Wallet;
  address: string;
}

export interface Action {
  name: string;
  id: number;
}

export interface Currency {
  name: string;
  id: number;
  address: string;
}

export interface Role {
  name: string;
  id: number;
}

interface AccountStateResultNamespaceEntries {
  Flags: number;
  HookStateData: string;
  HookStateKey: string;
  LedgerEntryType: string;
  OwnerNode: string;
  index: string;
}
interface AccountStateResult {
  account: string;
  ledger_current_index: string;
  namespace_entries: AccountStateResultNamespaceEntries[];
  namespace_id: string;
  validated: string;
}
export interface AccountState {
  id: number;
  result: AccountStateResult;
}

export interface OfferData {
  key: string;
  state: number;
  role: number;
  returned: number;
  loanCurrency: string;
  collateralCurrency: string;
  loanCurrencyAddress: string;
  collateralCurrencyAddress: string;
  period: number;
  interestRate: number;
  loanAmount: number;
  collateralAmount: number;
  interest: number;
  timestamp: number;
  makerAccId: string;
  takerAccId: string;
  isExpired: boolean;
}
export interface Person {
  name: string;
  role: string;
  linkedIn: string;
  about: string;
}

export interface ProjectData {
  name: string;
  business: string;
  team: Person[];
  vision: string;
  website: string;
  more: string;
  percent: number[];
  maxShares: number[];
  shares: number[];
  price: number[];
  closeTime: number;
  address: string;
}

export interface TicketData {
  name: string;
  business: string;
  website: string;
  categories: string[];
  maxShares: number[];
  shares: number[];
  price: number[];
  closeTime: number;
  address: string;
}

export interface LotteryData {
  name: string;
  subtitle: string;
  description: string;
  amounts: number[];
  address: string;
  tickets: number[];
  availableTickets: number[];
  id: number;
}
