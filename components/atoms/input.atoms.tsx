import { DetailedHTMLProps, InputHTMLAttributes } from "react";

// Reusable input component with custom styles
export function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input className="css-input" {...props} />;
}
