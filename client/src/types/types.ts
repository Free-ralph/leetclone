export type severityType = "success" | "error" | "warning";

export type snackType = {
  message: string;
  severity: severityType;
  isOpen: boolean;
};


export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}