import * as xrpl from 'xrpl';

export interface ITheme {
  name: string;
  icon: string;
}

export interface IMenuItem {
  label: string;
  icon: string;
  route: string;
}

export interface INetwork {
  name: string;
  address: string;
  explorerAddress: string;
}

export interface IVideo {
  title: string;
  link: string;
}

export interface IVideoParams {
  videoId: string;
  width: number;
  height: number;
  startSeconds: number;
  endSeconds: number;
  suggestedQuality: YT.SuggestedVideoQuality;
  playerVars: YT.PlayerVars;
  showBeforeIframeApiLoads: boolean;
}

export interface IFAQ {
  title: string;
  description: string;
  answer: string;
}

// export interface IAMMData extends xrpl.AMMInfoResponse {
//   ratio: number[];
// }

export interface IDEXRatio {
  day: number[];
  week: number[];
  month: number[];
  year: number[];
}

// export interface Account {
//   address: string;
//   secret: string;
//   name: string;
//   balances: {
//     value: string;
//     currency: string;
//     issuer?: string | undefined;
//   }[];
// }

// export interface Traffic {
//   request: string;
//   response: string;
// }

// interface AccountStateResultNamespaceEntries {
//   Flags: number;
//   HookStateData: string;
//   HookStateKey: string;
//   LedgerEntryType: string;
//   OwnerNode: string;
//   index: string;
// }
// interface AccountStateResult {
//   account: string;
//   ledger_current_index: string;
//   namespace_entries: AccountStateResultNamespaceEntries[];
//   namespace_id: string;
//   validated: string;
// }
// export interface AccountState {
//   id: number;
//   result: AccountStateResult;
// }
