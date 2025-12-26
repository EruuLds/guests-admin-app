import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

export default function Button({children, type, size, targetForm, roundness, wFit, hFit, buttonColor, onClickFunction, icon, listed}) {
  const { loading, initialLoading } = useContext(DataContext);

  return (
    <button 
      type={targetForm ? 'submit' : 'button'}
      form={targetForm ? targetForm : undefined}
      onClick={onClickFunction}
      disabled={(loading || initialLoading )}
      className={`
        flex
        items-center 
        cursor-pointer 
        p-3
        transition-all 
        duration-100
        button-${buttonColor} 
        ${listed ? 'justify-start' : 'justify-center'}
        ${type === 'icon' && 'aspect-square'}
        ${wFit === 'container' && 'w-full'} 
        ${hFit === 'container' && 'h-full'} 
        ${roundness === 'full' ? 'rounded-full' : roundness === 'small' ? 'rounded-lg' : roundness === 'large' ? 'rounded-2xl' : 'rounded-0'}`}
      >
        {(type === 'icon' || type === 'combined') &&
          <i className={`
            line-clamp-none
            leading-none
            button-icon 
            ${type === 'combined' && 'me-2'} 
            bi bi-${icon} 
            ${size === 'small' ? 'text-base' : 'text-2xl'}`}
          ></i>
        }
        {(type === 'text' || type === 'combined') &&
          <span className={`
            leading-none
            select-none
            text-nowrap
            ${!listed && 'uppercase tracking-wide'}
            ${size === 'small' ? 'text-sm' : 'text-base'}`}
          >
            {children}
          </span>
        }
    </button>
  )
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