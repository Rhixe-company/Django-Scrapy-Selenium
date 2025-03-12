export interface IStyles {
  primaryColor: string;
  accentColor: string;
  textColor: string;
}

export const styles: IStyles;
export default styles;


declare global {
    interface Window {

        htmx: any;
        Alpine: any;
    }
}
