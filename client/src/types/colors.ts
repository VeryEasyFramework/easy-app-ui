export type MainColor =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "accent"
  | "secondary"
  | "text"
  | "bg"
  | "black"
  | "disabled"
  | "white";
// combine each of the above with darker, dark, bright, brighter
export type ExtendedColor =
  | MainColor
  | `${MainColor}-darker`
  | `${MainColor}-dark`
  | `${MainColor}-bright`
  | `${MainColor}-brighter`;
