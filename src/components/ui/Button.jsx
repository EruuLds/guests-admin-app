import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

export default function Button({ children, variant, size, shape, targetForm, onClick, disabled, grow }) {
  const { loading, initialLoading } = useContext(DataContext)
  const isDisabled = disabled ?? (loading || initialLoading);
  const variantMap = {
    primary: "button-primary",
    primarySubtle: "button-primary-subtle",
    secondary: "button-secondary",
    white: "button-white",
    secondaryDanger: "button-secondary-danger",
    whiteDanger: "button-white-danger",
    whatsapp: "button-whatsapp"
  };
  const sizeMap = {
    sm: "text-sm px-2 py-1 rounded-[0.5rem]",
    md: "px-3 py-2 rounded-[0.75rem]",
    lg: "text-lg px-3 py-2 rounded-[1rem]"
  }
  const shapeMap = {
    circle: "aspect-square rounded-full",
    square: "aspect-square"
  }
  const stateMap = {
    enabled: "cursor-pointer hover:brightness-97 active:scale-[0.98]",
    disabled: "cursor-not-allowed"
  }

  return (
    <button
      className={`relative uppercase
        ${grow ? 'w-full' : 'w-fit'}
        ${variant && variantMap[variant]}
        ${shape && shapeMap[shape]}
        ${size ? sizeMap[size] : sizeMap['md'] }
        ${isDisabled ? stateMap['disabled'] : stateMap['enabled'] }`
      }
      type={targetForm ? 'submit' : 'button'}
      form={targetForm ? targetForm : null}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
      {isDisabled && <div className={`absolute w-full h-full top-0 left-0 bg-zinc-50/50 ${sizeMap[size]}`}></div>}
    </button>
  );
}