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

  return (
    <button
      className={`uppercase cursor-pointer hover:backdrop-brightness-85
        ${grow ? 'w-full' : 'w-fit'}
        ${variant && (isDisabled ? 'button-disabled cursor-not-allowed' : variantMap[variant])}
        ${shape && shapeMap[shape]}
        ${size ? sizeMap[size] : sizeMap['md'] }`
      }
      type={targetForm ? 'submit' : 'button'}
      form={targetForm ? targetForm : null}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

/*
Button props values:

type: icon, text, combined
size: normal, small
wFit: content, container
roundness: small, large, full
buttonColor: white, gray, green
textColor: dark, light, yellow, blue, green, red
icon: (Use classes from bootstrap icons, e.g: for 'bi bi-gear' use only 'gear')
onClickFunction: (Insert any global function or function from the component where you are using the button)
*/