declare namespace JSX {
  interface IntrinsicElements {
    'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      theme?: 'light' | 'dark';
      label?: string;
    }, HTMLElement>;
  }
} 