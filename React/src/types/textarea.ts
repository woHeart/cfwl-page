export interface JsonTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onBlur: () => void;
}
