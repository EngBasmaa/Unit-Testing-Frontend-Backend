import "./Button.css";
export default function CustomButton({
  children,
  onClick,
  ...restProps
}) {
  return (
    <button onClick={onClick}  {...restProps}>
      {children}
    </button>
  );
}
